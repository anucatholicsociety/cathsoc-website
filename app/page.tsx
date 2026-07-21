import { site, events, about, gallery } from "@/lib/data";
import { assetPath } from "@/lib/paths";
import { upcomingOnly } from "@/lib/schedule";
import PracticalStrip from "@/components/PracticalStrip";
import EventCard from "@/components/EventCard";
import { Section } from "@/components/Section";

const nextSteps = [
  { title: "I want to attend Mass", text: "Mass is on campus every Friday in semester, and all over Canberra on Sundays. Come as you are.", href: "/find-mass/" },
  { title: "I'm looking for community", text: "Pizza after Friday Mass, coffee catch-ups, dinners and socials — friendship is half of what we do.", href: "/get-involved/" },
  { title: "I want to explore Catholicism", text: "Curious, sceptical or somewhere in between — questions are welcome here. No sign-up required.", href: "/new-here/" },
  { title: "I'd like to return to the faith", text: "Been away a while? You are not the first. Start with Mass, or a quiet word with the chaplain.", href: "/catholic-life/#returning" },
  { title: "I'd like to speak with someone", text: "Message us to meet a committee member before your first event, or to talk with the chaplain privately.", href: "/contact/" },
  { title: "I want to become Catholic", text: "Ten catechumens are currently preparing through the Society. The path is called OCIA — start with a conversation.", href: "/catholic-life/#become-catholic" },
];

