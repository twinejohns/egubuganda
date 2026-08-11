import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { NAV } from "./site-header";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--brand-dark)] py-12 text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">Environmental Hub Uganda</h3>
          <p className="mt-3 text-sm text-primary-foreground/70">
            Bricks Environment and Climate Hub Initiative Uganda (EHUG) — a youth-led NGO working
            with communities for a sustainable environment.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Explore</h4>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-primary-foreground/70">
            {NAV.map((n) => (
              <li key={n.label}>
                <Link to={n.to} className="hover:text-accent">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Follow us</h4>
          <div className="mt-3 flex gap-3">
            {[
              { Icon: Twitter, href: "https://x.com/ehUganda", label: "X" },
              {
                Icon: Instagram,
                href: "https://instagram.com/environmental_hub_uganda",
                label: "Instagram",
              },
              {
                Icon: Linkedin,
                href: "https://ug.linkedin.com/company/bricks-environment-and-climate-hub-initiative-uganda-ltd",
                label: "LinkedIn",
              },
              {
                Icon: Youtube,
                href: "https://youtube.com/@Environmental_hub_Uganda",
                label: "YouTube",
              },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="grid size-9 place-items-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-6 text-xs text-primary-foreground/50">
        © {new Date().getFullYear()} Environmental Hub Uganda. All rights reserved.
      </div>
    </footer>
  );
}
