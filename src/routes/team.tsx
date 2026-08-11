import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section, Eyebrow } from "@/components/page-shell";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team & Governance | Environmental Hub Uganda" },
      {
        name: "description",
        content:
          "Legal status, hierarchy of leadership, Board of Trustees, executive management, core staffing structure and accountability mechanisms at Environmental Hub Uganda.",
      },
      { property: "og:title", content: "Team & Governance | Environmental Hub Uganda" },
      {
        property: "og:description",
        content:
          "How Environmental Hub Uganda is governed: Board of Trustees, patron, legal advisor, executive management and MEAL systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeamPage,
});

const SECRETARIAT = [
  "Team Lead",
  "Legal and Ethical Officer",
  "Finance and Administration Officer",
  "Partnerships and Development",
  "Publicity and Mobilization Officer",
  "IT and Content Development Officer",
  "Administration Assistants",
];

const PROJECT_OFFICERS = [
  "Research, Innovation and Development",
  "Community Advocacy and Education",
  "Climate Action and Disaster Resilience",
  "Climate Smart Agriculture",
  "Culture, Eco-tourism and Cottage Industry",
];

const STAFF = [
  {
    role: "Team Lead (Executive Director)",
    duties:
      "Strategic leadership, organisational management, partnership development, resource mobilisation and overall programme oversight.",
  },
  {
    role: "Finance and Administration Manager",
    duties:
      "Financial management, budgeting, procurement, accounting, compliance, human resource administration and organisational operations.",
  },
  {
    role: "Programs and Advocacy Manager",
    duties:
      "Programme design and implementation, stakeholder engagement, policy advocacy, monitoring and evaluation, and project coordination.",
  },
  {
    role: "Communications and Human Resource Manager",
    duties:
      "Organisational communications, branding, public relations, staff welfare, recruitment and institutional communications.",
  },
  {
    role: "Partnerships and Resource Mobilization Manager",
    duties:
      "Strategic partnerships, donor engagement, fundraising, proposal development and institutional networking.",
  },
  {
    role: "Media and Digital Communications Manager",
    duties:
      "Digital communications, website management, media relations, content development and social media management.",
  },
  {
    role: "Partnerships and Resource Mobilization Officer",
    duties:
      "Supports partnership development, stakeholder engagement, proposal writing and donor relations.",
  },
  {
    role: "Research and Innovations Officer",
    duties:
      "Research coordination, innovation development, knowledge management, data analysis and technical support for evidence-based programming.",
  },
];

const ACCOUNTABILITY = [
  "Board oversight of strategic and financial decisions.",
  "Defined organisational policies and administrative procedures.",
  "Financial management systems with regular reporting.",
  "Project planning, monitoring, evaluation, accountability and learning (MEAL) mechanisms.",
  "Procurement and asset management procedures.",
  "Human resource policies governing recruitment, performance management and staff welfare.",
  "Compliance with statutory reporting obligations and donor requirements.",
];

const ANNEXES = [
  "Certificate of Registration / Incorporation",
  "NGO Registration Certificate",
  "Memorandum and Articles / Constitution",
  "Tax Identification Number (TIN) Certificate",
];

function TeamPage() {
  return (
    <PageShell
      title="Team & Governance"
      lead="Organisational structure, governance and administration of Bricks Environment and Climate Hub Initiative Uganda (EHUG)."
    >
      <Section>
        <Eyebrow>Legal status</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          A registered Ugandan NGO
        </h2>
        <p className="mt-5 max-w-4xl text-[15px] leading-relaxed text-muted-foreground">
          Environmental Hub Uganda is legally registered in Uganda as a Non-Governmental
          Organisation and operates under the name Bricks Environment and Climate Hub Initiative
          Uganda, commonly referred to as Environmental Hub Uganda (EHUG). The organisation has
          legal personality, enabling it to enter into contracts, receive grants and donations,
          implement projects, and establish partnerships with government institutions, development
          partners, academic institutions and the private sector.
        </p>
        <div className="mt-8 rounded-lg border border-border bg-card p-7">
          <h3 className="text-base font-semibold">
            Supporting legal documentation (attached as annexes)
          </h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {ANNEXES.map((a) => (
              <li key={a} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section alt>
        <Eyebrow>Hierarchy of leadership</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">How we are organised</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-lg border-l-4 border-primary bg-card p-7">
            <p className="text-xs font-semibold text-primary">Level 1</p>
            <h3 className="mt-1 text-lg font-semibold">The Board of Trustees</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Strategic leadership, policy oversight, fiduciary guidance and organisational
              accountability.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-accent bg-card p-7">
            <p className="text-xs font-semibold text-primary">Level 2</p>
            <h3 className="mt-1 text-lg font-semibold">The Top Management</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Executive management led by the Team Lead, responsible for day-to-day operations and
              programme implementation.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-primary bg-card p-7">
            <p className="text-xs font-semibold text-primary">Level 3</p>
            <h3 className="mt-1 text-lg font-semibold">The Secretariat</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Officers and project teams delivering programmes in the field.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-7">
            <h3 className="text-base font-semibold">Secretariat roles</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {SECRETARIAT.map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-7">
            <h3 className="text-base font-semibold">Project Officers</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {PROJECT_OFFICERS.map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <Eyebrow>Governance structure</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Oversight separated from management
        </h2>
        <p className="mt-5 max-w-4xl text-[15px] leading-relaxed text-muted-foreground">
          Environmental Hub Uganda is governed by a Board of Trustees that approves strategic plans,
          budgets and organisational policies, and ensures compliance with statutory and donor
          requirements. The governance structure is further supported by a Patron, who provides
          institutional guidance and strategic support; a Legal Advisor, who provides legal counsel
          and ensures regulatory compliance; and an Executive Management Team led by the Team Lead
          (Executive Director). This arrangement separates oversight from management, ensuring good
          governance and adherence to nonprofit best practice.
        </p>
      </Section>

      <Section alt>
        <Eyebrow>Administration and staffing</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Eight core positions
        </h2>
        <p className="mt-4 max-w-4xl text-[15px] leading-relaxed text-muted-foreground">
          The organisation operates with a multidisciplinary management team of eight core
          personnel, complemented by volunteers, interns, consultants and project-based technical
          experts engaged according to programme needs.
        </p>
        <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-secondary text-xs tracking-wide uppercase">
              <tr>
                <th className="px-5 py-4 font-semibold">Position</th>
                <th className="px-5 py-4 font-semibold">Key responsibilities</th>
              </tr>
            </thead>
            <tbody>
              {STAFF.map((s) => (
                <tr key={s.role} className="border-t border-border align-top">
                  <td className="px-5 py-4 font-medium">{s.role}</td>
                  <td className="px-5 py-4 text-muted-foreground">{s.duties}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-relaxed text-muted-foreground">
          Beyond the core staff, the organisation maintains a network of environmental experts,
          researchers, university collaborators, volunteers and student fellows who support project
          implementation across Uganda.
        </p>
      </Section>

      <Section>
        <Eyebrow>Accountability</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Governance and accountability mechanisms
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {ACCOUNTABILITY.map((a) => (
            <li key={a} className="rounded-lg border border-border bg-card p-5 text-sm">
              {a}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-4xl text-sm leading-relaxed text-muted-foreground">
          These systems enable the organisation to effectively manage grants, partnerships and
          multi-stakeholder initiatives.
        </p>
      </Section>
    </PageShell>
  );
}
