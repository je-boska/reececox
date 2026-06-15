import { defineLive } from "next-sanity/live";

import { client } from "./client";
import { readToken } from "./env";

/**
 * Sanity Live wires the client to the Live Content API so published edits show
 * up without a redeploy, and so drafts render inside the Studio's Presentation
 * tool. `sanityFetch` auto-detects draft mode; `<SanityLive />` opens the live
 * connection (rendered once in the root layout).
 */
export const { sanityFetch, SanityLive } = defineLive({
  client,
  // Token enables draft previews (server) and live drafts in the browser when
  // <SanityLive includeDrafts /> is set. Falsy token => published-only, which is
  // exactly what we want in plain production.
  serverToken: readToken || false,
  browserToken: readToken || false,
});
