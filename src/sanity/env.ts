/**
 * Sanity environment config.
 *
 * Designed to NOT throw on import when unconfigured, so the app still boots and
 * shows a friendly "configure Sanity" notice instead of a 500. Once you fill in
 * `.env.local` (see `.env.local.example`) everything wires up automatically.
 */

// NEXT_PUBLIC_* is read by Next (site + embedded Studio). SANITY_STUDIO_* is the
// fallback the standalone `sanity` CLI understands (schema deploy, typegen).
const rawProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  "";

/** True once a real Sanity project id is present. */
export const isSanityConfigured =
  rawProjectId.length > 0 && rawProjectId !== "placeholder";

/**
 * `createClient` rejects an empty/invalid projectId at construction time, which
 * would crash the whole app before we can render a helpful message. Fall back to
 * a syntactically-valid placeholder so construction succeeds; data fetches are
 * wrapped in try/catch and degrade gracefully when unconfigured.
 */
export const projectId = isSanityConfigured ? rawProjectId : "placeholder";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-06-01";

/** Server-only read token for drafts + the Live Content API. */
export const readToken = process.env.SANITY_API_READ_TOKEN || "";

/** Origin used by the Studio Presentation tool to render previews. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/** Where the embedded Studio lives. */
export const studioBasePath = "/studio";
