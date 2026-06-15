import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { draftMode } from "next/headers";
import { stegaClean } from "next-sanity";
import { VisualEditing } from "next-sanity/visual-editing";

import { DraftModeBanner } from "@/components/DraftModeBanner";
import { isSanityConfigured } from "@/sanity/env";
import { urlFor } from "@/sanity/image";
import { SanityLive } from "@/sanity/live";
import { loadSettings } from "@/sanity/load";

import "./globals.css";

// Free Helvetica-alike grotesque with a true Medium (500). Self-hosted by
// next/font — downloaded at build, served from our own origin (no external
// requests). Helvetica/Arial remain as fallbacks in --font (see globals.css).
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await loadSettings();
  const title = stegaClean(settings?.title) || "Reece Cox";
  const description = stegaClean(settings?.description) || undefined;

  // Favicon from Sanity. SVGs are served as-is; raster images get cropped to a
  // square 64×64 PNG.
  const fav = settings?.favicon?.asset;
  const iconUrl = fav?.url
    ? fav.extension === "svg" || fav.mimeType === "image/svg+xml"
      ? fav.url
      : urlFor({ asset: fav })
          .width(64)
          .height(64)
          .fit("crop")
          .format("png")
          .url()
    : undefined;

  return {
    title: { default: title, template: `%s — ${title}` },
    description,
    ...(iconUrl ? { icons: { icon: iconUrl } } : {}),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraft } = await draftMode();
  return (
    <html lang="en" className={sans.variable}>
      <body>
        {children}
        {isSanityConfigured && <SanityLive includeDrafts={isDraft} />}
        {isDraft && (
          <>
            <DraftModeBanner />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  );
}
