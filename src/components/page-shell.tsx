import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { pageQuery, parseBody } from "@/lib/cms";


export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">{children}</p>
  );
}

export function Section({
  children,
  alt = false,
  id,
}: {
  children: ReactNode;
  alt?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={alt ? "bg-secondary py-16" : "py-16"}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}

export function PageShell({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="bg-[var(--brand-dark)] px-6 pt-32 pb-16 text-primary-foreground">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          {lead && (
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-primary-foreground/80">
              {lead}
            </p>
          )}
        </div>
      </section>
      {children}
      <SiteFooter />
    </div>
  );
}
