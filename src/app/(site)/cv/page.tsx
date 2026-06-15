import type { Metadata } from "next";

import { SetupNotice } from "@/components/SetupNotice";
import styles from "@/components/Viewer.module.css";
import { isSanityConfigured } from "@/sanity/env";
import { loadCv } from "@/sanity/load";

export const metadata: Metadata = { title: "CV" };

export default async function CvPage() {
  if (!isSanityConfigured) return <SetupNotice />;

  const cv = await loadCv();

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{cv?.title || "CV"}</h1>
      </header>

      {cv?.sections?.map((section, i) => (
        <section key={i} className={styles.cvSection}>
          {section.heading ? (
            <h2 className={styles.cvHeading}>{section.heading}</h2>
          ) : null}
          {section.entries?.map((entry, j) => (
            <div key={j} className={styles.cvEntry}>
              <span className={styles.cvYear}>{entry.year}</span>
              <span>{entry.text}</span>
            </div>
          ))}
        </section>
      ))}
    </article>
  );
}
