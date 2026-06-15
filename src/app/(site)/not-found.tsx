import Link from "next/link";

import styles from "@/components/Viewer.module.css";

export default function NotFound() {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>Not found</h1>
      </header>
      <p>
        That page doesn’t exist. <Link href="/">Go home</Link>.
      </p>
    </article>
  );
}
