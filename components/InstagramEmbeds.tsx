"use client";

import { useEffect, useRef, useState } from "react";
import { gallery, site } from "@/lib/data";

declare global {
  interface Window { instgrm?: { Embeds: { process: () => void } }; }
}

/**
 * Official Instagram embeds for the curated posts in data/gallery.json.
 * The Instagram script loads lazily, only when this section scrolls into
 * view, and only on pages that use this component - keeping the rest of the
 * site free of third-party scripts.
 */
export default function InstagramEmbeds() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && setLoad(true),
      { rootMargin: "400px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!load) return;
    if (window.instgrm) { window.instgrm.Embeds.process(); return; }
    const s = document.createElement("script");
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    document.body.appendChild(s);
  }, [load]);

  return (
    <div ref={ref}>
      <div className="grid gap-6 sm:grid-cols-2">
        {gallery.instagram.map((post) => (
          <figure key={post.url}>
            {load ? (
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={`${post.url}?utm_source=ig_embed`}
                data-instgrm-version="14"
                style={{ margin: 0, maxWidth: "540px", minWidth: "240px", width: "100%" }}
              >
                <a href={`${post.url}?utm_source=ig_embed`} target="_blank" rel="noopener noreferrer">
                  {post.label} — view on Instagram
                </a>
              </blockquote>
            ) : (
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border p-6 text-center text-sm font-semibold"
                style={{ borderColor: "var(--rule)" }}
              >
                {post.label} — view on Instagram
              </a>
            )}
            <figcaption className="mt-2 text-sm" style={{ color: "var(--fg-soft)" }}>{post.label}</figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 text-sm" style={{ color: "var(--fg-soft)" }}>
        Newest posts always land first on{" "}
        <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-gold underline-offset-4">
          {site.links.instagramHandle}
        </a>{" "}
        — follow along there for this week's schedule and photos.
      </p>
    </div>
  );
}
