import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { executive } from "@/lib/data";
import { assetPath } from "@/lib/paths";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "The 2026 Executive",
  description: "Meet the ANU Catholic Society chaplain and 2026 student executive committee.",
};

export default function Executive() {
  const withPhotos = executive.members.map((m) => {
    const has = m.photo && fs.existsSync(path.join(process.cwd(), "public", "images", "exec", m.photo));
    return { ...m, hasPhoto: !!has };
  });
  const chaplaincy = withPhotos.filter((m) => m.group === "chaplaincy");
  const committee = withPhotos.filter((m) => m.group === "committee");

  const card = (m: (typeof withPhotos)[number]) => (
    <li key={m.name} className="text-center">
      {m.hasPhoto ? (
        <div className="arch mx-auto w-44 border-4 border-gold/40">
          <img src={assetPath(`/images/exec/${m.photo}`)} alt={`Portrait of ${m.name}`} className="aspect-[3/4] w-full object-cover" loading="lazy" />
        </div>
      ) : (
        <div className="arch mx-auto flex aspect-[3/4] w-44 items-center justify-center border-4 border-gold/30 bg-navy">
          <img src={assetPath("/images/brand/crest-seal-160.png")} alt="" width={64} height={64} className="opacity-80" />
        </div>
      )}
      <h3 className="mt-4 font-display text-xl font-semibold">{m.name}</h3>
      <p className="text-sm font-semibold uppercase tracking-caps" style={{ color: "var(--accent-strong)" }}>{m.role}</p>
      {m.bio && <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>{m.bio}</p>}
    </li>
  );

  return (
    <Section eyebrow={`Leadership · ${executive.year}`} title="The people behind the Society" h1>
      <p className="mt-5 max-w-prose text-lg leading-relaxed">
        Elected each year at the AGM, the student executive keeps the Society running — and our chaplaincy keeps it
        anchored in the sacraments. Say hello at any event, or reach all of us at{" "}
        <a href={`mailto:${executive.email}`} className="font-semibold underline decoration-gold underline-offset-4">{executive.email}</a>.
      </p>

      <h2 className="eyebrow mt-14">Chaplaincy</h2>
      <ul className="mt-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{chaplaincy.map(card)}</ul>

      <h2 className="eyebrow mt-14">Student Leaders in the Executive</h2>
      <ul className="mt-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{committee.map(card)}</ul>
    </Section>
  );
}
