import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Leaf,
  ShieldCheck,
  Sprout,
  Mountain,
  Users,
  FlaskConical,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
} from "lucide-react";

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
          "Environmental Hub Uganda is an NGO advancing climate change adaptation, disaster risk reduction, community conservation and eco-tourism across Uganda.",
      },
      { property: "og:title", content: "Environmental Hub Uganda | Climate & Conservation NGO" },
      {
        property: "og:description",
        content:
          "Community-centred conservation, climate-smart agriculture and disaster resilience for a sustainable Uganda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "FAQs", href: "#faqs" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const SLIDES = [
  {
    image: hero1,
    title: "Welcome to Ehub Uganda",
    text: "An NGO promoting sustainability and resilience in Uganda through climate change adaptation, disaster risk reduction and eco-tourism. Join us in building a greener future where nature thrives and communities prosper.",
  },
  {
    image: hero2,
    title: "Community-Centered Conservation",
    text: "Conservation that puts community well-being first — engaging local people in sustainable practices that protect natural resources and biodiversity through collaborative partnerships.",
  },
  {
    image: hero3,
    title: "Climate-Smart Agriculture",
    text: "Innovative farming techniques that adapt to a changing climate, delivering greater resilience, food security and lower emissions for Ugandan households.",
  },
];

const SERVICES = [
  {
    icon: Leaf,
    title: "Environmental Conservation",
    text: "Restoration of degraded landscapes, tree growing and biodiversity protection, delivered hand in hand with the communities who depend on them.",
  },
  {
    icon: ShieldCheck,
    title: "Disaster Risk Reduction",
    text: "Proactive measures that strengthen community resilience to natural hazards, combining local knowledge with technology for preparedness and response.",
  },
  {
    icon: Sprout,
    title: "Climate-Smart Agriculture",
    text: "Training and demonstration in adaptive, low-emission farming that raises yields while protecting soils, water and forests.",
  },
  {
    icon: Mountain,
    title: "Eco-Tourism",
    text: "Nature-based tourism that channels value back to custodian communities and makes conservation economically worthwhile.",
  },
  {
    icon: FlaskConical,
    title: "Research & Innovation",
    text: "Qualitative and quantitative research with academic partners in East Africa and Europe, generating timely and accurate environmental data.",
  },
  {
    icon: Users,
    title: "Green Start-up Support",
    text: "Mentorship and incubation for environmental start-ups, with a focus on women, youth and persons with disabilities.",
  },
];

const FAQS = [
  {
    q: "What does Environmental Hub Uganda do?",
    a: "We are a non-governmental organisation working across Uganda on environmental conservation, climate change adaptation and mitigation, disaster risk reduction, eco-tourism and environmental research.",
  },
  {
    q: "How can my community work with you?",
    a: "We partner with community groups, schools, local governments and cooperatives. Reach out through the contact section and our field team will discuss what a partnership could look like in your area.",
  },
  {
    q: "Do you support environmental start-ups?",
    a: "Yes. We support start-ups across environmental sectors, deliberately prioritising ventures led by women, youth and persons with disabilities.",
  },
  {
    q: "Can I volunteer or intern with the Hub?",
    a: "We run field and exchange programmes with training and mentorship components. Send us a message with your background and interests.",
  },
];

const POSTS = [
  {
    tag: "Conservation",
    title: "Why community custodianship outperforms fences",
    text: "Lessons from working with landowners around restored wetland margins and what it takes to keep restoration alive after year one.",
  },
  {
    tag: "Climate",
    title: "Reading Uganda's shifting seasons",
    text: "Unpredictable rains are reshaping planting calendars. How local weather data can be put to work on smallholder farms.",
  },
  {
    tag: "Research",
    title: "Building an African evidence base",
    text: "Notes on our joint research initiatives with East African and European academia, and why timely data matters for policy.",
  },
];

const PARTNERS = [
  "Kyambogo University",
  "ARIEC",
  "Ministry of Water & Environment",
  "NEMA",
  "Terra Initiative",
  "Bricks Climate Hub",
];

