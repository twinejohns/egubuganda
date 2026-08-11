import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Section, Eyebrow } from "@/components/page-shell";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Our Impact & Experience | Environmental Hub Uganda" },
      {
        name: "description",
        content:
          "Relevant experience: community restoration and tree planting, climate education reaching 5,000+ youth, research, youth innovation and the KCFS Lab.",
      },
      { property: "og:title", content: "Our Impact & Experience | Environmental Hub Uganda" },
      {
        property: "og:description",
        content:
          "Community-based environmental and climate action initiatives across Uganda since 2022.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ImpactPage,
});

const STATS = [
  { value: "5,000+", label: "Young people reached" },
  { value: "4", label: "Districts of active restoration" },
  { value: "8", label: "Core staff, plus fellows and volunteers" },
  { value: "2019", label: "Community work began" },
];

const EXPERIENCE = [
  {
    title: "Community Restoration and Tree Planting",
    period: "2022 – Present",
    text: "Tree-growing and ecosystem restoration campaigns in Kampala, Wakiso, Mukono and Kyegegwa District (Kyaka II refugee host communities), promoting indigenous and fruit tree planting, environmental awareness and community participation in landscape restoration.",
    slug: "community-restoration-tree-planting",
  },
  {
    title: "Climate and Environmental Education",
    period: "2023 – Present",
    text: "Environmental awareness campaigns, school outreach programmes and youth capacity-building workshops at Kyambogo University, Makerere University, Gayaza Girls School and community groups across Central Uganda, reaching over 5,000 young people.",
    slug: "climate-environmental-education",
  },
  {
    title: "Research and Community-Based Conservation",
    period: "2024 – Present",
    text: "Environmental research and field studies on biodiversity, waste management and climate resilience in collaboration with Kyambogo University, including community engagement in Kyaka II Refugee Settlement and surrounding host communities.",
    slug: "research-community-based-conservation",
  },
  {
    title: "Youth Innovation and Green Skills",
    period: "2022 – Present",
    text: "Innovation boot camps, hackathons and mentorship programmes that equip young people with practical solutions in climate action, waste management and green entrepreneurship.",
    slug: "youth-innovation-green-skills",
  },
  {
    title: "Climate Finance and Sustainable Development",
    period: "2025 – Present",
    text: "Leading the establishment of the Kyambogo University Climate Finance Solutions Lab (KCFS Lab) to strengthen climate finance knowledge, research and access for youth, local governments, researchers and community organisations.",
    slug: "kcfs-lab-climate-finance",
  },
];

function ImpactPage() {
  return (
    <PageShell
      slug="impact"
      title="Our Impact"
      lead="Community-based environmental and climate action across Uganda, with a strong focus on biodiversity conservation, ecosystem restoration, climate resilience, environmental education and youth empowerment."
    >
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-card p-7 text-center">
              <p className="text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section alt>
        <Eyebrow>Relevant experience</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Programmes and results
        </h2>
        <div className="mt-10 space-y-6">
          {EXPERIENCE.map((e) => (
            <article key={e.title} className="rounded-lg border border-border bg-card p-8">
              <p className="text-xs font-semibold tracking-wide text-accent uppercase">
                {e.period}
              </p>
              <h3 className="mt-2 text-xl font-semibold">{e.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
              <Link
                to="/blog/$slug"
                params={{ slug: e.slug }}
                className="mt-4 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                Read the story →
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
