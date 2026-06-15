import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { draftMode } from "next/headers";
import { stegaClean } from "next-sanity";
import { VisualEditing } from "next-sanity/visual-editing";

import { DraftModeBanner } from "@/components/DraftModeBanner";
import { isSanityConfigured } from "@/sanity/env";
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
  return {
    title: { default: title, template: `%s — ${title}` },
    description,
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
