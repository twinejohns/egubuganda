import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const { data } = useQuery({
    queryKey: ["admin", "counts"],
    queryFn: async () => {
      const [posts, pages, slides, menu] = await Promise.all([
        supabase.from("posts").select("id", { count: "exact", head: true }),
        supabase.from("pages").select("id", { count: "exact", head: true }),
        supabase.from("slides").select("id", { count: "exact", head: true }),
        supabase.from("menu_items").select("id", { count: "exact", head: true }),
      ]);
      return {
        posts: posts.count ?? 0,
        pages: pages.count ?? 0,
        slides: slides.count ?? 0,
        menu: menu.count ?? 0,
      };
    },
  });

  const cards = [
    { label: "Blog posts", value: data?.posts, to: "/admin/posts" },
    { label: "Pages", value: data?.pages, to: "/admin/pages" },
    { label: "Slides", value: data?.slides, to: "/admin/slides" },
    { label: "Menu links", value: data?.menu, to: "/admin/menus" },
  ] as const;

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Edit everything on the public website from here — no code required.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md"
          >
            <p className="text-3xl font-bold text-primary">{c.value ?? "—"}</p>
            <p className="mt-1 text-sm text-muted-foreground">{c.label}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 rounded-lg border border-border bg-card p-6 text-sm leading-relaxed text-muted-foreground">
        <p className="font-semibold text-foreground">How editing works</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>
            <strong>Pages</strong> — change the heading, intro and body text of each website page.
          </li>
          <li>
            <strong>Blog posts</strong> — write, publish, unpublish and delete articles.
          </li>
          <li>
            <strong>Sliders</strong> — the rotating banners on the homepage.
          </li>
          <li>
            <strong>Menus</strong> — the links in the top navigation and footer.
          </li>
          <li>
            <strong>Media</strong> — upload photos and copy their link into a post or slide.
          </li>
          <li>
            <strong>Site settings</strong> — organisation name, mission, vision and contact details.
          </li>
        </ul>
        <p className="mt-3">
          Body text supports simple formatting: a blank line starts a new paragraph, <code>## </code>
          makes a heading and <code>- </code> makes a bullet.
        </p>
      </div>
    </div>
  );
}
