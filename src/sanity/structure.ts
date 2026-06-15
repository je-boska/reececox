import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import {
  CogIcon,
  EnvelopeIcon,
  InfoOutlineIcon,
  TagIcon,
  UsersIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

/**
 * Studio desk: four single-instance documents up top, then drag-orderable
 * Categories and Projects lists (orderRank drives nav order).
 */
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .icon(CogIcon)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Information")
        .id("information")
        .icon(InfoOutlineIcon)
        .child(
          S.document().schemaType("information").documentId("information"),
        ),
      S.listItem()
        .title("CV")
        .id("cv")
        .icon(UsersIcon)
        .child(S.document().schemaType("cv").documentId("cv")),
      S.listItem()
        .title("Contact")
        .id("contact")
        .icon(EnvelopeIcon)
        .child(S.document().schemaType("contact").documentId("contact")),
      S.divider(),
      orderableDocumentListDeskItem({
        type: "category",
        title: "Categories",
        icon: TagIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "project",
        title: "Projects",
        S,
        context,
      }),
    ]);
