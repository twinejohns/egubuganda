import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { SITE_PAGES } from "../content";

export default defineTool({
  name: "list_pages",
  title: "List website pages",
  description: "List the public pages of the Environmental Hub Uganda website with their paths and descriptions.",
  inputSchema: {},
  outputSchema: { pages: z.array(z.record(z.string(), z.unknown())) },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text" as const, text: JSON.stringify(SITE_PAGES, null, 2) }],
    structuredContent: { pages: SITE_PAGES },
  }),
});
