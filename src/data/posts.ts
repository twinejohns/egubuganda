export type Post = {
  slug: string;
  title: string;
  tag: string;
  date: string;
  excerpt: string;
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "community-restoration-tree-planting",
    title: "Growing forests with the people who tend them",
    tag: "Conservation",
    date: "2026-05-18",
    excerpt:
      "What we have learned from tree-growing and ecosystem restoration campaigns in Kampala, Wakiso, Mukono and the Kyaka II refugee host communities.",
    body: [
      "Since 2022 our restoration teams have worked alongside households, schools and local councils to put indigenous and fruit trees back into landscapes that have been steadily thinning out. The planting day is the easy part. Survival rates depend on who feels ownership of the seedling twelve months later.",
      "In Kyegegwa District, where refugee and host communities share fragile land and firewood demand is high, we pair every planting site with a community caretaker arrangement. Fruit species are deliberately included so that the trees carry household value, not just environmental value.",
      "Restoration only holds when the community sees a direct return. Fodder, fruit, shade, soil stability and windbreaks are all part of the pitch — and they are the reason a plot still has trees standing three seasons later.",
      "Our next phase focuses on nursery capacity within the communities themselves, so that seedling supply no longer depends on a single external delivery each season.",
    ],
  },
  {
    slug: "climate-environmental-education",
    title: "Reaching 5,000 young people with climate education",
    tag: "Education",
    date: "2026-04-02",
    excerpt:
      "School outreach and youth capacity-building at Kyambogo University, Makerere University, Gayaza Girls School and community groups across Central Uganda.",
    body: [
      "Environmental education is the quietest part of our work and arguably the most durable. Since 2023 our awareness campaigns and workshops have reached more than 5,000 young people across Central Uganda.",
      "The format is deliberately practical: waste audits on campus, seedling nurseries at schools, and sessions where students design a response to an environmental problem they can actually see from the classroom window.",
      "University partnerships give the programme depth. At Kyambogo and Makerere, student fellows carry sessions into their own faculties and communities, extending reach far beyond what a small secretariat could deliver alone.",
      "We measure success by what happens after the workshop — the clubs that keep meeting, the nurseries that keep producing, and the students who go on to join our field research.",
    ],
  },
  {
    slug: "research-community-based-conservation",
    title: "Building the evidence base for community conservation",
    tag: "Research",
    date: "2026-02-11",
    excerpt:
      "Field studies on biodiversity, waste management and climate resilience with Kyambogo University, including work in Kyaka II Refugee Settlement.",
    body: [
      "Too little accurate, timely information exists about environmental change on the ground in Uganda. Since 2024 we have supported field studies on biodiversity, waste management and climate resilience in collaboration with Kyambogo University.",
      "Community-based conservation needs numbers as much as goodwill. Baseline surveys tell us which species are returning, how waste streams actually move through a settlement, and where resilience investments would matter most.",
      "In Kyaka II Refugee Settlement and its host communities, research is designed with local participation from the start — residents help define the questions and collect the data, which makes the findings both more accurate and more usable.",
      "Findings feed directly into programme design and into policy conversations with local government and development partners.",
    ],
  },
  {
    slug: "youth-innovation-green-skills",
    title: "Boot camps, hackathons and the business of green skills",
    tag: "Innovation",
    date: "2025-11-27",
    excerpt:
      "How innovation boot camps and mentorship equip young people with practical solutions in climate action, waste management and green entrepreneurship.",
    body: [
      "Young Ugandans are not short of ideas for climate action. What they lack is a structured route from idea to a working, funded venture.",
      "Our innovation boot camps and hackathons compress that route: a problem brief drawn from real community needs, a few intense days of prototyping, and then months of mentorship for the teams that show promise.",
      "Waste management and circular-economy ventures dominate the pipeline, followed by clean energy and climate-smart agriculture tools. We deliberately prioritise teams led by women, youth and persons with disabilities.",
      "Green skills training runs alongside, so participants leave with capabilities that are employable whether or not their own venture takes off.",
    ],
  },
  {
    slug: "kcfs-lab-climate-finance",
    title: "Opening up climate finance through the KCFS Lab",
    tag: "Climate Finance",
    date: "2025-09-09",
    excerpt:
      "Establishing the Kyambogo University Climate Finance Solutions Lab to strengthen climate finance knowledge, research and access.",
    body: [
      "Climate finance exists, but the pathways to it are opaque for the youth groups, local governments and community organisations who most need it.",
      "The Kyambogo University Climate Finance Solutions Lab (KCFS Lab), which we are leading the establishment of from 2025, is designed to close that gap — combining research, training and hands-on proposal support.",
      "The Lab brings together university researchers, local government planners and community organisations so that finance literacy is built where projects are actually designed.",
      "Over time we expect the Lab to function as a standing resource for the region: a place to test proposal ideas, understand donor and fund requirements, and build the evidence a serious application needs.",
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
