import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageShell, Section, Eyebrow } from "@/components/page-shell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Environmental Hub Uganda" },
      {
        name: "description",
        content:
          "Get in touch with Environmental Hub Uganda in Kampala about partnerships, membership, volunteering or media enquiries.",
      },
      { property: "og:title", content: "Contact | Environmental Hub Uganda" },
      {
        property: "og:description",
        content: "Reach the Environmental Hub Uganda team in Kampala.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell
      title="Contact Us"
      lead="Partnerships, membership, volunteering or media — send us a message and the relevant team will respond."
    >
      <Section>
        <Eyebrow>Get in touch</Eyebrow>
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
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
      </Section>
    </PageShell>
  );
}
