import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Leaf,
  ShieldCheck,
  Sprout,
  FlaskConical,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section, Eyebrow } from "@/components/page-shell";
import { useQuery } from "@tanstack/react-query";
import { postsQuery } from "@/lib/cms";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import director from "@/assets/director.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Environmental Hub Uganda | Climate & Conservation NGO" },
      {
        name: "description",
        content:
          "Environmental Hub Uganda (EHUG) is a youth-led NGO advancing climate resilience, conservation and restoration, environmental education and research across Uganda.",
      },
      { property: "og:title", content: "Environmental Hub Uganda | Climate & Conservation NGO" },
      {
        property: "og:description",
        content:
          "Community-centred conservation, climate-smart agriculture and youth-led environmental action for a sustainable Uganda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SLIDES = [
  {
    image: hero1,
    title: "Welcome to Environmental Hub Uganda",
    text: "A youth-led NGO promoting sustainability and resilience in Uganda through climate action, conservation, education and research. Join us in building a greener future where nature thrives and communities prosper.",
  },
  {
    image: hero2,
    title: "Community-Centred Conservation",
    text: "Conservation that puts community well-being first — engaging local people in sustainable practices that protect natural resources and biodiversity through collaborative partnerships.",
  },
  {
    image: hero3,
    title: "Climate-Smart Agriculture",
    text: "Innovative farming techniques that adapt to a changing climate, delivering greater resilience, food security and lower emissions for Ugandan households.",
  },
];

const ACTIVITIES = [
  {
    icon: ShieldCheck,
    title: "Climate Mitigation & Adaptation",
    text: "Climate-smart agricultural practices and disaster-resilient community strategies that help communities adapt to and mitigate climate change.",
  },
  {
    icon: Leaf,
    title: "Conservation & Restoration",
    text: "Tree-planting initiatives and ecosystem protection programmes that restore landscapes and strengthen community stewardship.",
  },
  {
    icon: Sprout,
    title: "Environmental Education",
    text: "Advocacy and awareness programmes empowering the next generation of change agents through schools, universities and community outreach.",
  },
  {
    icon: FlaskConical,
    title: "Research & Innovation",
    text: "A platform for dialogue, innovation and evidence-based environmental policy, supporting knowledge generation for climate action.",
  },
];

const PARTNERS = [
  "Kyambogo University",
  "Makerere University",
  "ARIEC",
  "KCFS Lab",
  "Gayaza Girls School",
  "Kyaka II Host Communities",
];

