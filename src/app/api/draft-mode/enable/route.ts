import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { client } from "@/sanity/client";
import { readToken } from "@/sanity/env";

// Entered from the Studio's Presentation tool. Validates the preview request
// against Sanity, flips Next.js draft mode on, and redirects into the site.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: readToken }),
});
