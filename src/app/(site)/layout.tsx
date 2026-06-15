import { SiteShell } from "@/components/SiteShell";
import { loadNav, loadSettings } from "@/sanity/load";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [projects, settings] = await Promise.all([loadNav(), loadSettings()]);
  return (
    <SiteShell projects={projects} settings={settings}>
      {children}
    </SiteShell>
  );
}
