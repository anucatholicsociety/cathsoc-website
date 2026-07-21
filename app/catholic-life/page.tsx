import type { Metadata } from "next";
import { schedule, site } from "@/lib/data";
import { assetPath } from "@/lib/paths";
import { fmtTime, DAY_ORDER } from "@/lib/schedule";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Catholic Life at ANU — Mass, Confession & Adoration",
  description: "Weekly Mass, confession, Eucharistic adoration and prayer on the ANU campus, plus pathways to explore or return to the Catholic faith.",
};

const liturgical = ["mass", "confession", "adoration", "prayer"];

export default function CatholicLife() {
  const weekly = [...schedule.weekly].sort(
    (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day) || a.start.localeCompare(b.start)
  );

  return (
    <>
      <Section eyebrow="Catholic Life" title="Mass and the sacraments at ANU" h1>
        <p className="mt-5 max-w-prose text-lg leading-relaxed">
          The sacramental life is the heart of everything the Society does. Everything below happens on campus at the{" "}
          <strong>{site.primaryLocation.name}</strong>, {site.primaryLocation.address}, during teaching weeks.
        </p>

        {/* Weekly liturgical schedule, echoing the Society's ruled poster tables */}
        <div className="mt-10 max-w-3xl">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Weekly liturgical schedule on the ANU campus</caption>
            <thead>
              <tr className="text-xs font-semibold uppercase tracking-caps" style={{ color: "var(--accent-strong)" }}>
                <th scope="col" className="py-2 pr-4">Liturgy</th>
                <th scope="col" className="py-2 pr-4">Day</th>
                <th scope="col" className="py-2 pr-4">Time</th>
                <th scope="col" className="py-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {weekly.filter((w) => liturgical.includes(w.category)).map((w) => (
                <tr key={w.id} className="ruled-row align-top">
                  <th scope="row" className="py-3 pr-4 font-display text-lg font-semibold">{w.title}</th>
                  <td className="py-3 pr-4">{w.day}</td>
                  <td className="py-3 pr-4 whitespace-nowrap">{fmtTime(w.start)}–{fmtTime(w.end)}</td>
                  <td className="py-3 text-sm" style={{ color: "var(--fg-soft)" }}>{w.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-sm" style={{ color: "var(--fg-soft)" }}>
            {schedule.semesterNote} Schedule maintained by the {schedule.verifiedBy}; last verified {schedule.lastVerified}.
          </p>
          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            <a href={assetPath("/calendar/mass-and-liturgy.ics")} className="underline decoration-gold underline-offset-4">Subscribe: Mass & liturgy calendar (.ics)</a>
            <a href={assetPath("/find-mass/")} className="underline decoration-gold underline-offset-4">Sunday Mass near ANU →</a>
          </p>
        </div>
      </Section>

      <Section eyebrow="The Sacrament of Reconciliation" title="Confession" id="confession" className="!pt-0">
        <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">
          <div className="prose-block max-w-prose leading-relaxed">
            <p>
              Confession is available <strong>every Friday from 4:30 pm</strong> before Mass, in the chapel — or at any
              time by asking the chaplain. If it has been years, say exactly that; the priest will walk you through it
              gladly. There is no queueing system and no judgement, only mercy.
            </p>
            <p>
              Unsure what to do or say? Our chaplain would genuinely rather you come unprepared than not come.{" "}
              <a href={assetPath("/contact/")} className="font-semibold underline decoration-gold underline-offset-4">Ask us anything privately</a>.
            </p>
          </div>
          <div className="prose-block max-w-prose leading-relaxed">
            <h3 className="font-display text-2xl font-semibold">Eucharistic Adoration</h3>
            <p className="mt-3">
              The Blessed Sacrament is exposed on Fridays from 4:30 pm alongside confessions. Come for five quiet
              minutes between classes or stay the whole hour — many members call it the stillest point of their week.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Formation" title="Faith seeking understanding" panel>
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="prose-block max-w-prose leading-relaxed text-ivory/90">
            <p>
              True to our Dominican roots, the Society treats the intellectual life as part of the spiritual life. Each
              year brings formation evenings with Dominican friars, guest lectures — recently the Hon Justice Steward AC
              of the High Court on jurisprudence and theology — Bible studies, and retreats on the thought of St Thomas
              Aquinas.
            </p>
            <p>
              Recordings, reading suggestions and upcoming talks are shared on our channels; no background knowledge is
              ever assumed.
            </p>
            <p className="!mt-5 text-sm font-semibold">
              <a href={assetPath("/events/")} className="text-gold-bright underline underline-offset-4">See upcoming talks →</a>
            </p>
          </div>
          <figure className="justify-self-center">
            <img src={assetPath("/images/photos/jurisprudence-lecture.jpg")} alt="A packed lecture theatre at the ANU Law School during the Jurisprudence and Theology lecture" className="rounded-lg" loading="lazy" />
            <figcaption className="mt-2 text-sm text-ivory/70">Jurisprudence & Theology with Justice Steward AC, 2026</figcaption>
          </figure>
        </div>
      </Section>

      <Section eyebrow="Exploring" title="Becoming Catholic" id="become-catholic">
        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div className="prose-block max-w-prose leading-relaxed">
            <p>
              Adults become Catholic through <strong>OCIA</strong> — the Order of Christian Initiation of Adults — a
              gentle, unhurried journey of learning and discernment run with the local parish. It typically spans an
              academic year, meeting weekly, and leads (if and when you choose) to baptism or reception into the
              Church, Confirmation and First Communion.
            </p>
            <p>
              You can enquire at any time of year, and enquiring commits you to nothing. Ten catechumens are currently
              preparing through the Society — you would not be walking alone.
            </p>
            <p className="!mt-5 text-sm font-semibold">
              <a href={assetPath("/contact/")} className="underline decoration-gold underline-offset-4">Start a confidential conversation →</a>
            </p>
          </div>
          <div id="returning" className="prose-block max-w-prose leading-relaxed">
            <h3 className="font-display text-2xl font-semibold">Returning to the faith</h3>
            <p className="mt-3">
              Baptised long ago, drifted at some point, unsure how to begin again? The door is simply open. Come to
              Friday Mass and sit anywhere; go to confession when you are ready, not before; or ask to meet the
              chaplain for a coffee first. Nobody will ask where you have been.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
