import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Leaf, Sprout, FlaskConical } from "lucide-react";
import { PageShell, Section, Eyebrow } from "@/components/page-shell";

export const Route = createFileRoute("/our-work")({
  head: () => ({
    meta: [
      { title: "Our Work | Environmental Hub Uganda" },
      {
        name: "description",
        content:
          "Our four core activities: climate mitigation and adaptation, conservation and restoration, environmental education, and research and innovation.",
      },
      { property: "og:title", content: "Our Work | Environmental Hub Uganda" },
      {
        property: "og:description",
        content:
          "Climate-smart agriculture, tree planting, environmental education and evidence-based research across Uganda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OurWorkPage,
});

const ACTIVITIES = [
  {
    icon: ShieldCheck,
    title: "Climate Mitigation & Adaptation",
    text: "Implementing climate-smart agricultural practices and promoting disaster-resilient community strategies to help communities adapt to and mitigate the impacts of climate change.",
    points: [
      "Climate-smart agriculture demonstration and training",
      "Disaster preparedness and community resilience planning",
      "Adaptation support for smallholder farming households",
    ],
  },
  {
    icon: Leaf,
    title: "Conservation & Restoration",
    text: "Running tree-planting initiatives and ecosystem protection programmes that restore landscapes, protect biodiversity and strengthen community stewardship of natural resources.",
    points: [
      "Indigenous and fruit tree growing campaigns",
      "Degraded landscape and ecosystem restoration",
      "Community custodianship of natural resources",
    ],
  },
  {
    icon: Sprout,
    title: "Environmental Education",
    text: "Leading advocacy and awareness programmes to build capacity and empower the next generation of environmental change agents through schools, universities and community outreach.",
    points: [
      "School and university outreach programmes",
      "Youth capacity-building workshops",
      "Community advocacy and awareness campaigns",
    ],
  },
  {
    icon: FlaskConical,
    title: "Research & Innovation",
    text: "Acting as a platform for dialogue, innovation and evidence-based environmental policy — supporting research, knowledge generation and practical innovation for climate action and sustainable development.",
    points: [
      "Field research with academic partners",
      "Innovation boot camps and green enterprise mentorship",
      "Evidence for environmental policy dialogue",
    ],
  },
];

function OurWorkPage() {
  return (
    <PageShell
      title="Our Work"
      lead="Four core activities carry our mandate: climate mitigation and adaptation, conservation and restoration, environmental education, and research and innovation."
    >
      <Section>
        <Eyebrow>Core activities</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">What we do</h2>
        <div className="mt-10 space-y-8">
          {ACTIVITIES.map((a, i) => (
            <article
              key={a.title}
              className="grid gap-6 rounded-lg border border-border bg-card p-8 lg:grid-cols-[auto_1fr_1fr] lg:items-start"
            >
              <span className="grid size-12 place-items-center rounded-full bg-primary/10">
                <a.icon className="size-6 text-primary" />
              </span>
              <div>
                <span className="text-xs font-semibold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-xl font-semibold">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground lg:border-l lg:border-border lg:pl-6">
                {a.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
