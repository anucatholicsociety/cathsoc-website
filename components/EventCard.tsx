import fs from "node:fs";
import path from "node:path";
import type { SpecialEvent } from "@/lib/data";
import { fmtDate, fmtTime } from "@/lib/schedule";
import { assetPath } from "@/lib/paths";

/** A special event, rendered server-side. Missing images degrade to a crest panel. */
export default function EventCard({ event }: { event: SpecialEvent }) {
  const imgFile = event.image ? path.join(process.cwd(), "public", "images", "photos", event.image) : null;
  const hasImage = imgFile ? fs.existsSync(imgFile) : false;
  const [y, m, d] = event.date.split("-");

  return (
    <article className="grid overflow-hidden rounded-lg border sm:grid-cols-[220px_1fr]" style={{ borderColor: "var(--rule)", background: "var(--bg)" }}>
      {hasImage ? (
        <img src={assetPath(`/images/photos/${event.image}`)} alt="" className="h-44 w-full object-cover sm:h-full" loading="lazy" />
      ) : (
        <div className="flex h-44 items-center justify-center bg-navy sm:h-full">
          <img src={assetPath("/images/brand/crest-seal-160.png")} alt="" width={72} height={72} className="opacity-80" />
        </div>
      )}
      <div className="flex gap-5 p-5">
        <div className="text-center" aria-hidden="true">
          <span className="block text-xs font-semibold uppercase tracking-caps" style={{ color: "var(--accent-strong)" }}>
            {new Date(`${event.date}T12:00:00`).toLocaleDateString("en-AU", { month: "short" })}
          </span>
          <span className="block font-display text-3xl font-semibold leading-none">{Number(d)}</span>
          <span className="block text-xs" style={{ color: "var(--fg-soft)" }}>{y}</span>
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold">{event.title}</h3>
          <p className="mt-0.5 text-sm font-semibold">
            {fmtDate(event.date)} · {fmtTime(event.start)}
            {event.end ? `–${fmtTime(event.end)}` : ""}
          </p>
          <p className="text-sm" style={{ color: "var(--fg-soft)" }}>
            {event.location} · {event.cost}
          </p>
          <p className="mt-2 max-w-prose text-sm leading-relaxed">{event.description}</p>
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
            <a href={assetPath(`/calendar/events/${event.id}.ics`)} className="underline decoration-gold underline-offset-4 hover:opacity-70">
              Add to calendar (.ics)
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
              target="_blank" rel="noopener noreferrer"
              className="underline decoration-gold underline-offset-4 hover:opacity-70"
            >
              Map
            </a>
            {event.registrationUrl && (
              <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-gold underline-offset-4 hover:opacity-70">
                Register
              </a>
            )}
          </p>
        </div>
      </div>
    </article>
  );
}
