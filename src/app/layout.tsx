import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { stegaClean } from "next-sanity";
import { VisualEditing } from "next-sanity/visual-editing";

import { DraftModeBanner } from "@/components/DraftModeBanner";
import { isSanityConfigured } from "@/sanity/env";
import { SanityLive } from "@/sanity/live";
import { loadSettings } from "@/sanity/load";

import "./globals.css";

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
    <html lang="en">
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
