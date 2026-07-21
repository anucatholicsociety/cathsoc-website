# ANU Catholic Society Website

The Society's website at **https://anucatholicsociety.com** — a fully static, data-driven site built with Next.js 14 and Tailwind CSS, hosted free on GitHub Pages, and designed so that **future committees can update everything by editing plain JSON files**, without touching component code.

> **The one rule:** all content lives in the `data/` folder. If you are updating times, events, people, churches, photos or links, you are editing a `.json` file — nothing else.

---

## Quick start for committee members (no coding needed)

1. Open the repository on github.com and navigate into the `data/` folder.
2. Click the file you want (see the map below), press the ✏️ pencil icon, edit, and **Commit changes** to `main`.
3. That's it. A GitHub Action builds and publishes the site automatically (≈2 minutes). Watch progress under the **Actions** tab.

Every data file begins with a `_readme` field explaining exactly what it controls and how to add an entry. Fields starting with `_` are notes for you and are ignored by the site.

### Which file do I edit?

| I want to change… | Edit |
|---|---|
| Weekly Mass/confession/adoration/social times | `data/schedule.json` |
| Add or remove a special event | `data/events.json` |
| Church locations, Mass times on the map & poster | `data/churches.json` |
| The executive (annual rollover) | `data/executive.json` |
| Photos and Instagram posts in the gallery | `data/gallery.json` |
| Downloadable files | `data/downloads.json` + drop the file in `public/downloads/` |
| FAQs on the New Here page | `data/faqs.json` |
| Mission/history/patron text, "by the numbers" | `data/about.json` |
| Emails, links (Linktree, Instagram, Rubric), addresses | `data/site.json` |
| Menu and footer links | `data/navigation.json` |
| A temporary site-wide banner (venue change, O-Week…) | `data/announcement.json` |

### Worked example: adding an event end to end

Open `data/events.json` and add a new object inside the `"upcoming"` list (a comma after the previous `}` matters!):

```json
{
  "id": "trivia-night-2026",
  "title": "Trivia Night",
  "date": "2026-08-21",
  "start": "19:00",
  "end": "21:30",
  "location": "John XXIII College common room",
  "category": "social",
  "cost": "Gold coin donation",
  "description": "Teams of six, prizes, and questions your Arts friends will finally be useful for.",
  "image": "pizza-fellowship.jpg",
  "registrationUrl": ""
}
```

Commit to `main`. Automatically, the event now:
- appears on the homepage and `/events/` (and **disappears by itself after 21 August** — no cleanup needed);
- gets its own calendar file at `/calendar/events/trivia-night-2026.ics`;
- joins the subscribable Society calendar feed.

`image` is optional — leave it `""` or point at any filename in `public/images/photos/`. A missing image shows a styled crest panel instead of breaking.

### Annual committee rollover

Edit `data/executive.json`: bump `"year"`, replace names/roles. Optional portraits: drop photos into `public/images/exec/` and put the filename in each member's `"photo"` field. Members without a photo get a crest placeholder — nothing breaks.

### Replacing files (file-replacement pattern)

These filenames are stable — replace the file, keep the name, and every link on the site keeps working:

| File | Location | Notes |
|---|---|---|
| Annual report | `public/downloads/anu-catholic-society-annual-report-2025-2026.pdf` | Add new years as new entries in `data/downloads.json` |
| Mass booklet | `public/downloads/mass-booklet.pdf` | Listed as "coming soon" until the file exists |
| Linktree QR code | `public/images/brand/linktree-qr.png` | Shown in the footer |
| Crest/logo | `public/images/brand/crest-seal.png` and `crest-seal-160.png` | Transparent PNG |
| Photos | `public/images/photos/*.jpg` | Reference by filename from `gallery.json` / `events.json` |

Do **not** hand-edit `public/downloads/finding-mass-in-canberra.pdf`, anything in `public/calendar/`, `sitemap.xml`, `robots.txt` or `CNAME` — those are **generated on every build** from the data files (that's why they're gitignored). The poster PDF, the interactive map and the church list can never drift apart because they share one source: `data/churches.json`.

---

## Running it locally (optional, for bigger changes)

