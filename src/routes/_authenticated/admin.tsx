import { Link, Outlet, createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  FileText,
  Newspaper,
  Settings,
  Menu as MenuIcon,
  Images,
  LayoutDashboard,
  Upload,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/posts", label: "Blog posts", icon: Newspaper },
  { to: "/admin/pages", label: "Pages", icon: FileText },
  { to: "/admin/slides", label: "Sliders", icon: Images },
  { to: "/admin/menus", label: "Menus", icon: MenuIcon },
  { to: "/admin/media", label: "Media", icon: Upload },
  { to: "/admin/settings", label: "Site settings", icon: Settings },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="flex min-h-screen bg-secondary">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card md:flex">
        <div className="border-b border-border px-5 py-4">
          <p className="text-sm font-semibold">Content manager</p>
          <p className="text-xs text-muted-foreground">Environmental Hub Uganda</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((n) => {
            const active = "exact" in n ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                  active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                <n.icon className="size-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-2 border-t border-border p-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
          >
            <ExternalLink className="size-4" /> View website
          </a>
          <Button variant="outline" className="w-full justify-start gap-2" onClick={signOut}>
            <LogOut className="size-4" /> Sign out
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex gap-2 overflow-x-auto border-b border-border bg-card p-2 md:hidden">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-1.5 text-xs whitespace-nowrap hover:bg-muted"
            >
              {n.label}
            </Link>
          ))}
          <button onClick={signOut} className="rounded-md px-3 py-1.5 text-xs whitespace-nowrap">
            Sign out
          </button>
        </div>
        <main className="mx-auto w-full max-w-5xl flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
