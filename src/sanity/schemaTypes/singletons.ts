import {
  CogIcon,
  EnvelopeIcon,
  InfoOutlineIcon,
  UsersIcon,
} from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { imageBlock, richTextBlock } from "./blocks";

/** Site-wide settings: name shown in the nav header + SEO defaults. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "string",
      description: "Shown at the top of the navigation (e.g. “Reece Cox”).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 2,
      description: "Used for SEO / link previews.",
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

/** About / Information page. */
export const information = defineType({
  name: "information",
  title: "Information",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      initialValue: "Information",
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "array",
      of: [richTextBlock, imageBlock],
    }),
    defineField({
      name: "portrait",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
  ],
  preview: { prepare: () => ({ title: "Information" }) },
});

/** CV: grouped lists of year + entry (exhibitions, performances, press…). */
export const cv = defineType({
  name: "cv",
  title: "CV",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({ name: "title", type: "string", initialValue: "CV" }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "cvSection",
          fields: [
            defineField({
              name: "heading",
              type: "string",
              description: "e.g. “Solo Exhibitions”, “Performances”, “Press”.",
            }),
            defineField({
              name: "entries",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "cvEntry",
                  fields: [
                    defineField({ name: "year", type: "string" }),
                    defineField({ name: "text", type: "text", rows: 2 }),
                  ],
                  preview: {
                    select: { title: "text", subtitle: "year" },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "heading" },
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "CV" }) },
});

/** Contact: email + external links + optional note. */
export const contact = defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: "title", type: "string", initialValue: "Contact" }),
    defineField({ name: "email", type: "string" }),
    defineField({
      name: "body",
      title: "Note",
      type: "array",
      of: [richTextBlock],
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "link",
          fields: [
            defineField({
              name: "label",
              type: "string",
              description: "e.g. Instagram, Bandcamp.",
            }),
            defineField({
              name: "url",
              type: "url",
              validation: (rule) =>
                rule.uri({ scheme: ["http", "https", "mailto"] }),
            }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Contact" }) },
});
