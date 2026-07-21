import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { downloads } from "@/lib/data";
import { assetPath } from "@/lib/paths";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Downloads — Booklets, Posters & Reports",
  description: "Downloadable resources from the ANU Catholic Society: the printable Mass-times poster, Mass booklet and annual reports.",
};

function fileMeta(file: string) {
  const p = path.join(process.cwd(), "public", "downloads", file);
  if (!fs.existsSync(p)) return null;
  const kb = fs.statSync(p).size / 1024;
  return { size: kb > 900 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB`, ext: path.extname(file).slice(1).toUpperCase() };
}

export default function Downloads() {
  return (
    <Section eyebrow="Resources" title="Downloads" h1>
      <p className="mt-5 max-w-prose text-lg leading-relaxed">
        Booklets, posters and reports — free to download, print and share.
      </p>
      <ul className="mt-10 max-w-3xl">
        {downloads.items.map((item) => {
          const meta = fileMeta(item.file);
          return (
            <li key={item.file} className="ruled-row flex flex-wrap items-start justify-between gap-4 py-5">
              <div className="max-w-xl">
                <h2 className="font-display text-xl font-semibold">{item.title}</h2>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--fg-soft)" }}>{item.description}</p>
                {item.generated && meta && (
                  <p className="mt-1 text-xs" style={{ color: "var(--accent-strong)" }}>
                    Generated automatically from the website's data on every build.
                  </p>
                )}
              </div>
              {meta ? (
                <a href={assetPath(`/downloads/${item.file}`)} download className="btn btn-solid !px-4 !py-2 text-xs">
                  Download {meta.ext} · {meta.size}
                </a>
              ) : (
                <span className="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-caps" style={{ borderColor: "var(--rule)", color: "var(--fg-soft)" }}>
                  Coming soon
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
