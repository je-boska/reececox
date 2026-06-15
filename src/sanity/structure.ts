import {
  CogIcon,
  DocumentsIcon,
  EnvelopeIcon,
  InfoOutlineIcon,
  UsersIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

/**
 * Studio desk: four single-instance documents up top, then the project list.
 */
export const structure: StructureResolver = (S) =>
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
      S.documentTypeListItem("project").title("Projects").icon(DocumentsIcon),
    ]);