export default function Home() {
  const upcoming = upcomingOnly(events.upcoming).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-navy text-ivory">
        <img
          src={assetPath("/images/photos/chapel-exterior-day.jpg")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-night/90 via-navy/55 to-navy/35" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <p className="eyebrow !text-gold-bright">Australian National University</p>
          <h1 className="display mt-4 max-w-3xl text-5xl sm:text-6xl" style={{ textShadow: "0 2px 12px rgb(0 0 0 / 0.45)" }}>
            Catholic Society
          </h1>
          <p className="mt-3 font-display text-2xl italic text-gold-bright" style={{ textShadow: "0 1px 6px rgb(0 0 0 / 0.5)" }}>
            {site.motto} — {site.mottoTranslation}
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ivory/90" style={{ textShadow: "0 1px 4px rgb(0 0 0 / 0.5)" }}>
            {site.tagline} Join a welcoming community of students seeking Christ through the sacraments, prayer,
            formation, service and life together.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={assetPath("/find-mass/")} className="btn btn-gold">Find Mass</a>
            <a href={assetPath("/get-involved/")} className="btn border border-ivory text-ivory hover:bg-ivory hover:text-navy">Get Involved</a>
          </div>
          <p className="mt-6 text-sm text-ivory/80">
            First time?{" "}
            <a href={assetPath("/new-here/")} className="underline decoration-gold-bright underline-offset-4 hover:text-gold-bright">
              Start with our New Here guide →
            </a>
          </p>
        </div>
      </section>

      <PracticalStrip />

      {/* HOME ON CAMPUS */}
      <Section eyebrow="Your Home on Campus" title="A place for prayer, friendship and study">
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
          <div className="prose-block max-w-prose text-[1.02rem] leading-relaxed">
            <p>
              The Society gathers at the <strong>St John the Evangelist Chapel</strong> at 51 Daley Road — a short walk
              from Kambri, beside John XXIII College. Friday evenings are the heart of our week: confession and quiet
              adoration from 4:30&nbsp;pm, Mass at 5:30&nbsp;pm, then pizza in the courtyard.
            </p>
            <p>
              Between liturgies you will find us at coffee catch-ups, Bible studies, lectures and dinners around campus
              and Canberra. You can simply drop in to anything — no membership, booking or prior knowledge required.
            </p>
            <p className="!mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <a href={site.primaryLocation.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-gold underline-offset-4">
                Open in Google Maps
              </a>
              <a href={assetPath("/new-here/")} className="underline decoration-gold underline-offset-4">
                Plan your first visit
              </a>
            </p>
          </div>
          <figure className="justify-self-center">
            <div className="arch max-w-sm border-4 border-gold/40">
              <img src={assetPath("/images/photos/chapel-interior.jpg")} alt="Friday evening Mass inside the St John the Evangelist Chapel" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <figcaption className="mt-3 text-center text-sm" style={{ color: "var(--fg-soft)" }}>
              Friday Mass in the chapel, Daley Road
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* NEXT STEP */}
      <Section eyebrow="Choose Your Next Step" title="Wherever you're starting from" panel>
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
          {nextSteps.map((s) => (
            <a key={s.title} href={assetPath(s.href)} className="group bg-navy p-6 transition-colors hover:bg-navy-deep dark:bg-navy-deep dark:hover:bg-navy-night">
              <h3 className="font-display text-xl font-semibold text-ivory group-hover:text-gold-bright">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/75">{s.text}</p>
              <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-caps text-gold-bright">Go →</span>
            </a>
          ))}
        </div>
      </Section>

      {/* UPCOMING EVENTS */}
      <Section eyebrow="What's On" title="Upcoming events">
        <div className="mt-10 space-y-6">
          {upcoming.length > 0 ? (
            upcoming.map((e) => <EventCard key={e.id} event={e} />)
          ) : (
            <div className="rounded-lg border p-8" style={{ borderColor: "var(--rule)" }}>
              <p className="max-w-prose leading-relaxed">
                Nothing special is scheduled right now — we are likely between semesters. Friday Mass and our weekly
                gatherings continue through teaching weeks, and new events land first on Instagram.
              </p>
            </div>
          )}
        </div>
        <p className="mt-6 text-sm font-semibold">
          <a href={assetPath("/events/")} className="underline decoration-gold underline-offset-4">See all events and the weekly schedule →</a>
        </p>
      </Section>

      {/* MISSION */}
      <Section eyebrow="Why We Exist" title="Faith and reason, side by side">
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="prose-block max-w-prose text-[1.02rem] leading-relaxed">
            <p>{about.mission[0]}</p>
            <p>{about.mission[1]}</p>
            <p className="!mt-6 text-sm font-semibold">
              <a href={assetPath("/about/")} className="underline decoration-gold underline-offset-4">Read our mission and history →</a>
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-6 self-start">
            {about.byTheNumbers.map((n) => (
              <div key={n.label} className="border-t-2 pt-3 rule-gold">
                <dt className="order-2 text-sm leading-snug" style={{ color: "var(--fg-soft)" }}>{n.label}</dt>
                <dd className="font-display text-4xl font-semibold">{n.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* GALLERY TEASER */}
      <Section eyebrow="Life Together" title="A year in the Society">
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {gallery.photos.slice(2, 6).map((p) => (
            <figure key={p.file}>
              <img src={assetPath(`/images/photos/${p.file}`)} alt={p.alt} loading="lazy" className="aspect-[4/3] w-full rounded object-cover" />
              <figcaption className="mt-1.5 text-xs leading-snug" style={{ color: "var(--fg-soft)" }}>{p.caption}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-sm font-semibold">
          <a href={assetPath("/gallery/")} className="underline decoration-gold underline-offset-4">More photos and our Instagram →</a>
        </p>
      </Section>

      {/* FINAL INVITATION */}
      <section className="relative isolate overflow-hidden bg-navy text-ivory">
        <img src={assetPath("/images/photos/pizza-fellowship.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" loading="lazy" />
        <div className="absolute inset-0 bg-navy/70" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <h2 className="display mx-auto max-w-2xl text-4xl" style={{ textShadow: "0 2px 8px rgb(0 0 0 / 0.5)" }}>
            There is a place for you here.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ivory/90" style={{ textShadow: "0 1px 4px rgb(0 0 0 / 0.5)" }}>
            Come to Mass, share a meal, join a discussion — or simply meet someone from the Society before your first event.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={assetPath("/get-involved/")} className="btn btn-gold">Get Involved</a>
            <a href={assetPath("/contact/")} className="btn border border-ivory text-ivory hover:bg-ivory hover:text-navy">Ask a Question</a>
          </div>
        </div>
      </section>
    </>
  );
}
