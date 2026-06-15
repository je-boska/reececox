import "server-only";

import { isSanityConfigured } from "./env";
import { sanityFetch } from "./live";
import {
  CONTACT_QUERY,
  CV_QUERY,
  INFORMATION_QUERY,
  NAV_QUERY,
  PROJECT_QUERY,
  SETTINGS_QUERY,
} from "./queries";
import type {
  Contact,
  Cv,
  Information,
  NavProject,
  Project,
  SiteSettings,
} from "./types";

/**
 * Wrap every fetch so an unconfigured project (no env yet) or a transient Lake
 * error degrades to `null`/`[]` and renders a placeholder instead of a 500.
 */
async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T,
): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    const { data } = await sanityFetch({ query, params });
    return (data as T) ?? fallback;
  } catch (error) {
    console.error("[sanity] fetch failed:", error);
    return fallback;
  }
}

export const loadNav = () =>
  safeFetch<NavProject[]>(NAV_QUERY, {}, []);

export const loadSettings = () =>
  safeFetch<SiteSettings | null>(SETTINGS_QUERY, {}, null);

export const loadProject = (slug: string) =>
  safeFetch<Project | null>(PROJECT_QUERY, { slug }, null);

export const loadInformation = () =>
  safeFetch<Information | null>(INFORMATION_QUERY, {}, null);

export const loadCv = () => safeFetch<Cv | null>(CV_QUERY, {}, null);

export const loadContact = () =>
  safeFetch<Contact | null>(CONTACT_QUERY, {}, null);
