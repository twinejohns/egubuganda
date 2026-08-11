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

export function CmsBody({ body }: { body: string }) {
  const blocks = parseBody(body);
  if (!blocks.length) return null;
  return (
    <div className="mx-auto max-w-3xl space-y-5 text-[15px] leading-relaxed text-muted-foreground">
      {blocks.map((b, i) =>
        b.type === "h2" ? (
          <h2 key={i} className="text-2xl font-bold tracking-tight text-foreground">
            {b.text}
          </h2>
        ) : b.type === "ul" ? (
          <ul key={i} className="list-disc space-y-1 pl-5">
            {b.items?.map((item) => <li key={item}>{item}</li>)}
          </ul>
        ) : (
          <p key={i}>{b.text}</p>
        ),
      )}
    </div>
  );
}

export function PageShell({
  title,
  lead,
  slug,
  children,
}: {
  title: string;
  lead?: string;
  /** When set, the heading, intro and extra body text are managed from the admin area. */
  slug?: string;
  children: ReactNode;
}) {
  const { data: page } = useQuery({ ...pageQuery(slug ?? ""), enabled: Boolean(slug) });
  const heading = page?.title || title;
  const intro = page?.lead || lead;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="bg-[var(--brand-dark)] px-6 pt-32 pb-16 text-primary-foreground">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{heading}</h1>
          {intro && (
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-primary-foreground/80">
              {intro}
            </p>
          )}
        </div>
      </section>
      {page?.body ? (
        <Section>
          <CmsBody body={page.body} />
        </Section>
      ) : null}
      {children}

      <SiteFooter />
    </div>
  );
}
