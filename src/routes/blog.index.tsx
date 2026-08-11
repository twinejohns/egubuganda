import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Section, Eyebrow } from "@/components/page-shell";
import { POSTS } from "@/data/posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog | Environmental Hub Uganda" },
      {
        name: "description",
        content:
          "Stories, research notes and programme updates from Environmental Hub Uganda: restoration, climate education, research, youth innovation and climate finance.",
      },
      { property: "og:title", content: "Blog | Environmental Hub Uganda" },
      {
        property: "og:description",
        content: "Field notes and research updates from Environmental Hub Uganda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <PageShell
      title="Blog"
      lead="Notes, research and stories from our work across Uganda — restoration, education, research, innovation and climate finance."
    >
      <Section>
        <Eyebrow>From the field</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Latest articles</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <article
              key={p.slug}
              className="flex flex-col rounded-lg border border-border bg-card p-7 transition-shadow hover:shadow-lg"
            >
              <span className="text-xs font-semibold tracking-wide text-accent uppercase">
                {p.tag}
              </span>
              <h3 className="mt-2 text-lg font-semibold">
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-primary">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.excerpt}
              </p>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="mt-4 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
