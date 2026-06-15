import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN for published reads; the Live Content API + draft previews bypass it.
  useCdn: true,
  perspective: "published",
});
