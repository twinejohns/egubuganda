import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { PageShell, Section, CmsBody } from "@/components/page-shell";
import { postQuery, postsQuery, mediaUrl } from "@/lib/cms";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ context, params }) => {
    const post = await context.queryClient.ensureQueryData(postQuery(params.slug));
    if (!post) throw notFound();
    context.queryClient.ensureQueryData(postsQuery());
    return { title: post.title, excerpt: post.excerpt };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article unavailable | Environmental Hub Uganda" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.title} | Environmental Hub Uganda`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const { data: post } = useSuspenseQuery(postQuery(slug));
  const { data: all = [] } = useQuery(postsQuery());
  if (!post) return null;
  const others = all.filter((p) => p.slug !== post.slug).slice(0, 3);
  const date = post.published_at;

  return (
    <PageShell title={post.title} lead={post.excerpt}>
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-wide text-accent uppercase">
            {post.tag}
            {date
              ? ` · ${new Date(date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}`
              : ""}
          </p>
          {post.cover_url && (
            <img
              src={mediaUrl(post.cover_url)}
              alt={post.title}
              className="mt-6 w-full rounded-lg object-cover"
            />
          )}
          <div className="mt-6">
            <CmsBody body={post.body} />
          </div>
          <Link
            to="/blog"
            className="mt-10 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            ← Back to all articles
          </Link>
        </div>
      </Section>

      {others.length > 0 && (
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
      )}
    </PageShell>
  );
}
