import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { POSTS } from "@/data/posts";

export default defineTool({
  name: "list_blog_posts",
  title: "List blog posts",
  description:
    "List published blog articles with slug, title, tag, date and excerpt. Optionally filter by tag or a free-text search term.",
  inputSchema: {
    tag: z.string().optional().describe("Filter by tag, e.g. Conservation, Education, Research, Innovation."),
    search: z.string().optional().describe("Free-text term matched against title and excerpt."),
  },
  outputSchema: { posts: z.array(z.record(z.string(), z.unknown())) },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ tag, search }) => {
    const term = search?.trim().toLowerCase();
    const items = POSTS.filter((p) => {
      if (tag && p.tag.toLowerCase() !== tag.trim().toLowerCase()) return false;
      if (term && !(`${p.title} ${p.excerpt}`.toLowerCase().includes(term))) return false;
      return true;
    }).map(({ slug, title, tag: t, date, excerpt }) => ({
      slug,
      title,
      tag: t,
      date,
      excerpt,
      url: `/blog/${slug}`,
    }));

    if (items.length === 0) throw new ToolError("No blog posts match that filter.");

    return {
      content: [{ type: "text" as const, text: JSON.stringify(items, null, 2) }],
      structuredContent: { posts: items },
    };
  },
});
