import { defineQuery } from "next-sanity";

// Shared image projection: pull asset url + dimensions + lqip so we can render
// with correct aspect ratio (no layout shift) and a blur placeholder.
const IMAGE_FIELDS = /* groq */ `
  ...,
  asset->{
    _id,
    url,
    "lqip": metadata.lqip,
    "dimensions": metadata.dimensions
  }
`;

/** Left-nav project list. Ordered newest first, then alphabetically. */
export const NAV_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)]
    | order(year desc, title asc){
      _id,
      title,
      "slug": slug.current,
      year
    }
`);

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    title,
    description,
    intro
  }
`);

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    year,
    medium,
    "slug": slug.current,
    content[]{
      ...,
      _type == "image" => { ${IMAGE_FIELDS} }
    }
  }
`);

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)].slug.current
`);

export const INFORMATION_QUERY = defineQuery(`
  *[_type == "information"][0]{
    title,
    bio,
    portrait{ ${IMAGE_FIELDS} }
  }
`);

export const CV_QUERY = defineQuery(`
  *[_type == "cv"][0]{
    title,
    sections[]{
      heading,
      entries[]{ year, text }
    }
  }
`);

export const CONTACT_QUERY = defineQuery(`
  *[_type == "contact"][0]{
    title,
    email,
    body,
    links[]{ label, url }
  }
`);
