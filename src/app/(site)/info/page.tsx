import type { Metadata } from "next";

import { SanityPicture } from "@/components/media";
import { RichText } from "@/components/RichText";
import { SetupNotice } from "@/components/SetupNotice";
import styles from "@/components/Viewer.module.css";
import { isSanityConfigured } from "@/sanity/env";
import { loadInformation } from "@/sanity/load";

export const metadata: Metadata = { title: "Information" };

export default async function InformationPage() {
  if (!isSanityConfigured) return <SetupNotice />;

  const info = await loadInformation();

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{info?.title || "Information"}</h1>
      </header>
      {info?.portrait?.asset?.url ? (
        <div className={styles.portrait}>
          <SanityPicture image={info.portrait} sizes="18rem" />
        </div>
      ) : null}
      <RichText value={info?.bio} />
    </article>
  );
}
