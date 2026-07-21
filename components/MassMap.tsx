"use client";

import { useEffect, useRef, useState } from "react";
import { churches } from "@/lib/data";
import type { Church } from "@/lib/data";
import { assetPath } from "@/lib/paths";

/**
 * Interactive map of Mass locations, built from data/churches.json.
 * Uses Leaflet with OpenStreetMap tiles (the map's only third-party request).
 * Selecting a marker or a list entry scrolls/highlights the matching card.
 */
export default function MassMap() {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<Record<string, import("leaflet").Marker>>({});
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !mapEl.current || mapRef.current) return;

      const map = L.map(mapEl.current, { scrollWheelZoom: false }).setView([-35.29, 149.128], 12);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const icon = (highlight: boolean) =>
        L.divIcon({
          className: "",
          iconSize: [26, 34],
          iconAnchor: [13, 34],
          popupAnchor: [0, -30],
          html: `<svg width="26" height="34" viewBox="0 0 26 34" aria-hidden="true"><path d="M13 0C5.8 0 0 5.7 0 12.8 0 22.4 13 34 13 34s13-11.6 13-21.2C26 5.7 20.2 0 13 0z" fill="${highlight ? "#A9852F" : "#2E2D41"}"/><path d="M12 6h2v4h4v2h-4v9h-2v-9H8v-2h4z" fill="#FAF7F0"/></svg>`,
        });

      churches.churches.forEach((c: Church) => {
        const m = L.marker([c.lat, c.lng], { icon: icon(false), title: c.name })
          .addTo(map)
          .bindPopup(`<strong>${c.name}</strong><br/>${c.suburb}`);
        m.on("click", () => {
          setSelected(c.id);
          document.getElementById(`church-${c.id}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
        markersRef.current[c.id] = m;
      });

      mapRef.current = map;
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  const focus = (c: Church) => {
    setSelected(c.id);
    mapRef.current?.setView([c.lat, c.lng], 15, { animate: true });
    markersRef.current[c.id]?.openPopup();
  };

  const accessLabel: Record<string, string> = {
    public: "Open access",
    keyed: "Keyed / PIN access",
    "on-request": "On request",
    none: "",
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <div
          ref={mapEl}
          role="region"
          aria-label="Map of Catholic churches near ANU. A full text list of every location follows this map."
          className="h-[420px] w-full rounded-lg border lg:sticky lg:top-24 lg:h-[560px]"
          style={{ borderColor: "var(--rule)" }}
        />
        <p className="mt-2 text-xs" style={{ color: "var(--fg-soft)" }}>
          Every location on this map is also listed in full beside it — the map is optional.
        </p>
      </div>

      <ul className="space-y-4" aria-label="Churches and Mass times">
        {churches.churches.map((c: Church) => (
          <li
            key={c.id}
            id={`church-${c.id}`}
            className={`rounded-lg border p-5 transition-colors ${selected === c.id ? "ring-2 ring-gold" : ""}`}
            style={{ borderColor: "var(--rule)", background: "var(--bg)" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-semibold">{c.name}</h3>
                <p className="text-sm" style={{ color: "var(--fg-soft)" }}>
                  {c.tradition}
                </p>
              </div>
              <button type="button" onClick={() => focus(c)} className="shrink-0 text-xs font-semibold uppercase tracking-caps underline underline-offset-4 hover:opacity-70">
                Show on map
              </button>
            </div>

            <dl className="mt-3 space-y-1.5 text-sm">
              {c.mass.sunday.length > 0 && (
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 font-semibold">Sunday</dt>
                  <dd>{c.mass.sunday.join(", ")}</dd>
                </div>
              )}
              {c.mass.saturdayVigil.length > 0 && (
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 font-semibold">Vigil</dt>
                  <dd>Saturday {c.mass.saturdayVigil.join(", ")}</dd>
                </div>
              )}
              {c.mass.weekday.length > 0 && (
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 font-semibold">Weekday</dt>
                  <dd>{c.mass.weekday.join("; ")}</dd>
                </div>
              )}
              {c.confession.length > 0 && (
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 font-semibold">Confession</dt>
                  <dd>{c.confession.join("; ")}</dd>
                </div>
              )}
              {c.adoration.times.length > 0 && (
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 font-semibold">Adoration</dt>
                  <dd>
                    {c.adoration.times.join("; ")}
                    {accessLabel[c.adoration.access] && (
                      <span className="ml-2 rounded-full border px-2 py-0.5 text-xs" style={{ borderColor: "var(--accent)", color: "var(--accent-strong)" }}>
                        {accessLabel[c.adoration.access]}
                      </span>
                    )}
                    {c.adoration.notes && (
                      <span className="block text-xs" style={{ color: "var(--fg-soft)" }}>
                        {c.adoration.notes}
                      </span>
                    )}
                  </dd>
                </div>
              )}
            </dl>

            <p className="mt-3 text-sm" style={{ color: "var(--fg-soft)" }}>
              {c.address} · {c.accessibility}
            </p>
            <p className="text-sm" style={{ color: "var(--fg-soft)" }}>
              From ANU: {c.transportFromANU}
            </p>
            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(c.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-gold underline-offset-4 hover:opacity-70"
              >
                Directions
              </a>
              {c.website && (
                <a href={c.website} target="_blank" rel="noopener noreferrer" className="underline decoration-gold underline-offset-4 hover:opacity-70">
                  Parish website
                </a>
              )}
              {c.phone && (
                <a href={`tel:${c.phone.replace(/[^\d+]/g, "")}`} className="underline decoration-gold underline-offset-4 hover:opacity-70">
                  {c.phone}
                </a>
              )}
            </p>
            <p className="mt-2 text-xs" style={{ color: "var(--fg-soft)" }}>
              Last verified {c.lastVerified} — always confirm with the parish.
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
