import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/pages/")({
  component: PagesList,
});

function PagesList() {
  const { data: pages, isLoading } = useQuery({
    queryKey: ["admin", "pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("id, slug, title, published, sort_order")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Pages</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Edit the heading, intro and body text shown on each website page.
      </p>

      <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-card">
        {isLoading && <p className="p-5 text-sm text-muted-foreground">Loading…</p>}
        {pages?.map((p) => (
          <Link
            key={p.id}
            to="/admin/pages/$slug"
            params={{ slug: p.slug }}
            className="flex items-center justify-between gap-3 p-4 hover:bg-muted/50"
          >
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="text-xs text-muted-foreground">/{p.slug === "home" ? "" : p.slug}</p>
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                p.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              }`}
            >
              {p.published ? "Live" : "Hidden"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
