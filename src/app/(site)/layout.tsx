import { SiteShell } from "@/components/SiteShell";
import { loadNav, loadSettings } from "@/sanity/load";

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
