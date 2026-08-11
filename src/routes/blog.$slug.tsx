import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/page-shell";
import { getPost, POSTS, type Post } from "@/data/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }): { post: Post } => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article unavailable | Environmental Hub Uganda" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    const title = `${post.title} | Environmental Hub Uganda`;
    return {
      meta: [
        { title },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <PageShell title={post.title} lead={post.excerpt}>
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-wide text-accent uppercase">
            {post.tag} ·{" "}
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-muted-foreground">
            {post.body.map((para: string) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>
          <Link
            to="/blog"
            className="mt-10 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            ← Back to all articles
          </Link>
        </div>
      </Section>

      <Section alt>
        <h2 className="text-2xl font-bold tracking-tight">More from the field</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {others.map((p) => (
            <article key={p.slug} className="rounded-lg border border-border bg-card p-7">
              <span className="text-xs font-semibold tracking-wide text-accent uppercase">
                {p.tag}
              </span>
              <h3 className="mt-2 text-lg font-semibold">
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-primary">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
