import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { gallery } from "@/lib/data";
import { assetPath } from "@/lib/paths";
import { Section } from "@/components/Section";
import InstagramEmbeds from "@/components/InstagramEmbeds";

export const metadata: Metadata = {
  title: "Gallery — Photos & Instagram",
  description: "Photos from ANU Catholic Society life: Mass, retreats, lectures, socials and service — plus our latest Instagram posts.",
};

export default function Gallery() {
  // Only render photos whose files actually exist - a missing file degrades
  // silently rather than breaking the page.
  const photos = gallery.photos.filter((p) =>
    fs.existsSync(path.join(process.cwd(), "public", "images", "photos", p.file))
  );

  return (
    <>
      <Section eyebrow="Gallery" title="Life in the Society" h1>
        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>figure]:mb-5 [&>figure]:break-inside-avoid">
          {photos.map((p) => (
            <figure key={p.file}>
              <img src={assetPath(`/images/photos/${p.file}`)} alt={p.alt} loading="lazy" className="w-full rounded-lg" />
              <figcaption className="mt-1.5 text-sm leading-snug" style={{ color: "var(--fg-soft)" }}>{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section eyebrow="On Instagram" title="Highlights from our feed" panel={false} className="!pt-0">
        <p className="mt-4 max-w-prose text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>
          These embeds load from Instagram when you scroll to them; if they don't appear (some browsers block them),
          each card links straight to the post.
        </p>
        <div className="mt-8">
          <InstagramEmbeds />
        </div>
      </Section>
    </>
  );
}
