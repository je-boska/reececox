import type { PortableTextBlock } from "@portabletext/react";

export interface SanityImage {
  _type: "image";
  alt?: string;
  caption?: string;
  asset?: {
    _id?: string;
    url: string;
    lqip?: string;
    extension?: string;
    mimeType?: string;
    dimensions?: { width: number; height: number; aspectRatio: number };
  };
}

export interface NavProject {
  _id: string;
  title: string;
  slug: string;
  year?: string;
}

export interface NavCategory {
  _id: string;
  title: string;
  projects: NavProject[];
}

export interface NavData {
  categories: NavCategory[];
  uncategorized: NavProject[];
}

export interface SiteSettings {
  title?: string;
  description?: string;
  intro?: PortableTextBlock[];
  favicon?: SanityImage;
}

export interface Project {
  _id: string;
  _type: "project";
  title: string;
  year?: string;
  medium?: string;
  slug: string;
  content?: PortableTextBlock[];
}

export interface Information {
  title?: string;
  bio?: PortableTextBlock[];
  portrait?: SanityImage;
}

export interface CvEntry {
  year?: string;
  text?: string;
}
export interface CvSection {
  heading?: string;
  entries?: CvEntry[];
}
export interface Cv {
  title?: string;
  sections?: CvSection[];
}

export interface ContactLink {
  label?: string;
  url?: string;
}
export interface Contact {
  title?: string;
  email?: string;
  body?: PortableTextBlock[];
  links?: ContactLink[];
}
