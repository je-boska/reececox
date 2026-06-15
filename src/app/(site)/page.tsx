import { SetupNotice } from "@/components/SetupNotice";
import styles from "@/components/Viewer.module.css";
import { isSanityConfigured } from "@/sanity/env";
import { loadSettings } from "@/sanity/load";

export default async function HomePage() {
  if (!isSanityConfigured) {
    return <SetupNotice />;
  }

  const settings = await loadSettings();
  const name = settings?.title || "Reece Cox";

  // Quiet default state: just the name, anchored to the bottom-left, until a
  // project or page is chosen from the navigation.
  return (
    <div className={styles.placeholder}>
      <p className={styles.placeholderName}>{name}</p>
    </div>
  );
}
