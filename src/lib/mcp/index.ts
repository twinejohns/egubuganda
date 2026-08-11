import { defineMcp } from "@lovable.dev/mcp-js";
import getBlogPost from "./tools/get-blog-post";
import getOrganisationProfile from "./tools/get-organisation-profile";
import listBlogPosts from "./tools/list-blog-posts";
import listPages from "./tools/list-pages";

export default defineMcp({
  name: "envhub-archive",
  title: "EnvHub Archive",
  version: "0.1.0",
  instructions:
    "Public content tools for Environmental Hub Uganda (Bricks Environment and Climate Hub Initiative Uganda). Use `get_organisation_profile` for mission, vision, values and contact details, `list_pages` for the site map, and `list_blog_posts` / `get_blog_post` to read published field stories.",
  tools: [getOrganisationProfile, listPages, listBlogPosts, getBlogPost],
});
