export const ORGANISATION = {
  name: "Environmental Hub Uganda",
  legalName: "Bricks Environment and Climate Hub Initiative Uganda (EHUG)",
  legalStatus: "Registered Non-Governmental Organisation under the laws of Uganda",
  established: "2023",
  summary:
    "A youth-led non-governmental organisation dedicated to environmental conservation, climate resilience and sustainable development. We empower youth, women and communities to design and implement innovative, sustainable solutions to environmental challenges.",
  mission:
    "To empower communities through environmental conservation, climate action, research and innovation for a sustainable and resilient Uganda.",
  vision:
    "A green, climate-resilient Uganda where communities and ecosystems thrive together.",
  coreValues: [
    { name: "Transparency", description: "Open and accountable in all our actions and decisions." },
    { name: "Integrity", description: "Upholding honesty, ethics and consistency in our work." },
    { name: "Compassion", description: "Serving communities with empathy and care for people and nature." },
    { name: "Innovativeness", description: "Embracing creative, research-driven and practical solutions." },
    {
      name: "Inclusivity",
      description:
        "Ensuring equitable participation of youth, women, persons with disabilities and marginalised groups.",
    },
  ],
  coreActivities: [
    "Climate Mitigation & Adaptation",
    "Conservation & Restoration",
    "Environmental Education",
    "Research & Innovation",
  ],
  contact: {
    location: "Kampala, Uganda",
    phone: "+256 700 000 000",
    contactPage: "/contact",
  },
} as const;

export type SitePage = {
  path: string;
  title: string;
  description: string;
};

export const SITE_PAGES: SitePage[] = [
  { path: "/", title: "Home", description: "Overview of Environmental Hub Uganda's mission, activities and impact." },
  { path: "/about", title: "About Us", description: "Who we are, mission, vision and core values." },
  { path: "/our-work", title: "Our Work", description: "The four core activity areas in detail." },
  { path: "/impact", title: "Impact", description: "Results, reach and relevant experience since 2022." },
  { path: "/team", title: "Team & Governance", description: "Legal status, leadership hierarchy, staffing and accountability." },
  { path: "/get-involved", title: "Get Involved", description: "Membership tiers, volunteering and partnership options." },
  { path: "/resources", title: "Resources", description: "FAQs, statutory documents and field publications." },
  { path: "/blog", title: "Blog", description: "Field stories and updates from our programmes." },
  { path: "/contact", title: "Contact", description: "How to reach the team in Kampala." },
];
