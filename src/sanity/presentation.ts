import {
  defineDocuments,
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";

/**
 * Maps documents <-> site URLs so the Studio's Presentation tool knows which
 * page to preview and shows "used on these pages" links while editing.
 */
export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: defineDocuments([
    {
      route: "/projects/:slug",
      filter: `_type == "project" && slug.current == $slug`,
    },
    { route: "/info", filter: `_type == "information"` },
    { route: "/cv", filter: `_type == "cv"` },
    { route: "/contact", filter: `_type == "contact"` },
    { route: "/", filter: `_type == "siteSettings"` },
  ]),
  locations: {
    project: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled project",
            href: `/projects/${doc?.slug}`,
          },
        ],
      }),
    }),
    siteSettings: defineLocations({
      select: { title: "title" },
      resolve: () => ({ locations: [{ title: "Home", href: "/" }] }),
    }),
    information: defineLocations({
      select: { title: "title" },
      resolve: () => ({
        locations: [{ title: "Information", href: "/info" }],
      }),
    }),
    cv: defineLocations({
      select: { title: "title" },
      resolve: () => ({ locations: [{ title: "CV", href: "/cv" }] }),
    }),
    contact: defineLocations({
      select: { title: "title" },
      resolve: () => ({ locations: [{ title: "Contact", href: "/contact" }] }),
    }),
  },
};
