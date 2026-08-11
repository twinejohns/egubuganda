import { defineTool } from "@lovable.dev/mcp-js";
import { ORGANISATION } from "../content";

export default defineTool({
  name: "get_organisation_profile",
  title: "Get organisation profile",
  description:
    "Return the public profile of Environmental Hub Uganda: legal status, mission, vision, core values, core activities and contact details.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text" as const, text: JSON.stringify(ORGANISATION, null, 2) }],
    structuredContent: { organisation: ORGANISATION },
  }),
});
