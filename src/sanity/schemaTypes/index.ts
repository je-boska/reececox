import type { SchemaTypeDefinition } from "sanity";

import { audioEmbed, videoEmbed } from "./blocks";
import { category } from "./category";
import { project } from "./project";
import { contact, cv, information, siteSettings } from "./singletons";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  project,
  category,
  siteSettings,
  information,
  cv,
  contact,
  // Reusable objects referenced by name inside project content
  videoEmbed,
  audioEmbed,
];

/** Document types that should exist as exactly one editable document. */
export const singletonTypes = new Set([
  "siteSettings",
  "information",
  "cv",
  "contact",
]);
