import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Section, Eyebrow } from "@/components/page-shell";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Get Involved | Environmental Hub Uganda" },
      {
        name: "description",
        content:
          "Become a member, volunteer, partner with us or donate. Annual membership packages from General to Platinum support environmental action across Uganda.",
      },
      { property: "og:title", content: "Get Involved | Environmental Hub Uganda" },
      {
        property: "og:description",
        content: "Membership, volunteering, partnerships and donations at Environmental Hub Uganda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GetInvolvedPage,
});

const MEMBERSHIP = [
  {
    name: "General Membership",
    cost: "UGX 20,000",
    features: [
      "Basic access to environmental resources",
      "Access to events and community",
      "Membership certificate",
    ],
  },
  {
    name: "Silver Membership",
    cost: "UGX 50,000",
    features: [
      "Exclusive workshops",
      "Networking opportunities",
      "Priority access to selected programmes",
      "Membership certificate",
    ],
  },
  {
    name: "Gold Membership",
    cost: "UGX 150,000",
    features: [
      "Personalised consultations",
      "Advanced workshops",
      "Priority registration for major events",
      "Membership certificate and environmental pack",
    ],
  },
  {
    name: "Platinum Membership",
    cost: "UGX 500,000",
    features: [
      "VIP access to all events",
      "One-on-one expert sessions",
      "Recognition as a key supporter",
      "Membership certificate and environmental family pack",
    ],
  },
];

const WAYS = [
  {
    title: "Volunteer",
    text: "Join field days, restoration campaigns and school outreach. Tell us your background and interests and we will match you to an active programme.",
  },
  {
    title: "Partner with us",
    text: "We work with community groups, schools, universities, local governments, cooperatives and development partners on jointly designed initiatives.",
  },
  {
    title: "Donate",
    text: "Contributions fund seedlings, workshops, research and youth innovation support. Get in touch and we will share our current funding priorities.",
  },
];

function GetInvolvedPage() {
  return (
    <PageShell
      slug="get-involved"
      title="Get Involved"
      lead="Membership, volunteering, partnerships and donations — several ways to join the work of building a sustainable environment for generations."
    >
      <Section>
        <Eyebrow>Membership</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Annual subscription packages
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MEMBERSHIP.map((m) => (
            <div
              key={m.name}
              className="flex flex-col rounded-lg border border-border bg-card p-7 transition-shadow hover:shadow-lg"
            >
              <h3 className="text-base font-semibold">{m.name}</h3>
              <p className="mt-2 text-2xl font-bold text-primary">{m.cost}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {m.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-6 rounded-md bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
              >
                Subscribe
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Subscriptions are payable annually to the organisation&apos;s treasury.
        </p>
      </Section>

      <Section alt>
        <Eyebrow>Other ways to help</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Volunteer, partner, give</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {WAYS.map((w) => (
            <article key={w.title} className="rounded-lg border border-border bg-card p-7">
              <h3 className="text-lg font-semibold">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
            </article>
          ))}
        </div>
        <Link
          to="/contact"
          className="mt-8 inline-block rounded-md bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
        >
          Talk to our team
        </Link>
      </Section>
    </PageShell>
  );
}
