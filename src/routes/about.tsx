import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Sprout, Leaf, FlaskConical } from "lucide-react";
import { PageShell, Section, Eyebrow } from "@/components/page-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Environmental Hub Uganda" },
      {
        name: "description",
        content:
          "Who we are: a youth-led Ugandan NGO advancing environmental conservation, climate resilience and sustainable development. Our mission, vision and core values.",
      },
      { property: "og:title", content: "About Us | Environmental Hub Uganda" },
      {
        property: "og:description",
        content:
          "A youth-led NGO empowering youth, women and communities to design sustainable solutions to environmental challenges.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { name: "Transparency", text: "Open and accountable in all our actions and decisions." },
  { name: "Integrity", text: "Upholding honesty, ethics and consistency in our work." },
  { name: "Compassion", text: "Serving communities with empathy and care for people and nature." },
  {
    name: "Innovativeness",
    text: "Embracing creative, research-driven and practical solutions.",
  },
  {
    name: "Inclusivity",
    text: "Ensuring equitable participation of youth, women, persons with disabilities and marginalised groups.",
  },
];

const ACTIVITIES = [
  { icon: ShieldCheck, title: "Climate Mitigation & Adaptation" },
  { icon: Leaf, title: "Conservation & Restoration" },
  { icon: Sprout, title: "Environmental Education" },
  { icon: FlaskConical, title: "Research & Innovation" },
];

function AboutPage() {
  return (
    <PageShell
      title="About Us"
      lead="Bricks Environment and Climate Hub Initiative Uganda — a youth-led organisation for environmental conservation, climate resilience and sustainable development."
    >
      <Section>
        <Eyebrow>Who we are</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          A youth-led environmental organisation
        </h2>
        <div className="mt-6 grid gap-6 text-[15px] leading-relaxed text-muted-foreground lg:grid-cols-2">
          <p>
            Environmental Hub Uganda (Bricks Environment and Climate Hub Initiative Uganda) is a
            youth-led non-governmental organisation dedicated to environmental conservation, climate
            resilience and sustainable development. We empower youth, women and communities to
            design and implement innovative, sustainable solutions to environmental challenges.
          </p>
          <p>
            The organisation is legally registered as a Non-Governmental Organisation under the laws
            of Uganda and operates under the name Bricks Environment and Climate Hub Initiative
            Uganda, commonly referred to as Environmental Hub Uganda (EHUG). Established in 2023, it
            advances environmental sustainability, climate action, biodiversity conservation,
            research, innovation and community resilience across Uganda.
          </p>
        </div>
      </Section>

      <Section alt>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border-l-4 border-primary bg-card p-7">
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="mt-2 text-muted-foreground">
              To promote community involvement in creating a sustainable environment for
              generations.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-accent bg-card p-7">
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <p className="mt-2 text-muted-foreground">
              Creating a sustainable environment for improved quality of life and socioeconomic
              transformation.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <Eyebrow>What guides us</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Core Values</h2>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <li key={v.name} className="rounded-lg border border-border bg-card p-6">
              <span className="text-xs font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 text-lg font-semibold">{v.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section alt>
        <Eyebrow>Legal status</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Registered and accountable
        </h2>
        <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          Environmental Hub Uganda has legal personality, enabling it to enter into contracts,
          receive grants and donations, implement projects, and establish partnerships with
          government institutions, development partners, academic institutions and the private
          sector. Full governance detail — the Board of Trustees, management team and accountability
          systems — is set out on the{" "}
          <Link to="/team" className="font-medium text-primary underline-offset-4 hover:underline">
            Team &amp; Governance
          </Link>{" "}
          page.
        </p>
      </Section>

      <Section>
        <Eyebrow>Core activities</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Where we focus</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIVITIES.map((a) => (
            <Link
              key={a.title}
              to="/our-work"
              className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lg"
            >
              <span className="grid size-11 place-items-center rounded-full bg-primary/10">
                <a.icon className="size-5 text-primary" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{a.title}</h3>
            </Link>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
