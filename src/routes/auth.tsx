import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in | Environmental Hub Uganda" },
      { name: "description", content: "Administrator sign in for the Environmental Hub Uganda website content manager." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Sign in | Environmental Hub Uganda" },
      { property: "og:description", content: "Administrator sign in for the website content manager." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        if (data.session) {
          navigate({ to: "/admin" });
        } else {
          toast.success("Account created — check your email to confirm, then sign in.");
          setMode("signin");
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-secondary px-6">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-full bg-primary">
            <Leaf className="size-5 text-primary-foreground" />
          </span>
          <span className="text-sm font-semibold">Environmental Hub Uganda</span>
        </Link>
        <h1 className="mt-6 text-2xl font-bold tracking-tight">
          {mode === "signin" ? "Sign in" : "Create the admin account"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Access the website content manager."
            : "The first account created becomes the site administrator."}
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          {mode === "signin" ? "First time? Create the admin account" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
