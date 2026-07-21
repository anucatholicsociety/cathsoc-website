/**
 * Small pure helpers for schedule display. All "next occurrence" logic is
 * client-side (the site is static), computed against the visitor's clock.
 */
import type { WeeklyEntry, SpecialEvent } from "./data";

export const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DAY_NUM: Record<string, number> = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };

export function fmtTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const am = h < 12;
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}${m ? `:${String(m).padStart(2, "0")}` : ""} ${am ? "am" : "pm"}`;
}

export function fmtDate(d: string): string {
  return new Date(`${d}T12:00:00`).toLocaleDateString("en-AU", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

/** Next Date a weekly entry occurs, from `now`. */
export function nextOccurrence(entry: WeeklyEntry, now = new Date()): Date {
  const [h, m] = entry.end.split(":").map(Number);
  let diff = (DAY_NUM[entry.day] - now.getDay() + 7) % 7;
  if (diff === 0) {
    const endToday = new Date(now); endToday.setHours(h, m, 0, 0);
    if (now > endToday) diff = 7;
  }
  const d = new Date(now); d.setDate(now.getDate() + diff);
  return d;
}

export function upcomingOnly(list: SpecialEvent[], now = new Date()): SpecialEvent[] {
  const today = new Date(now); today.setHours(0, 0, 0, 0);
  return list
    .filter((e) => new Date(`${e.date}T23:59:59`) >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function relativeDay(entry: WeeklyEntry, now = new Date()): string {
  const next = nextOccurrence(entry, now);
  const days = Math.round((new Date(next.toDateString()).getTime() - new Date(now.toDateString()).getTime()) / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return entry.day;
}
