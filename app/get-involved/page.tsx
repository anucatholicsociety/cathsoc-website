import type { Metadata } from "next";
import { site } from "@/lib/data";
import { assetPath } from "@/lib/paths";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Get Involved — Membership & Community",
  description: "Ways into the ANU Catholic Society at every level of commitment: attend once, join something regular, help occasionally, or take responsibility.",
};

const levels = [
  {
    heading: "Attend once",
    blurb: "Zero commitment. Just show up.",
    items: ["Friday Mass and pizza", "A coffee catch-up", "A public lecture or talk", "Any social event"],
    cta: { label: "See what's on", href: "/events/" },
  },
  {
    heading: "Join something regular",
    blurb: "A weekly rhythm and familiar faces.",
    items: ["Weekly Mass, adoration and confession", "Women's group", "Bible study and formation evenings", "Coffee catch-ups"],
    cta: { label: "Weekly schedule", href: "/events/#weekly" },
  },
  {
    heading: "Help occasionally",
    blurb: "Give an hour when it suits.",
    items: ["Event setup and cooking", "Welcoming newcomers at the door", "Photography and social media", "Volunteering with Caritas and Vinnies"],
    cta: { label: "Offer a hand", href: "/contact/" },
  },
  {
    heading: "Take responsibility",
    blurb: "Shape the Society's future.",
    items: ["Run an event or a study group", "Join a subcommittee", "Stand for the executive at the AGM"],
    cta: { label: "Talk to the exec", href: "/contact/" },
  },
];

export default function GetInvolved() {
  return (
    <>
      <Section eyebrow="Get Involved" title="Come at whatever pace suits you" h1>
        <p className="mt-5 max-w-prose text-lg leading-relaxed">
          Involvement is a ladder you can stand on any rung of — and staying on the first rung forever is completely
          fine.
        </p>
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg sm:grid-cols-2 lg:grid-cols-4" style={{ background: "var(--rule)" }}>
          {levels.map((l, i) => (
            <div key={l.heading} className="flex flex-col p-6" style={{ background: "var(--bg)" }}>
              <span className="eyebrow !text-[0.62rem]">Step {i + 1}</span>
              <h2 className="mt-2 font-display text-2xl font-semibold">{l.heading}</h2>
              <p className="mt-1 text-sm italic" style={{ color: "var(--fg-soft)" }}>{l.blurb}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm leading-relaxed">
                {l.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span aria-hidden="true" className="mt-1 text-gold">✦</span>
                    {it}
                  </li>
                ))}
              </ul>
              <a href={assetPath(l.cta.href)} className="mt-5 text-sm font-semibold underline decoration-gold underline-offset-4">
                {l.cta.label} →
              </a>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Membership" title="Become a member" panel>
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-2">
          <div className="prose-block max-w-prose leading-relaxed text-ivory/90">
            <p>
              Attendance never requires membership — but formal membership supports the Society, gives you a vote at
              the AGM, and unlocks member perks through the Rubric platform. Signing up takes about two minutes.
            </p>
            <p>
              For everything else — our mailing list, group chats, and all our links in one place — the Linktree is the
              front door.
            </p>
            <div className="!mt-6 flex flex-wrap gap-4">
              <a href={site.links.membership} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                {site.links.membershipLabel}
              </a>
              <a href={site.links.linktree} target="_blank" rel="noopener noreferrer" className="btn border border-ivory text-ivory hover:bg-ivory hover:text-navy">
                All our links
              </a>
            </div>
          </div>
          <figure>
            <img src={assetPath("/images/photos/feast-john-xxiii.jpg")} alt="A large group of Society members with Fr Laurie Foote OP at John XXIII College" className="rounded-lg" loading="lazy" />
            <figcaption className="mt-2 text-sm text-ivory/70">The Society at the Feast of Pope St John XXIII</figcaption>
          </figure>
        </div>
      </Section>
    </>
  );
}
