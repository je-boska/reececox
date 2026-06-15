import { SiteShell } from "@/components/SiteShell";
import { loadNav, loadSettings } from "@/sanity/load";

// Sanity is the only cache. Render every public page per request so published
// changes show up immediately (served fresh from Sanity's CDN) without a Next
// data cache or a revalidation webhook. Open tabs also live-update via
// <SanityLive>. Draft/preview (Presentation) renders drafts here too.
export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nav, settings] = await Promise.all([loadNav(), loadSettings()]);
  return (
    <SiteShell nav={nav} settings={settings}>
      {children}
    </SiteShell>
  );
}
