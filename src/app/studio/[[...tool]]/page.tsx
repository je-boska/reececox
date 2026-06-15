"use client";

/**
 * Client component on purpose: the Studio (and the `sanity` package it pulls in)
 * uses `React.createContext`, which doesn't exist in the server/react-server
 * build. Marking the page `"use client"` compiles it + its imports under the
 * client React build. Page metadata lives in the sibling server layout.
 */
import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
