import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { DocumentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { imageBlock, richTextBlock } from "./blocks";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: DocumentIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      description: "Groups this project in the navigation.",
    }),
    defineField({
      name: "year",
      type: "string",
      description: "Shown under the title.",
    }),
    defineField({
      name: "medium",
      type: "string",
      description: "e.g. “Video, sound, 12 min.” — shown under the title.",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      description:
        "Build the project page top-to-bottom. Mix text, images, video and audio in any order.",
      of: [
        richTextBlock,
        imageBlock,
        defineArrayMember({ type: "videoEmbed" }),
        defineArrayMember({ type: "audioEmbed" }),
      ],
    }),
    orderRankField({ type: "project" }),
  ],
  preview: {
    select: { title: "title", subtitle: "year" },
  },
});
