import { orderRankField } from "@sanity/orderable-document-list";
import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Project category. Projects reference a category, and the nav groups projects
 * under their category. Categories themselves are drag-orderable (orderRank),
 * which sets the order of the groups in the nav.
 */
export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
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
    }),
    orderRankField({ type: "category" }),
  ],
  preview: { select: { title: "title" } },
});
