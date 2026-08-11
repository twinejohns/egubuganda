import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { mediaUrl } from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_authenticated/admin/slides")({
  component: SlidesPage,
});

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  image_url: string | null;
  cta_label: string;
  cta_url: string;
  sort_order: number;
  active: boolean;
};

function SlidesPage() {
  const queryClient = useQueryClient();
  const { data: slides } = useQuery({
    queryKey: ["admin", "slides"],
    queryFn: async () => {
      const { data, error } = await supabase.from("slides").select("*").order("sort_order");
      if (error) throw error;
      return data as Slide[];
    },
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "slides"] });
    queryClient.invalidateQueries({ queryKey: ["cms"] });
  };

  const update = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<Slide> }) => {
      const { error } = await supabase.from("slides").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
    onError: (e: Error) => toast.error(e.message),
  });

  const add = useMutation({
    mutationFn: async () => {
      const max = Math.max(0, ...(slides ?? []).map((s) => s.sort_order));
      const { error } = await supabase
        .from("slides")
        .insert({ title: "New slide", sort_order: max + 1 });
      if (error) throw error;
    },
    onSuccess: invalidate,
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("slides").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Homepage sliders</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            The rotating banners at the top of the homepage.
          </p>
        </div>
        <Button onClick={() => add.mutate()}>
          <Plus className="size-4" /> Add slide
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        {slides?.map((s) => (
          <div key={s.id} className="rounded-lg border border-border bg-card p-5">
            <div className="grid gap-4 lg:grid-cols-[12rem_1fr]">
              <div>
                {s.image_url ? (
                  <img
                    src={mediaUrl(s.image_url)}
                    alt=""
                    className="h-28 w-full rounded-md object-cover"
                  />
                ) : (
                  <div className="grid h-28 place-items-center rounded-md bg-muted text-xs text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Headline</Label>
                    <Input
                      defaultValue={s.title}
                      onBlur={(e) => update.mutate({ id: s.id, patch: { title: e.target.value } })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Image link</Label>
                    <Input
                      defaultValue={s.image_url ?? ""}
                      placeholder="Paste from Media page"
                      onBlur={(e) =>
                        update.mutate({ id: s.id, patch: { image_url: e.target.value || null } })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Text</Label>
                  <Textarea
                    rows={3}
                    defaultValue={s.subtitle}
                    onBlur={(e) => update.mutate({ id: s.id, patch: { subtitle: e.target.value } })}
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Button label</Label>
                    <Input
                      defaultValue={s.cta_label}
                      onBlur={(e) => update.mutate({ id: s.id, patch: { cta_label: e.target.value } })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Button link</Label>
                    <Input
                      defaultValue={s.cta_url}
                      onBlur={(e) => update.mutate({ id: s.id, patch: { cta_url: e.target.value } })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Order</Label>
                    <Input
                      type="number"
                      defaultValue={s.sort_order}
                      onBlur={(e) =>
                        update.mutate({ id: s.id, patch: { sort_order: Number(e.target.value) } })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={s.active}
                    onCheckedChange={(v) => update.mutate({ id: s.id, patch: { active: v } })}
                  />
                  <Label className="text-xs">Show on homepage</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto"
                    onClick={() => confirm("Delete this slide?") && remove.mutate(s.id)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
