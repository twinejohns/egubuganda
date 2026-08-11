import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export type PublicPost = {
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  body: string;
  cover_url: string | null;
  published_at: string | null;
};

export type PublicPage = {
  slug: string;
  title: string;
  lead: string;
  body: string;
  meta_description: string;
};

export type SiteData = {
  settings: Record<string, string>;
  menu: { label: string; url: string; location: string }[];
  slides: {
    title: string;
    subtitle: string;
    image_url: string | null;
    cta_label: string;
    cta_url: string;
  }[];
};

export const getSiteData = createServerFn({ method: "GET" }).handler(async (): Promise<SiteData> => {
  const supabase = publicClient();
  const [settingsRes, menuRes, slidesRes] = await Promise.all([
    supabase.from("site_settings").select("key, value"),
    supabase
      .from("menu_items")
      .select("label, url, location")
      .eq("visible", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("slides")
      .select("title, subtitle, image_url, cta_label, cta_url")
      .eq("active", true)
      .order("sort_order", { ascending: true }),
  ]);

  const settings: Record<string, string> = {};
  for (const row of settingsRes.data ?? []) {
    settings[row.key] = typeof row.value === "string" ? row.value : JSON.stringify(row.value);
  }

  return { settings, menu: menuRes.data ?? [], slides: slidesRes.data ?? [] };
});

export const getPublicPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicPost[]> => {
    const { data } = await publicClient()
      .from("posts")
      .select("slug, title, tag, excerpt, body, cover_url, published_at")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false });
    return data ?? [];
  },
);

export const getPublicPost = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }): Promise<PublicPost | null> => {
    const { data } = await publicClient()
      .from("posts")
      .select("slug, title, tag, excerpt, body, cover_url, published_at")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    return data ?? null;
  });

export const getPublicPage = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }): Promise<PublicPage | null> => {
    const { data } = await publicClient()
      .from("pages")
      .select("slug, title, lead, body, meta_description")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    return data ?? null;
  });
