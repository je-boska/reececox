// Server layout for the embedded Studio segment: provides Studio-appropriate
// <head> metadata + viewport (the page itself must be a client component).
export { metadata, viewport } from "next-sanity/studio";

export const dynamic = "force-static";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
