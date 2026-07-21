import type { Metadata } from "next";
import { faqs, site } from "@/lib/data";
import { assetPath } from "@/lib/paths";
import { Section } from "@/components/Section";
import Faq from "@/components/Faq";

export const metadata: Metadata = {
  title: "New Here? — Your First Visit",
  description: "Everything a first-time visitor needs: the easiest event to start with, what to expect at Mass, how to find us, and how to meet someone before you come.",
};

export default function NewHere() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Section eyebrow="New Here?" title="You are welcome to come exactly as you are" h1>
        <p className="mt-5 max-w-prose text-lg leading-relaxed">
          You do not need to know anyone, be a member, or already understand Catholicism. Most of us walked in for the
          first time not knowing a soul. This page answers the questions people are usually too polite to ask.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold">The easiest first event</h2>
            <p className="mt-3 max-w-prose leading-relaxed">
              <strong>Friday Mass and pizza.</strong> Mass at 5:30 pm in the St John the Evangelist Chapel
              (51 Daley Road, next to John XXIII College), about 45 minutes, then pizza in the courtyard. Arrive a few
              minutes early and sit anywhere; stay for one slice or the whole evening. No registration, no cost, no
              expectations.
            </p>
            <p className="mt-4 max-w-prose leading-relaxed">
              Prefer something without a liturgy first? Come to a <strong>coffee catch-up</strong> — order a drink,
              say you are new, and you are in.
            </p>
            <h2 className="mt-8 font-display text-2xl font-semibold">Meet someone before you come</h2>
            <p className="mt-3 max-w-prose leading-relaxed">
              If walking in alone is the hard part, tell us. Message{" "}
              <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-gold underline-offset-4">{site.links.instagramHandle}</a>{" "}
              or email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold underline decoration-gold underline-offset-4">{site.email}</a>{" "}
              and a committee member will meet you at the chapel door and sit with you.
            </p>
          </div>
          <figure className="self-start justify-self-center">
            <div className="arch max-w-sm border-4 border-gold/40">
              <img src={assetPath("/images/photos/chapel-courtyard.jpg")} alt="Students chatting at picnic tables in the chapel courtyard" loading="lazy" />
            </div>
            <figcaption className="mt-3 text-center text-sm" style={{ color: "var(--fg-soft)" }}>
              The chapel courtyard — where Friday evenings end up
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section eyebrow="What to Expect" title="Your first Mass, explained" id="what-to-expect" panel>
        <div className="mt-8 grid max-w-4xl gap-8 sm:grid-cols-2">
          {[
            ["Anyone may attend", "Mass is public worship — being present never requires being Catholic."],
            ["Where to sit", "Anywhere at all. There are no reserved seats and no 'regulars-only' pews."],
            ["Following along", "Stand and sit when others do, or don't — nobody is grading. Responses are printed or easy to pick up."],
            ["Communion", "Receiving Communion is for Catholics prepared to do so. Everyone else simply stays seated or comes forward with arms crossed for a blessing. Both are completely normal."],
            ["How long?", "About 45 minutes on Fridays."],
            ["What to wear", "Class clothes are fine. People arrive from lectures, labs and sport."],
          ].map(([t, d]) => (
            <div key={t} className="border-t border-white/25 pt-3">
              <h3 className="font-display text-xl font-semibold text-gold-bright">{t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ivory/85">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Questions" title="Frequently asked, honestly answered">
        <Faq />
        <p className="mt-8 max-w-prose text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
          Something we haven't covered?{" "}
          <a href={assetPath("/contact/")} className="font-semibold underline decoration-gold underline-offset-4">Ask privately</a> — questions go only to the appropriate person, never to a public channel.
        </p>
      </Section>
    </>
  );
}
