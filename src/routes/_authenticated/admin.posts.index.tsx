import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/posts/")({
  component: PostsList,
});

function PostsList() {
  const queryClient = useQueryClient();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin", "posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, tag, slug, published, published_at, updated_at")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Post deleted");
      queryClient.invalidateQueries({ queryKey: ["admin", "posts"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const togglePublish = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { error } = await supabase
        .from("posts")
        .update({ published, published_at: published ? new Date().toISOString() : null })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "posts"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog posts</h1>
          <p className="mt-1 text-sm text-muted-foreground">Write and publish articles.</p>
        </div>
        <Button asChild>
          <Link to="/admin/posts/$id" params={{ id: "new" }}>
            <Plus className="size-4" /> New post
          </Link>
        </Button>
      </div>

      <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-card">
        {isLoading && <p className="p-5 text-sm text-muted-foreground">Loading…</p>}
        {posts?.length === 0 && (
          <p className="p-5 text-sm text-muted-foreground">No posts yet.</p>
        )}
        {posts?.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center gap-3 p-4">
            <div className="min-w-0 flex-1">
              <Link
                to="/admin/posts/$id"
                params={{ id: p.id }}
                className="font-medium hover:text-primary"
              >
                {p.title}
              </Link>
              <p className="text-xs text-muted-foreground">
                {p.tag || "Untagged"} · /blog/{p.slug}
              </p>
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                p.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              }`}
            >
              {p.published ? "Published" : "Draft"}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => togglePublish.mutate({ id: p.id, published: !p.published })}
            >
              {p.published ? "Unpublish" : "Publish"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm(`Delete "${p.title}"?`)) remove.mutate(p.id);
              }}
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
