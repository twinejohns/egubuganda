import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_authenticated/admin/menus")({
  component: MenusPage,
});

type Row = {
  id: string;
  location: string;
  label: string;
  url: string;
  sort_order: number;
  visible: boolean;
};

function MenusPage() {
  const queryClient = useQueryClient();
  const { data: items } = useQuery({
    queryKey: ["admin", "menu_items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("menu_items")
        .select("id, location, label, url, sort_order, visible")
        .order("location")
        .order("sort_order");
      if (error) throw error;
      return data as Row[];
    },
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "menu_items"] });
    queryClient.invalidateQueries({ queryKey: ["cms"] });
  };

  const update = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<Row> }) => {
      const { error } = await supabase.from("menu_items").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
    onError: (e: Error) => toast.error(e.message),
  });

  const add = useMutation({
    mutationFn: async (location: string) => {
      const max = Math.max(0, ...(items ?? []).filter((i) => i.location === location).map((i) => i.sort_order));
      const { error } = await supabase
        .from("menu_items")
        .insert({ location, label: "New link", url: "/", sort_order: max + 1 });
      if (error) throw error;
    },
    onSuccess: invalidate,
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("menu_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
    onError: (e: Error) => toast.error(e.message),
  });

  const locations = ["header", "footer"];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Menus</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Navigation links. Changes save as you leave each field.
      </p>

      {locations.map((loc) => (
        <div key={loc} className="mt-6 rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-4">
            <h2 className="font-semibold capitalize">{loc} menu</h2>
            <Button size="sm" variant="outline" onClick={() => add.mutate(loc)}>
              <Plus className="size-4" /> Add link
            </Button>
          </div>
          <div className="divide-y divide-border">
            {(items ?? [])
              .filter((i) => i.location === loc)
              .map((item) => (
                <div key={item.id} className="grid gap-3 p-4 sm:grid-cols-[1fr_1fr_5rem_auto] sm:items-end">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Label</Label>
                    <Input
                      defaultValue={item.label}
                      onBlur={(e) =>
                        e.target.value !== item.label &&
                        update.mutate({ id: item.id, patch: { label: e.target.value } })
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Link</Label>
                    <Input
                      defaultValue={item.url}
                      onBlur={(e) =>
                        e.target.value !== item.url &&
                        update.mutate({ id: item.id, patch: { url: e.target.value } })
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Order</Label>
                    <Input
                      type="number"
                      defaultValue={item.sort_order}
                      onBlur={(e) =>
                        update.mutate({ id: item.id, patch: { sort_order: Number(e.target.value) } })
                      }
                    />
                  </div>
                  <div className="flex items-center gap-3 pb-1">
                    <Switch
                      checked={item.visible}
                      onCheckedChange={(v) => update.mutate({ id: item.id, patch: { visible: v } })}
                    />
                    <Button variant="ghost" size="sm" onClick={() => remove.mutate(item.id)}>
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            {(items ?? []).filter((i) => i.location === loc).length === 0 && (
              <p className="p-4 text-sm text-muted-foreground">No links yet.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
