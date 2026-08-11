import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_authenticated/admin/posts/$id")({
  component: PostEditor,
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

type Form = {
  title: string;
  slug: string;
  tag: string;
  excerpt: string;
  body: string;
  cover_url: string;
  published: boolean;
};

const EMPTY: Form = {
  title: "",
  slug: "",
  tag: "",
  excerpt: "",
  body: "",
  cover_url: "",
  published: false,
};

function PostEditor() {
  const { id } = Route.useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<Form>(EMPTY);

  const { data } = useQuery({
    queryKey: ["admin", "post", id],
    enabled: !isNew,
    queryFn: async () => {
      const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (data) {
      setForm({
        title: data.title,
        slug: data.slug,
        tag: data.tag,
        excerpt: data.excerpt,
        body: data.body,
        cover_url: data.cover_url ?? "",
        published: data.published,
      });
    }
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title.trim(),
        slug: (form.slug.trim() || slugify(form.title)).trim(),
        tag: form.tag.trim(),
        excerpt: form.excerpt.trim(),
        body: form.body,
        cover_url: form.cover_url.trim() || null,
        published: form.published,
        published_at: form.published ? (data?.published_at ?? new Date().toISOString()) : null,
      };
      if (!payload.title) throw new Error("A title is required");
      if (isNew) {
        const { data: created, error } = await supabase
          .from("posts")
          .insert(payload)
          .select("id")
          .single();
        if (error) throw error;
        return created.id;
      }
      const { error } = await supabase.from("posts").update(payload).eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: (newId) => {
      toast.success("Saved");
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      queryClient.invalidateQueries({ queryKey: ["cms"] });
      if (isNew) navigate({ to: "/admin/posts/$id", params: { id: newId } });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{isNew ? "New post" : "Edit post"}</h1>

      <div className="mt-6 space-y-5 rounded-lg border border-border bg-card p-6">
        <div className="space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => {
              const title = e.target.value;
              setForm((f) => ({
                ...f,
                title,
                slug: isNew && (!f.slug || f.slug === slugify(f.title)) ? slugify(title) : f.slug,
              }));
            }}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="slug">Web address (slug)</Label>
            <Input id="slug" value={form.slug} onChange={(e) => set("slug", e.target.value)} />
            <p className="text-xs text-muted-foreground">/blog/{form.slug || "…"}</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tag">Category</Label>
            <Input
              id="tag"
              placeholder="Conservation"
              value={form.tag}
              onChange={(e) => set("tag", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="cover">Cover image link</Label>
          <Input
            id="cover"
            placeholder="Paste a link from the Media page"
            value={form.cover_url}
            onChange={(e) => set("cover_url", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="excerpt">Short summary</Label>
          <Textarea
            id="excerpt"
            rows={3}
            value={form.excerpt}
            onChange={(e) => set("excerpt", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="body">Article</Label>
          <Textarea
            id="body"
            rows={18}
            className="font-mono text-sm"
            value={form.body}
            onChange={(e) => set("body", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Blank line = new paragraph. Start a line with <code>## </code> for a heading or{" "}
            <code>- </code> for a bullet.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Switch
            id="published"
            checked={form.published}
            onCheckedChange={(v) => set("published", v)}
          />
          <Label htmlFor="published">Published (visible on the website)</Label>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => save.mutate()} disabled={save.isPending}>
            {save.isPending ? "Saving…" : "Save"}
          </Button>
          <Button variant="outline" onClick={() => navigate({ to: "/admin/posts" })}>
            Back to posts
          </Button>
        </div>
      </div>
    </div>
  );
}
