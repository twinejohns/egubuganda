import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { POSTS } from "@/data/posts";

export default defineTool({
  name: "get_blog_post",
  title: "Get blog post",
  description: "Return the full text of a single blog article by its slug.",
  inputSchema: { slug: z.string().min(1).describe("Blog post slug, e.g. community-restoration-tree-planting.") },
  outputSchema: { post: z.record(z.string(), z.unknown()) },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const post = POSTS.find((p) => p.slug === slug.trim());
    if (!post) {
      throw new ToolError(
        `No blog post with slug "${slug}". Use list_blog_posts to see available slugs.`,
      );
    }
    const text = [`# ${post.title}`, `${post.tag} — ${post.date}`, "", ...post.body].join("\n");
    return {
      content: [{ type: "text" as const, text }],
      structuredContent: { post: { ...post, url: `/blog/${post.slug}` } },
    };
  },
});
