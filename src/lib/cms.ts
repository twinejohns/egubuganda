import { queryOptions } from "@tanstack/react-query";
import {
  getSiteData,
  getPublicPosts,
  getPublicPost,
  getPublicPage,
  type PublicPage,
  type PublicPost,
  type SiteData,
} from "./cms.functions";

export type { PublicPage, PublicPost, SiteData };

export const siteDataQuery = () =>
  queryOptions({
    queryKey: ["cms", "site"],
    queryFn: () => getSiteData(),
    staleTime: 60_000,
  });

export const postsQuery = () =>
  queryOptions({
    queryKey: ["cms", "posts"],
    queryFn: () => getPublicPosts(),
  });

export const postQuery = (slug: string) =>
  queryOptions({
    queryKey: ["cms", "post", slug],
    queryFn: () => getPublicPost({ data: slug }),
  });

export const pageQuery = (slug: string) =>
  queryOptions({
    queryKey: ["cms", "page", slug],
    queryFn: () => getPublicPage({ data: slug }),
  });

/** Turns a stored media path into a servable URL. */
export function mediaUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("/")) return path;
  return `/api/public/media/${path}`;
}

/** Renders simple markdown-ish text: paragraphs, ## headings and - bullets. */
export function parseBody(body: string) {
  const blocks: { type: "h2" | "p" | "ul"; text: string; items?: string[] }[] = [];
  const lines = body.replace(/\r/g, "").split("\n");
  let para: string[] = [];
  let list: string[] = [];

  const flush = () => {
    if (para.length) {
      blocks.push({ type: "p", text: para.join(" ") });
      para = [];
    }
    if (list.length) {
      blocks.push({ type: "ul", text: "", items: list });
      list = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flush();
    } else if (line.startsWith("## ")) {
      flush();
      blocks.push({ type: "h2", text: line.slice(3) });
    } else if (line.startsWith("- ")) {
      if (para.length) flush();
      list.push(line.slice(2));
    } else {
      if (list.length) flush();
      para.push(line);
    }
  }
  flush();
  return blocks;
}
