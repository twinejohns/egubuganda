import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Leaf, Menu, X } from "lucide-react";

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Our Work", to: "/our-work" },
  { label: "Impact", to: "/impact" },
  { label: "Team & Governance", to: "/team" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Resources", to: "/resources" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "bg-[var(--brand-dark)]/95 shadow-lg backdrop-blur"
          : "bg-[var(--brand-dark)]/60"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-primary-foreground">
          <img
            src={ehubLogo.url}
            alt="Environmental Hub Uganda logo"
            width={36}
            height={36}
            className="size-9 rounded-full object-contain"
          />
          <span className="text-sm leading-tight font-semibold">
            Environmental Hub
            <br />
            <span className="text-accent">Uganda</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-5 xl:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              activeProps={{ className: "text-accent" }}
              className="text-sm font-medium text-primary-foreground/85 transition-colors hover:text-accent"
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/get-involved"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
          >
            Donate
          </Link>
        </nav>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle navigation"
          className="ml-auto text-primary-foreground xl:hidden"
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-primary-foreground/10 px-4 pb-4 xl:hidden">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              onClick={() => setMenuOpen(false)}
              activeProps={{ className: "text-accent" }}
              className="block py-2 text-sm font-medium text-primary-foreground/85 hover:text-accent"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
