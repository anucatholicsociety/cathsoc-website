import type { Metadata } from "next";
import { churches } from "@/lib/data";
import { assetPath, absoluteUrl } from "@/lib/paths";
import { Section } from "@/components/Section";
import MassMap from "@/components/MassMap";

export const metadata: Metadata = {
  title: "Find Mass in Canberra — Interactive Map & Times",
  description: "Interactive map of Mass, confession and Eucharistic adoration times at Catholic churches near the ANU campus, with transport tips and a printable poster.",
};

export default function FindMass() {
  // schema.org Place entries so shared links and search results are rich.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": churches.churches.map((c) => ({
      "@type": "Church",
      name: c.name,
      address: c.address,
      url: c.website || absoluteUrl("/find-mass/"),
      geo: { "@type": "GeoCoordinates", latitude: c.lat, longitude: c.lng },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Section eyebrow="Getting to Mass" title="Find Mass in Canberra" h1>
        <p className="mt-5 max-w-prose text-lg leading-relaxed">
          Every Catholic church within easy reach of campus, with Mass, confession and adoration times, contact
          details and how to get there from ANU. {churches.notice}
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a href={assetPath("/downloads/finding-mass-in-canberra.pdf")} className="btn btn-solid" download>
            Download the one-page poster (PDF)
          </a>
          <a href={assetPath("/catholic-life/")} className="btn btn-line">Mass on campus →</a>
        </div>
        <div className="mt-10">
          <MassMap />
        </div>
        <p className="mt-8 max-w-prose text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
          Know a time that has changed, or a church we should add? Email{" "}
          <a href="mailto:anucathsoc@gmail.com" className="font-semibold underline decoration-gold underline-offset-4">anucathsoc@gmail.com</a>{" "}
          — the map, list and printable poster all update together.
        </p>
      </Section>
    </>
  );
}