```bash
npm ci          # install exact locked dependencies (Node 22 LTS)
npm run dev     # dev server at http://localhost:3000 (runs prebuild first)
npm run build   # full static build into out/
npx serve out   # preview the production build
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which installs from the lockfile, regenerates all derived files, builds, and deploys to GitHub Pages. Deploys are serialized (no race between two pushes) and the site also **rebuilds itself weekly** so past events fall off listings even during quiet weeks.

**One-time repository setup**
1. Settings → Pages → Source: **GitHub Actions**.
2. Settings → Pages → Custom domain: `anucatholicsociety.com`, then tick **Enforce HTTPS** once DNS resolves.
3. DNS at your registrar: `A` records for the apex to GitHub Pages IPs (`185.199.108.153`, `.109.`, `.110.`, `.111.`) and a `CNAME` record for `www` → `<org>.github.io`. The build writes the `CNAME` file into the site automatically.

**Hosting somewhere else / on a sub-path.** The same source builds for any host by changing two environment values (in the workflow's `env:` block, or in the shell for local builds):

```bash
NEXT_PUBLIC_BASE_PATH="/repo-name" \
NEXT_PUBLIC_SITE_ORIGIN="https://yourname.github.io" \
npm run build
```

Every asset link, page link, Open Graph image, sitemap entry and calendar URL is routed through two helpers (`lib/paths.ts`) driven by those variables — never hardcode a URL in a component. When building for a sub-path, the `CNAME` file is omitted automatically. Cloudflare Pages / Vercel / plain folder hosting: just serve `out/` (defaults work as-is for a root domain; set `NEXT_PUBLIC_SITE_ORIGIN` to the actual host).

**Caching gotcha for link previews.** Facebook/Instagram/Discord/iMessage cache Open Graph previews aggressively. After changing the share image or description, previews stay stale until the URL is re-scraped — paste the URL into a scraper/debugger tool, or share it with a cache-busting query (`https://anucatholicsociety.com/?v=2`). Browsers may also cache the old favicon for days; that resolves itself.

## Verify before launch ⚠️

These values shipped as sensible defaults and **must be confirmed before promoting the site**:

- [ ] **All times in `data/schedule.json`** — confirm with the chaplain, then update `lastVerified`.
- [ ] **Everything in `data/churches.json`**: Mass/confession/adoration times, phone numbers, website URLs, and the map pin coordinates (right-click in Google Maps → copy the lat/lng). Update each `lastVerified`.
- [ ] The two sample entries in `data/events.json` (Week 1 Mass, Market Day) — real dates/times or delete.
- [ ] `data/faqs.json` sacramental wording — sight-checked by the chaplain.
- [ ] History paragraphs in `data/about.json`; paste the John XXIII College history book URL into `site.json → links.johnsHistoryBook` when you have it.
- [ ] Photo consent for every image in `public/images/photos/` (all shipped images come from the Society's own annual report and archive). The privacy note offers image removal via email — honour it.
- [ ] Optional: create a free Formspree form and paste its endpoint into `site.json → contactForm.formspreeEndpoint`. Until then the contact page composes an email instead — both work.

## How the build-time generation works

`scripts/prebuild.mjs` runs before every build and regenerates, from `data/`:

- `public/calendar/anucathsoc.ics` — full subscribable calendar (weekly RRULEs + special events, Australia/Sydney timezone);
- `public/calendar/mass-and-liturgy.ics` — liturgy-only feed;
- `public/calendar/events/<id>.ics` — one downloadable file per special event;
- `public/downloads/finding-mass-in-canberra.pdf` — the printable A4 Mass-times poster, typeset from `churches.json`;
- `public/sitemap.xml`, `public/robots.txt` — from the route list, using the configured origin/base path;
- `public/CNAME` — only for root-domain builds.

It also warns (without failing) when a download referenced in `downloads.json` hasn't been uploaded yet.

## Architecture at a glance

```
data/            ← ALL editable content (JSON, each self-documented)
app/             ← one folder per page (Next.js App Router, static export)
components/      ← shared UI (header, footer, map, event cards, …)
lib/paths.ts     ← assetPath() + absoluteUrl() portability helpers
lib/data.ts      ← typed access to the data files
lib/schedule.ts  ← "next occurrence" date maths
scripts/prebuild.mjs        ← derived-artifact generation (above)
public/images/photos/       ← photographs (referenced by filename from data)
public/images/brand/        ← crest, QR code
public/downloads/           ← committed files offered for download
.github/workflows/deploy.yml← CI: build + deploy + weekly refresh
```

Design notes: palette (navy `#2E2D41`, gold `#A9852F`, ivory `#FAF7F0`) and type (Cormorant Garamond display / Source Sans 3 body, self-hosted) are tokenised in `tailwind.config.ts`. Dark mode is class-based, applied before first paint, with a manual toggle in the header. The only third-party requests are OpenStreetMap tiles (Find Mass page) and Instagram embeds (Gallery page, loaded lazily on scroll).

---

Maintained by the **ANU Catholic Society Executive** — anucathsoc@gmail.com.
Site by Peter Woodhead (Secretary), peterwoodhead@protonmail.com.
