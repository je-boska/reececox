import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

/**
 * Config for the standalone `sanity` CLI (schema deploy, typegen, dataset
 * management). The Studio itself is served by Next at /studio, so we don't use
 * `sanity dev`/`sanity deploy` for hosting — see AGENTS.md.
 */
export default defineCliConfig({
  api: { projectId, dataset },
  autoUpdates: true,
});
