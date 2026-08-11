import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: SettingsPage,
});

const FIELDS: { key: string; label: string; multiline?: boolean; hint?: string }[] = [
  { key: "site_name", label: "Organisation name" },
  { key: "tagline", label: "Tagline" },
  { key: "mission", label: "Mission", multiline: true },
  { key: "vision", label: "Vision", multiline: true },
  { key: "values", label: "Core values", multiline: true, hint: "One value per line" },
  { key: "email", label: "Email address" },
  { key: "phone", label: "Phone number" },
  { key: "address", label: "Physical address", multiline: true },
  { key: "facebook_url", label: "Facebook link" },
  { key: "twitter_url", label: "X / Twitter link" },
  { key: "linkedin_url", label: "LinkedIn link" },
];

function SettingsPage() {
  const queryClient = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});

  const { data } = useQuery({
    queryKey: ["admin", "site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("key, value");
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (!data) return;
    const next: Record<string, string> = {};
    for (const row of data) {
      next[row.key] = typeof row.value === "string" ? row.value : JSON.stringify(row.value);
    }
    setValues(next);
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const rows = FIELDS.map((f) => ({ key: f.key, value: values[f.key] ?? "" }));
      const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Settings saved");
      queryClient.invalidateQueries({ queryKey: ["admin", "site_settings"] });
      queryClient.invalidateQueries({ queryKey: ["cms"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Site settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Organisation details used across the website.
      </p>

      <div className="mt-6 space-y-5 rounded-lg border border-border bg-card p-6">
        {FIELDS.map((f) => (
          <div key={f.key} className="space-y-1.5">
            <Label htmlFor={f.key}>{f.label}</Label>
            {f.multiline ? (
              <Textarea
                id={f.key}
                rows={3}
                value={values[f.key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              />
            ) : (
              <Input
                id={f.key}
                value={values[f.key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              />
            )}
            {f.hint && <p className="text-xs text-muted-foreground">{f.hint}</p>}
          </div>
        ))}
        <Button onClick={() => save.mutate()} disabled={save.isPending}>
          {save.isPending ? "Saving…" : "Save settings"}
        </Button>
      </div>
    </div>
  );
}
