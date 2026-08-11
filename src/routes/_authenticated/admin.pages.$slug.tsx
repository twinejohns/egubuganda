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

export const Route = createFileRoute("/_authenticated/admin/pages/$slug")({
  component: PageEditor,
});

type Form = {
  title: string;
  lead: string;
  body: string;
  meta_description: string;
  published: boolean;
};

function PageEditor() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<Form>({
    title: "",
    lead: "",
    body: "",
    meta_description: "",
    published: true,
  });

  const { data } = useQuery({
    queryKey: ["admin", "page", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("pages").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (data) {
      setForm({
        title: data.title,
        lead: data.lead,
        body: data.body,
        meta_description: data.meta_description,
        published: data.published,
      });
    }
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("pages").update(form).eq("slug", slug);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Page saved");
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      queryClient.invalidateQueries({ queryKey: ["cms"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Edit page</h1>
      <p className="mt-1 text-sm text-muted-foreground">/{slug === "home" ? "" : slug}</p>

      <div className="mt-6 space-y-5 rounded-lg border border-border bg-card p-6">
        <div className="space-y-1.5">
          <Label htmlFor="title">Page heading</Label>
          <Input id="title" value={form.title} onChange={(e) => set("title", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lead">Intro paragraph</Label>
          <Textarea id="lead" rows={3} value={form.lead} onChange={(e) => set("lead", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="body">Extra content (optional)</Label>
          <Textarea
            id="body"
            rows={14}
            className="font-mono text-sm"
            value={form.body}
            onChange={(e) => set("body", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Shown at the top of the page under the intro. Blank line = new paragraph,{" "}
            <code>## </code> = heading, <code>- </code> = bullet.
          </p>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="meta">Search engine description</Label>
          <Textarea
            id="meta"
            rows={2}
            value={form.meta_description}
            onChange={(e) => set("meta_description", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Switch
            id="published"
            checked={form.published}
            onCheckedChange={(v) => set("published", v)}
          />
          <Label htmlFor="published">Visible on the website</Label>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => save.mutate()} disabled={save.isPending}>
            {save.isPending ? "Saving…" : "Save"}
          </Button>
          <Button variant="outline" onClick={() => navigate({ to: "/admin/pages" })}>
            Back to pages
          </Button>
        </div>
      </div>
    </div>
  );
}
