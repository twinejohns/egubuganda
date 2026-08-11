import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, HelpCircle } from "lucide-react";
import { PageShell, Section, Eyebrow } from "@/components/page-shell";
import { useQuery } from "@tanstack/react-query";
import { postsQuery } from "@/lib/cms";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources & FAQs | Environmental Hub Uganda" },
      {
        name: "description",
        content:
          "Frequently asked questions, organisational documents and publications from Environmental Hub Uganda (EHUG).",
      },
      { property: "og:title", content: "Resources & FAQs | Environmental Hub Uganda" },
      {
        property: "og:description",
        content: "FAQs, governance documents and field publications from Environmental Hub Uganda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResourcesPage,
});

const FAQS = [
  {
    q: "What is Bricks Environment and Climate Hub Initiative Uganda (EHUB)?",
    a: "A youth-led non-governmental organisation based in Uganda, dedicated to environmental conservation, advocacy, capacity building, climate mitigation and adaptation, research, innovation and sustainable development.",
  },
  {
    q: "What is the mission of Environmental Hub Uganda?",
    a: "To promote community involvement in creating a sustainable environment for generations.",
  },
  {
    q: "What initiatives does EHUB undertake?",
    a: "Research and innovation, advocacy and environmental education programmes, tree planting, waste management programmes and sustainable development projects.",
  },
  {
    q: "How can I get involved?",
    a: "Participate in our programmes, volunteer your time, contribute to our initiatives, or subscribe as a member. See the Get Involved page for membership packages.",
  },
  {
    q: "Do you support environmental start-ups?",
    a: "Yes. We support start-ups across environmental sectors, deliberately prioritising ventures led by women, youth and persons with disabilities.",
  },
];

const DOCS = [
  "Certificate of Registration / Incorporation",
  "NGO Registration Certificate",
  "Memorandum and Articles / Constitution",
  "Tax Identification Number (TIN) Certificate",
];

function ResourcesPage() {
  const { data: posts = [] } = useQuery(postsQuery());
  return (
    <PageShell
      slug="resources"
      title="Resources"
      lead="Frequently asked questions, organisational documents and writing from our field and research programmes."
    >
      <Section>
        <Eyebrow>FAQs</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
        <div className="mt-8 space-y-4">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-lg border border-border bg-card p-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-start gap-3 font-medium">
                <HelpCircle className="mt-0.5 size-5 shrink-0 text-primary" />
                {f.q}
              </summary>
              <p className="mt-3 pl-8 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section alt>
        <Eyebrow>Documents</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Organisational documents
        </h2>
        <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
          These statutory documents are available on request for partners, donors and grant
          processes.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {DOCS.map((d) => (
            <li
              key={d}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-5 text-sm"
            >
              <FileText className="size-5 shrink-0 text-primary" />
              {d}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Eyebrow>Publications</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">From our programmes</h2>
        <ul className="mt-8 space-y-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="flex flex-wrap items-baseline gap-x-3 rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-lg"
              >
                <span className="text-xs font-semibold tracking-wide text-accent uppercase">
                  {p.tag}
                </span>
                <span className="font-medium">{p.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </PageShell>
  );
}
