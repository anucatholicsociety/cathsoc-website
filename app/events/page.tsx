import type { Metadata } from "next";
import { schedule, events, site, gallery } from "@/lib/data";
import { assetPath } from "@/lib/paths";
import { fmtTime, DAY_ORDER, upcomingOnly } from "@/lib/schedule";
import { Section } from "@/components/Section";
import EventCard from "@/components/EventCard";

export const metadata: Metadata = {
  title: "Events — Weekly Schedule & What's On",
  description: "The ANU Catholic Society weekly schedule and upcoming special events: Mass, socials, formation, lectures and retreats. Subscribe to our calendar.",
};

const CATEGORY_LABEL: Record<string, string> = {
  mass: "Liturgy", confession: "Liturgy", adoration: "Liturgy", prayer: "Prayer",
  study: "Study", social: "Social", formation: "Formation",
};

export default function EventsPage() {
  const weekly = [...schedule.weekly].sort(
    (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day) || a.start.localeCompare(b.start)
  );
  const upcoming = upcomingOnly(events.upcoming);

  return (
    <>
      <Section eyebrow="What's On" title="Upcoming events" h1>
        <div className="mt-10 space-y-6">
          {upcoming.length > 0 ? (
            upcoming.map((e) => <EventCard key={e.id} event={e} />)
          ) : (
            <div className="rounded-lg border p-8" style={{ borderColor: "var(--rule)" }}>
              <p className="max-w-prose leading-relaxed">
                No special events are on the calendar right now — most likely we are between semesters. The weekly
                schedule below continues through teaching weeks, and new events are announced first on{" "}
                <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-gold underline-offset-4">Instagram</a>.
              </p>
            </div>
          )}
        </div>
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          <a href={assetPath("/calendar/anucathsoc.ics")} className="underline decoration-gold underline-offset-4">Subscribe to everything (.ics)</a>
          <a href={assetPath("/calendar/mass-and-liturgy.ics")} className="underline decoration-gold underline-offset-4">Mass & liturgy only (.ics)</a>
        </p>
        <p className="mt-2 max-w-prose text-sm" style={{ color: "var(--fg-soft)" }}>
          In Google Calendar: Settings → Add calendar → From URL, then paste the link address of either file above.
          Apple and Outlook accept the same links.
        </p>
      </Section>

      <Section eyebrow="Every Week" title="The weekly schedule" id="weekly" panel>
        <div className="mt-8 max-w-3xl">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Weekly recurring events during teaching weeks</caption>
            <thead>
              <tr className="text-xs font-semibold uppercase tracking-caps text-gold-bright">
                <th scope="col" className="py-2 pr-4">Event</th>
                <th scope="col" className="py-2 pr-4">Day</th>
                <th scope="col" className="py-2 pr-4">Time</th>
                <th scope="col" className="py-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {weekly.map((w) => (
                <tr key={w.id} className="border-t border-white/20 align-top">
                  <th scope="row" className="py-3 pr-4">
                    <span className="font-display text-lg font-semibold">{w.title}</span>
                    <span className="block max-w-md text-sm font-normal text-ivory/70">{w.description}</span>
                    <span className="block text-sm text-ivory/70">{w.location}</span>
                  </th>
                  <td className="py-3 pr-4">{w.day}</td>
                  <td className="py-3 pr-4 whitespace-nowrap">{w.timeNote || `${fmtTime(w.start)}–${fmtTime(w.end)}`}</td>
                  <td className="py-3 text-sm text-gold-bright">{CATEGORY_LABEL[w.category] ?? w.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-sm text-ivory/70">
            {schedule.semesterNote} Last verified {schedule.lastVerified}.
          </p>
        </div>
      </Section>

      <Section eyebrow="Looking Back" title="Recent highlights">
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {gallery.highlights.map((h) => (
            <article key={h.title}>
              <img src={assetPath(`/images/photos/${h.file}`)} alt={h.alt} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
              <h3 className="mt-3 font-display text-xl font-semibold">{h.title}</h3>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>{h.blurb}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm font-semibold">
          <a href={assetPath("/gallery/")} className="underline decoration-gold underline-offset-4">More in the gallery →</a>
        </p>
      </Section>
    </>
  );
}
