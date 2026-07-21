import { navigation, site } from "@/lib/data";
import { assetPath } from "@/lib/paths";

export default function Footer() {
  return (
    <footer className="mt-20 bg-navy text-ivory dark:bg-navy-night" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
          <div>
            <div className="flex items-center gap-3">
              <img src={assetPath("/images/brand/crest-seal-160.png")} alt="" width={56} height={56} />
              <div className="font-display text-xl font-semibold leading-tight">
                ANU Catholic Society
                <span className="mt-1 block font-body text-[0.65rem] font-semibold uppercase tracking-eyebrow text-gold-bright">
                  {site.motto} · {site.mottoTranslation}
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/80">{site.tagline}</p>
            <address className="mt-4 text-sm not-italic leading-relaxed text-ivory/80">
              {site.primaryLocation.name}
              <br />
              {site.primaryLocation.address}
              <br />
              <a href={`mailto:${site.email}`} className="underline decoration-gold-bright/60 underline-offset-4 hover:text-gold-bright">
                {site.email}
              </a>
            </address>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <a className="underline decoration-gold-bright/60 underline-offset-4 hover:text-gold-bright" href={site.links.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a className="underline decoration-gold-bright/60 underline-offset-4 hover:text-gold-bright" href={site.links.linktree} target="_blank" rel="noopener noreferrer">
                Linktree
              </a>
              <a className="underline decoration-gold-bright/60 underline-offset-4 hover:text-gold-bright" href={site.links.membership} target="_blank" rel="noopener noreferrer">
                Membership
              </a>
            </div>
          </div>

          {navigation.footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-xs font-semibold uppercase tracking-eyebrow text-gold-bright">{col.heading}</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={assetPath(l.href)} className="text-ivory/85 hover:text-gold-bright">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="text-center">
            <img
              src={assetPath("/images/brand/linktree-qr.png")}
              alt="QR code linking to the ANU Catholic Society Linktree"
              width={104}
              height={104}
              className="mx-auto rounded bg-white p-1.5"
            />
            <p className="mt-2 text-[0.65rem] uppercase tracking-caps text-ivory/70">Scan for all our links</p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-xs leading-relaxed text-ivory/60">
          <p>{site.affiliations}</p>
          <p className="mt-2">{site.emergencyNote}</p>
          <p className="mt-4 text-ivory/80">
            © {new Date().getFullYear()} {site.executiveCredit} ·{" "}
            <a href={`mailto:${site.email}`} className="hover:text-gold-bright">
              {site.email}
            </a>
          </p>
          <p className="mt-1 text-[0.68rem] text-ivory/40">
            Site by {site.authorCredit.name} ·{" "}
            <a href={`mailto:${site.authorCredit.email}`} className="hover:text-ivory/70">
              {site.authorCredit.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
