import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Copy, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { mediaUrl } from "@/lib/cms";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/media")({
  component: MediaPage,
});

function MediaPage() {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const { data: files } = useQuery({
    queryKey: ["admin", "media"],
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from("media")
        .list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });
      if (error) throw error;
      return (data ?? []).filter((f) => f.id);
    },
  });

  const remove = useMutation({
    mutationFn: async (name: string) => {
      const { error } = await supabase.storage.from("media").remove([name]);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "media"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  async function onUpload(fileList: FileList | null) {
    if (!fileList?.length) return;
    setBusy(true);
    try {
      for (const file of Array.from(fileList)) {
        const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
        const name = `${Date.now()}-${safe}`;
        const { error } = await supabase.storage.from("media").upload(name, file, {
          contentType: file.type,
          upsert: false,
        });
        if (error) throw error;
      }
      toast.success("Uploaded");
      queryClient.invalidateQueries({ queryKey: ["admin", "media"] });
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Media</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload photos, then copy a link to use in a post or slide.
          </p>
        </div>
        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => onUpload(e.target.files)}
          />
          <Button onClick={() => inputRef.current?.click()} disabled={busy}>
            <Upload className="size-4" /> {busy ? "Uploading…" : "Upload images"}
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {files?.map((f) => {
          const url = mediaUrl(f.name)!;
          return (
            <div key={f.name} className="overflow-hidden rounded-lg border border-border bg-card">
              <img src={url} alt={f.name} className="h-32 w-full object-cover" loading="lazy" />
              <div className="space-y-2 p-3">
                <p className="truncate text-xs text-muted-foreground">{f.name}</p>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      navigator.clipboard.writeText(f.name);
                      toast.success("Link copied");
                    }}
                  >
                    <Copy className="size-3.5" /> Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => confirm(`Delete ${f.name}?`) && remove.mutate(f.name)}
                  >
                    <Trash2 className="size-3.5 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
        {files?.length === 0 && (
          <p className="text-sm text-muted-foreground">No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
}
