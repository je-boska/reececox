import { SetupNotice } from "@/components/SetupNotice";
import { isSanityConfigured } from "@/sanity/env";

export default function HomePage() {
  // Quiet, empty viewer until a project or page is chosen from the nav.
  // (Before Sanity is configured, show the setup notice instead.)
  if (!isSanityConfigured) return <SetupNotice />;
  return null;
}