function Index() {
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 7000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || menuOpen
            ? "bg-[var(--brand-dark)]/95 backdrop-blur shadow-lg"
            : "bg-[var(--brand-dark)]/40"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <a href="#hero" className="flex items-center gap-2 text-primary-foreground">
            <span className="grid size-9 place-items-center rounded-full bg-primary">
              <Leaf className="size-5 text-primary-foreground" />
            </span>
            <span className="text-sm leading-tight font-semibold">
              Bricks Environment and Climate
              <br />
              <span className="text-accent">Hub Initiative</span>
            </span>
          </a>

          <nav className="ml-auto hidden items-center gap-6 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="text-sm font-medium text-primary-foreground/85 transition-colors hover:text-accent"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
            >
              Donate
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation"
            className="ml-auto text-primary-foreground lg:hidden"
          >
            {menuOpen ? <Menu className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-primary-foreground/10 px-4 pb-4 lg:hidden">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-sm font-medium text-primary-foreground/85 hover:text-accent"
              >
                {n.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Hero carousel */}
      <section id="hero" className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
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
                <h1 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-5xl">
                  {s.title}
                </h1>
                <p className="mt-5 text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
                  {s.text}
                </p>
                <a
                  href="#about"
                  className="mt-8 inline-block rounded-md bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
                >
                  Learn more
                </a>
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

      {/* About / Director */}
      <section id="about" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">About us</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Green greetings, dear esteemed environmentalists
          </h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              <img
                src={director}
                alt="Muhumure Rodrick, Director of Environmental Hub Uganda"
                width={800}
                height={900}
                loading="lazy"
                className="w-full rounded-lg object-cover shadow-xl"
              />
              <p className="mt-4 font-semibold">MUHUMURE RODRICK</p>
              <p className="text-sm text-muted-foreground">Director</p>
            </div>

            <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Every stakeholder has a role to play in conserving the environment and in adapting
                to and mitigating climate change. It is with pride that we introduce our newest team
                player: the Bricks Environment and Climate Hub Initiative Uganda.
              </p>
              <p>
                Uganda still contends with deep poverty, unpredictable seasons, persistent pests,
                invasive species and slow-moving political will. Environmental Hub Uganda has
                renewed its commitment to these challenges by placing scientific research — both
                qualitative and quantitative — at the centre of conservation and climate action.
              </p>
              <p>
                Too little, and too often the wrong information, is known about the African
                continent. Through joint initiatives with academia in East Africa and Europe, we
                work to provide timely, accurate information that supports rapid but sustainable
                development. The African Research Institute of Environment and Climate (ARIEC),
                hosted by the Department of Environmental Sciences at Kyambogo University,
                introduces multi-sector training and mentorship through field and exchange
                programmes while fostering gender equity and locally rooted innovation.
              </p>
              <p>
                At the Hub we back start-ups across the environmental sector, with particular
                attention to marginalised groups — persons with disabilities, and women- and
                youth-led ventures — and we stand at the frontline of adaptation and mitigation
                efforts.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
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
                Creating a sustainable environment for improved quality of life and socio-economic
                transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            What we do
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Our Services</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <article
                key={s.title}
                className="rounded-lg border border-border bg-card p-7 transition-shadow hover:shadow-lg"
              >
                <span className="grid size-11 place-items-center rounded-full bg-primary/10">
                  <s.icon className="size-5 text-primary" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">FAQs</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {FAQS.map((f, i) => (
              <div key={f.q}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left font-medium"
                >
                  {f.q}
                  <span className="text-primary">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Blog</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">From the field</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {POSTS.map((p) => (
              <article key={p.title} className="rounded-lg border border-border bg-card p-7">
                <span className="text-xs font-semibold tracking-wide text-accent uppercase">
                  {p.tag}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Our Partners</h2>
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
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            Get in touch
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Contact us</h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <ul className="space-y-5">
              <li className="flex gap-3">
                <MapPin className="size-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">Kampala, Uganda</span>
              </li>
              <li className="flex gap-3">
                <Mail className="size-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">info@envhub-ug.org</span>
              </li>
              <li className="flex gap-3">
                <Phone className="size-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">+256 700 000 000</span>
              </li>
            </ul>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                (e.currentTarget as HTMLFormElement).reset();
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="Your name"
                  className="w-full rounded-md border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary"
                />
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-md border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
              <input
                placeholder="Subject"
                className="w-full rounded-md border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary"
              />
              <textarea
                required
                rows={5}
                placeholder="Message"
                className="w-full rounded-md border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="rounded-md bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--brand-dark)] py-12 text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">Environmental Hub Uganda</h3>
            <p className="mt-3 text-sm text-primary-foreground/70">
              Bricks Environment and Climate Hub Initiative Uganda Ltd — working with communities
              for a sustainable environment.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Useful links</h4>
            <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a href={n.href} className="hover:text-accent">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Follow us</h4>
            <div className="mt-3 flex gap-3">
              {[
                { Icon: Twitter, href: "https://x.com/ehUganda", label: "X" },
                {
                  Icon: Instagram,
                  href: "https://instagram.com/environmental_hub_uganda",
                  label: "Instagram",
                },
                {
                  Icon: Linkedin,
                  href: "https://ug.linkedin.com/company/bricks-environment-and-climate-hub-initiative-uganda-ltd",
                  label: "LinkedIn",
                },
                {
                  Icon: Youtube,
                  href: "https://youtube.com/@Environmental_hub_Uganda",
                  label: "YouTube",
                },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid size-9 place-items-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl px-6 text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} Environmental Hub Uganda. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
