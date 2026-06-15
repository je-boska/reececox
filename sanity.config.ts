import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import {
  apiVersion,
  dataset,
  projectId,
  studioBasePath,
} from "./src/sanity/env";
import { resolve } from "./src/sanity/presentation";
import { schemaTypes, singletonTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "default",
  title: "Reece Cox",
  projectId,
  dataset,
  basePath: studioBasePath,

  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      // Studio is embedded in the same app, so previews share its origin.
      previewUrl: {
        previewMode: { enable: "/api/draft-mode/enable" },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
    // No "create new" template for the single-instance documents.
    templates: (prev) =>
      prev.filter((template) => !singletonTypes.has(template.schemaType)),
  },

  document: {
    // Hide singletons from the global "create" menu.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((item) => !singletonTypes.has(item.templateId))
        : prev,
    // Strip create/delete/duplicate actions on singletons.
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter(({ action }) =>
            ["publish", "discardChanges", "restore"].includes(action ?? ""),
          )
        : prev,
  },
});
