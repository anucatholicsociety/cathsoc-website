/**
 * PREBUILD - regenerates everything computable from the data files, so
 * derived artifacts can never drift out of sync with the content:
 *
 *   public/calendar/anucathsoc.ics          full Society calendar (subscribe)
 *   public/calendar/mass-and-liturgy.ics    Mass/confession/adoration only
 *   public/calendar/events/<id>.ics         one file per special event
 *   public/downloads/finding-mass-in-canberra.pdf   printable poster from churches.json
 *   public/sitemap.xml, public/robots.txt   from the route list below
 *   public/CNAME                            only when building for the custom domain
 *
 * Runs automatically before `npm run dev` and `npm run build`.
 * Configuration comes from the same env vars as the site itself:
 *   NEXT_PUBLIC_BASE_PATH   (default "")
 *   NEXT_PUBLIC_SITE_ORIGIN (default "https://anucatholicsociety.com")
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (f) => JSON.parse(fs.readFileSync(path.join(root, "data", f), "utf8"));

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://anucatholicsociety.com").replace(/\/$/, "");
const abs = (p) => `${SITE_ORIGIN}${BASE_PATH}${p.startsWith("/") ? p : `/${p}`}`;

const site = read("site.json");
const schedule = read("schedule.json");
const events = read("events.json");
const churches = read("churches.json");

const calDir = path.join(root, "public", "calendar");
const evDir = path.join(calDir, "events");
fs.mkdirSync(evDir, { recursive: true });
fs.mkdirSync(path.join(root, "public", "downloads"), { recursive: true });

/* ---------------------------------------------------------------- ICS ---- */
const DAY_TO_ICAL = { Monday: "MO", Tuesday: "TU", Wednesday: "WE", Thursday: "TH", Friday: "FR", Saturday: "SA", Sunday: "SU" };
const DAY_TO_NUM = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
const esc = (s = "") => String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
const fold = (line) => {
  // RFC 5545 says lines must stay under 75 octets; fold with CRLF + space.
  const out = [];
  let l = line;
  while (l.length > 73) { out.push(l.slice(0, 73)); l = " " + l.slice(73); }
  out.push(l);
  return out.join("\r\n");
};
const dtLocal = (dateStr, timeStr) => `${dateStr.replace(/-/g, "")}T${timeStr.replace(":", "")}00`;

// Next occurrence of a weekday from today, formatted YYYY-MM-DD (Canberra-agnostic:
// recurring events carry TZID=Australia/Sydney so clients render correctly).
function nextDateFor(dayName) {
  const now = new Date();
  const target = DAY_TO_NUM[dayName];
  const diff = (target - now.getDay() + 7) % 7;
  const d = new Date(now.getTime() + diff * 86400000);
  return d.toISOString().slice(0, 10);
}

const TZBLOCK = [
  "BEGIN:VTIMEZONE",
  "TZID:Australia/Sydney",
  "BEGIN:STANDARD",
  "DTSTART:19700405T030000",
  "RRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU",
  "TZOFFSETFROM:+1100",
  "TZOFFSETTO:+1000",
  "TZNAME:AEST",
  "END:STANDARD",
  "BEGIN:DAYLIGHT",
  "DTSTART:19701004T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU",
  "TZOFFSETFROM:+1000",
  "TZOFFSETTO:+1100",
  "TZNAME:AEDT",
  "END:DAYLIGHT",
  "END:VTIMEZONE",
];

