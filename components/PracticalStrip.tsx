"use client";

import { useEffect, useState } from "react";
import { schedule, events } from "@/lib/data";
import { fmtTime, fmtDate, nextOccurrence, relativeDay, upcomingOnly } from "@/lib/schedule";
import { assetPath } from "@/lib/paths";

/**
 * The scannable "what's next" strip under the hero: next Mass, next
 * confession, next Society event - computed from the data files against the
 * visitor's clock. Renders a static fallback first so nothing shifts.
 */
export default function PracticalStrip() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  const nextOf = (category: string) => {
    const candidates = schedule.weekly.filter((w) => w.category === category);
    if (!candidates.length || !now) return null;
    return candidates
      .map((w) => ({ w, d: nextOccurrence(w, now) }))
      .sort((a, b) => a.d.getTime() - b.d.getTime())[0];
  };

  const mass = nextOf("mass");
  const confession = nextOf("confession");
  const special = now ? upcomingOnly(events.upcoming, now)[0] : null;

  const cells: { label: string; primary: string; secondary: string; href: string }[] = [
    {
      label: "Next Mass",
      primary: mass ? `${relativeDay(mass.w, now!)}, ${fmtTime(mass.w.start)}` : `Friday, ${fmtTime("17:30")}`,
      secondary: "St John the Evangelist Chapel",
      href: "/catholic-life/",
    },
    {
      label: "Next Confession",
      primary: confession ? `${relativeDay(confession.w, now!)}, ${fmtTime(confession.w.start)}` : `Friday, ${fmtTime("16:30")}`,
      secondary: "Before Mass, in the chapel",
      href: "/catholic-life/#confession",
    },
    {
      label: "Next Society Event",
      primary: special ? special.title : "See the weekly schedule",
      secondary: special ? `${fmtDate(special.date)}, ${fmtTime(special.start)}` : "Every week during semester",
      href: "/events/",
    },
    {
      label: "This Week",
      primary: "Full schedule",
      secondary: "Everything on this week →",
      href: "/events/#weekly",
    },
  ];

  return (
    <div className="border-y" style={{ borderColor: "var(--rule)", background: "var(--bg-soft)" }}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4" style={{ borderColor: "var(--rule)" }}>
        {cells.map((c) => (
          <a key={c.label} href={assetPath(c.href)} className="group px-5 py-4 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]" style={{ borderColor: "var(--rule)" }}>
            <span className="eyebrow !text-[0.62rem]">{c.label}</span>
            <span className="mt-1 block font-display text-lg font-semibold leading-snug">{c.primary}</span>
            <span className="block text-sm" style={{ color: "var(--fg-soft)" }}>
              {c.secondary}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