function Index() {
  const { data: posts = [] } = useQuery(postsQuery());
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero carousel */}
      <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
        <h1 className="sr-only">
          Environmental Hub Uganda — climate action, conservation and environmental research
        </h1>
        {SLIDES.map((s, i) => (
          <div
            key={s.title}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === slide ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== slide}
          >
            <img
              src={s.image}
              alt={s.title}
              width={1920}
              height={1080}
              loading={i === 0 ? "eager" : "lazy"}
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-[var(--brand-dark)]/65" />
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto max-w-3xl px-6 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-5xl">
                  {s.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
                  {s.text}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/about"
                    className="rounded-md bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
                  >
                    About us
                  </Link>
                  <Link
                    to="/get-involved"
                    className="rounded-md border border-primary-foreground/40 px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                  >
                    Get involved
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)}
          aria-label="Previous slide"
          className="absolute top-1/2 left-3 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background/20 text-primary-foreground hover:bg-background/35"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          onClick={() => setSlide((s) => (s + 1) % SLIDES.length)}
          aria-label="Next slide"
          className="absolute top-1/2 right-3 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background/20 text-primary-foreground hover:bg-background/35"
        >
          <ChevronRight className="size-6" />
        </button>
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setSlide(i)}
              className={`h-1.5 w-8 rounded-full transition-colors ${
                i === slide ? "bg-accent" : "bg-primary-foreground/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <Section>
        <Eyebrow>Who we are</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Youth-led action for a sustainable Uganda
        </h2>
        <p className="mt-5 max-w-4xl text-[15px] leading-relaxed text-muted-foreground">
          Environmental Hub Uganda (Bricks Environment and Climate Hub Initiative Uganda) empowers
          youth, women and communities to design and implement innovative, sustainable solutions to
          environmental challenges across Uganda.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border-l-4 border-primary bg-secondary p-7">
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="mt-2 text-muted-foreground">
              To promote community involvement in creating a sustainable environment for
              generations.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-accent bg-secondary p-7">
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <p className="mt-2 text-muted-foreground">
              Creating a sustainable environment for improved quality of life and socioeconomic
              transformation.
            </p>
          </div>
        </div>
      </Section>

      {/* Core activities */}
      <Section alt>
        <Eyebrow>What we do</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Core activities</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIVITIES.map((a) => (
            <article
              key={a.title}
              className="rounded-lg border border-border bg-card p-7 transition-shadow hover:shadow-lg"
            >
              <span className="grid size-11 place-items-center rounded-full bg-primary/10">
                <a.icon className="size-5 text-primary" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
            </article>
          ))}
        </div>
        <Link
          to="/our-work"
          className="mt-8 inline-block rounded-md bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
        >
          Explore our work
        </Link>
      </Section>

      {/* Director */}
      <Section>
        <Eyebrow>Message from the Director</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Green greetings, dear esteemed environmentalists
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-[360px_1fr]">
          <div>
            <img
              src={director}
              alt="Muhumure Rodrick, Team Lead of Environmental Hub Uganda"
              width={800}
              height={900}
              loading="lazy"
              className="w-full rounded-lg object-cover shadow-xl"
            />
            <p className="mt-4 font-semibold">MUHUMURE RODRICK</p>
            <p className="text-sm text-muted-foreground">Team Lead (Executive Director)</p>
          </div>
          <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Every stakeholder has a role to play in conserving the environment and in adapting to
              and mitigating climate change. It is with pride that we introduce our newest team
              player: the Bricks Environment and Climate Hub Initiative Uganda.
            </p>
            <p>
              Uganda still contends with deep poverty, unpredictable seasons, persistent pests,
              invasive species and slow-moving political will. Environmental Hub Uganda has renewed
              its commitment to these challenges by placing scientific research — both qualitative
              and quantitative — at the centre of conservation and climate action.
            </p>
            <p>
              Through joint initiatives with academia in East Africa and Europe, we work to provide
              timely, accurate information that supports rapid but sustainable development. At the
              Hub we back start-ups across the environmental sector, with particular attention to
              marginalised groups — persons with disabilities, and women- and youth-led ventures.
            </p>
            <Link
              to="/team"
              className="inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Meet the team and governance →
            </Link>
          </div>
        </div>
      </Section>

      {/* Latest from the blog */}
      <Section alt>
        <Eyebrow>Blog</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">From the field</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <article key={p.slug} className="flex flex-col rounded-lg border border-border bg-card p-7">
              <span className="text-xs font-semibold tracking-wide text-accent uppercase">
                {p.tag}
              </span>
              <h3 className="mt-2 text-lg font-semibold">
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-primary">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.excerpt}
              </p>
            </article>
          ))}
        </div>
        <Link
          to="/blog"
          className="mt-8 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Read all articles →
        </Link>
      </Section>

      {/* Partners */}
      <Section>
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Partners &amp; collaborators
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {PARTNERS.map((p) => (
            <div
              key={p}
              className="grid min-h-20 place-items-center rounded-md border border-border px-3 text-center text-xs font-semibold text-muted-foreground"
            >
              {p}
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-[var(--brand-dark)] py-16 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Join, partner or support the work</h2>
          <p className="mt-3 text-primary-foreground/80">
            Become a member, volunteer on a campaign, or partner with us on a programme.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/get-involved"
              className="rounded-md bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
            >
              Get involved
            </Link>
            <Link
              to="/contact"
              className="rounded-md border border-primary-foreground/40 px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