function vevent({ uid, title, description, location, dtstart, dtend, rrule, url }) {
  const lines = [
    "BEGIN:VEVENT",
    `UID:${uid}@anucatholicsociety.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    `DTSTART;TZID=Australia/Sydney:${dtstart}`,
    `DTEND;TZID=Australia/Sydney:${dtend}`,
    rrule ? `RRULE:${rrule}` : null,
    `SUMMARY:${esc(title)}`,
    description ? `DESCRIPTION:${esc(description)}` : null,
    location ? `LOCATION:${esc(location)}` : null,
    url ? `URL:${url}` : null,
    "END:VEVENT",
  ].filter(Boolean);
  return lines.map(fold).join("\r\n");
}

function calendar(name, veventBlocks) {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ANU Catholic Society//Website//EN",
    fold(`X-WR-CALNAME:${esc(name)}`),
    "X-WR-TIMEZONE:Australia/Sydney",
    ...TZBLOCK,
    ...veventBlocks,
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

const weeklyEvents = schedule.weekly.map((w) => {
  const d = nextDateFor(w.day);
  return {
    entry: w,
    block: vevent({
      uid: `weekly-${w.id}`,
      title: w.title,
      description: w.description,
      location: w.location,
      dtstart: dtLocal(d, w.start),
      dtend: dtLocal(d, w.end),
      rrule: `FREQ=WEEKLY;BYDAY=${DAY_TO_ICAL[w.day]}`,
      url: abs("/events/"),
    }),
  };
});

const specialEvents = (events.upcoming || []).map((e) => ({
  entry: e,
  block: vevent({
    uid: `event-${e.id}`,
    title: e.title,
    description: e.description,
    location: e.location,
    dtstart: dtLocal(e.date, e.start),
    dtend: dtLocal(e.date, e.end || e.start),
    url: abs("/events/"),
  }),
}));

fs.writeFileSync(
  path.join(calDir, "anucathsoc.ics"),
  calendar("ANU Catholic Society", [...weeklyEvents.map((w) => w.block), ...specialEvents.map((s) => s.block)])
);
fs.writeFileSync(
  path.join(calDir, "mass-and-liturgy.ics"),
  calendar("Mass & Liturgy at ANU", weeklyEvents.filter((w) => w.entry.liturgy).map((w) => w.block))
);
for (const s of specialEvents) {
  fs.writeFileSync(path.join(evDir, `${s.entry.id}.ics`), calendar(s.entry.title, [s.block]));
}
console.log(`[prebuild] wrote ${2 + specialEvents.length} calendar file(s)`);

/* --------------------------------------------------- POSTER PDF ----------- */
const NAVY = "#2E2D41";
const GOLD = "#A9852F";
const INK = "#26242E";

const doc = new PDFDocument({ size: "A4", margins: { top: 42, bottom: 36, left: 42, right: 42 } });
doc.pipe(fs.createWriteStream(path.join(root, "public", "downloads", "finding-mass-in-canberra.pdf")));

doc.font("Times-Roman").fillColor(NAVY).fontSize(9).text("A N U   C A T H O L I C   S O C I E T Y", { align: "center", characterSpacing: 2 });
doc.moveDown(0.3);
doc.font("Times-Bold").fontSize(24).text("Finding Mass in Canberra", { align: "center" });
doc.font("Times-Italic").fillColor(GOLD).fontSize(11).text("from ANU campus", { align: "center" });
doc.moveDown(0.5);

const pageW = doc.page.width - 84;
for (const c of churches.churches) {
  const startY = doc.y;
  if (startY > doc.page.height - 110) doc.addPage();
  doc.moveTo(42, doc.y).lineTo(42 + pageW, doc.y).lineWidth(0.7).strokeColor(GOLD).stroke();
  doc.moveDown(0.35);
  doc.font("Times-Bold").fillColor(NAVY).fontSize(12).text(`${c.name} - ${c.suburb}`, { continued: false });
  doc.font("Helvetica").fillColor(INK).fontSize(8.2).text(c.address);

  const bits = [];
  const m = c.mass || {};
  if (m.sunday?.length) bits.push(`Sunday: ${m.sunday.join(", ")}`);
  if (m.saturdayVigil?.length) bits.push(`Vigil: Sat ${m.saturdayVigil.join(", ")}`);
  if (m.weekday?.length) bits.push(`Weekday: ${m.weekday.join("; ")}`);
  if (bits.length) doc.font("Helvetica-Bold").fontSize(8.6).text(`Mass  `, { continued: true }).font("Helvetica").text(bits.join("   |   "));
  if (c.confession?.length) doc.font("Helvetica-Bold").fontSize(8.6).text(`Confession  `, { continued: true }).font("Helvetica").text(c.confession.join("; "));
  if (c.adoration?.times?.length) {
    const access = { public: "open access", keyed: "keyed access", "on-request": "on request" }[c.adoration.access] || "";
    doc.font("Helvetica-Bold").fontSize(8.6).text(`Adoration  `, { continued: true }).font("Helvetica").text(`${c.adoration.times.join("; ")}${access ? ` (${access})` : ""}`);
  }
  const contact = [c.phone, c.website].filter(Boolean).join("   ");
  if (contact) doc.font("Helvetica").fillColor("#4B4956").fontSize(7.8).text(contact);
  doc.fillColor(INK).moveDown(0.35);
}

doc.moveDown(0.3);
doc.font("Helvetica-Oblique").fillColor("#4B4956").fontSize(7.6)
  .text(`${churches.notice}  Full details, an interactive map and directions: ${abs("/find-mass/")}   |   ${site.links.instagramHandle}`, { align: "center" });
doc.end();
console.log("[prebuild] wrote finding-mass-in-canberra.pdf");

/* ------------------------------------------------ SITEMAP + ROBOTS -------- */
const routes = ["/", "/catholic-life/", "/find-mass/", "/events/", "/new-here/", "/get-involved/", "/about/", "/executive/", "/gallery/", "/downloads/", "/contact/"];
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(root, "public", "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    routes.map((r) => `  <url><loc>${abs(r)}</loc><lastmod>${today}</lastmod></url>`).join("\n") +
    `\n</urlset>\n`
);
fs.writeFileSync(path.join(root, "public", "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${abs("/sitemap.xml")}\n`);
console.log("[prebuild] wrote sitemap.xml + robots.txt");

/* ------------------------------------------------------- CNAME ------------ */
// Only emit CNAME when building for the root custom domain; a CNAME file in a
// sub-path preview deployment would hijack the whole github.io site.
const cname = path.join(root, "public", "CNAME");
if (!BASE_PATH && SITE_ORIGIN === "https://anucatholicsociety.com") {
  fs.writeFileSync(cname, "anucatholicsociety.com\n");
  console.log("[prebuild] wrote CNAME for anucatholicsociety.com");
} else if (fs.existsSync(cname)) {
  fs.unlinkSync(cname);
  console.log("[prebuild] removed CNAME (non-root build)");
}

/* -------------------------------------------- MISSING-ASSET WARNINGS ------ */
const downloads = read("downloads.json");
for (const item of downloads.items) {
  const f = path.join(root, "public", "downloads", item.file);
  if (!item.generated && !fs.existsSync(f)) {
    console.warn(`[prebuild] note: "${item.title}" references public/downloads/${item.file}, which is not present yet - the page will show it as coming soon.`);
  }
}
console.log("[prebuild] done");
