import type { Metadata } from "next";

import { RichText } from "@/components/RichText";
import { SetupNotice } from "@/components/SetupNotice";
import styles from "@/components/Viewer.module.css";
import { isSanityConfigured } from "@/sanity/env";
import { loadContact } from "@/sanity/load";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  if (!isSanityConfigured) return <SetupNotice />;

  const contact = await loadContact();

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{contact?.title || "Contact"}</h1>
      </header>

      {contact?.email ? (
        <p>
          <a className={styles.contactLink} href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </p>
      ) : null}

      <RichText value={contact?.body} />

      {contact?.links?.length ? (
        <ul className={styles.contactList}>
          {contact.links.map((link, i) =>
            link.url ? (
              <li key={i}>
                <a
                  className={styles.contactLink}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label || link.url}
                </a>
              </li>
            ) : null,
          )}
        </ul>
      ) : null}
    </article>
  );
}
