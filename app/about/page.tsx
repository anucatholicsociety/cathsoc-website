import type { Metadata } from "next";
import { about, site } from "@/lib/data";
import { assetPath } from "@/lib/paths";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "About — Mission, History, Patron & Motto",
  description: "The mission and history of the ANU Catholic Society, our Dominican roots, our patron Pope St John XXIII, and our motto Fides et Ratio.",
};

export default function About() {
  return (
    <>
      <Section eyebrow="Our Mission" title="The home of Catholic students on campus" h1>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="prose-block max-w-prose text-[1.05rem] leading-relaxed">
            {about.mission.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
          </div>
          <figure className="self-start justify-self-center">
            <div className="arch max-w-sm border-4 border-gold/40">
              <img src={assetPath("/images/photos/chapel-dusk.jpg")} alt="The chapel roofline and cross at dusk with Telstra Tower behind" loading="lazy" />
            </div>
            <figcaption className="mt-3 text-center text-sm" style={{ color: "var(--fg-soft)" }}>
              St John the Evangelist Chapel at dusk
            </figcaption>
          </figure>
        </div>
        <dl className="mt-14 grid grid-cols-2 gap-8 border-t pt-8 lg:grid-cols-4" style={{ borderColor: "var(--rule)" }}>
          {about.byTheNumbers.map((n) => (
            <div key={n.label}>
              <dd className="font-display text-5xl font-semibold" style={{ color: "var(--accent-strong)" }}>{n.value}</dd>
              <dt className="mt-1 text-sm leading-snug" style={{ color: "var(--fg-soft)" }}>{n.label}</dt>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="Patron & Motto" title="Pope St John XXIII · Fides et Ratio" panel>
        <div className="prose-block mt-8 max-w-prose leading-relaxed text-ivory/90">
          {about.patron.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
        </div>
      </Section>

      <Section eyebrow="Our History" title="Deep roots beside the university">
        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div className="prose-block max-w-prose leading-relaxed">
            {about.history.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
          </div>
          <aside className="self-start rounded-lg border-l-4 border-gold p-6" style={{ background: "var(--bg-soft)" }}>
            <h3 className="font-display text-xl font-semibold">Help us complete the record</h3>
            <div className="prose-block mt-3 text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
              {about.historyGaps.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
              {site.links.johnsHistoryBook && (
                <p className="!mt-4">
                  <a href={site.links.johnsHistoryBook} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-gold underline-offset-4">
                    Read the John XXIII College history →
                  </a>
                </p>
              )}
            </div>
          </aside>
        </div>
      </Section>

      <Section eyebrow="People & Trust" title="Who does what">
        <div className="mt-8 grid max-w-4xl gap-8 sm:grid-cols-2">
          <div className="prose-block max-w-prose text-sm leading-relaxed">
            <p>
              The <strong>student executive</strong> runs the Society's events, communications and administration, and
              is elected each year at the AGM. The <strong>chaplain</strong> and visiting clergy celebrate the
              sacraments and provide pastoral care. Parish schedules belong to the <strong>parishes of the Archdiocese
              of Canberra and Goulburn</strong>; we link to them but do not control them.
            </p>
            <p className="!mt-4">{site.affiliations}</p>
          </div>
          <div className="text-sm">
            <ul className="space-y-2 font-semibold">
              <li><a href={assetPath("/executive/")} className="underline decoration-gold underline-offset-4">Meet the 2026 executive →</a></li>
              <li><a href={assetPath("/downloads/")} className="underline decoration-gold underline-offset-4">Annual report & documents →</a></li>
              <li><a href={assetPath("/contact/")} className="underline decoration-gold underline-offset-4">Contact the right person →</a></li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
