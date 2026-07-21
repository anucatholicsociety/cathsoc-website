import { faqs } from "@/lib/data";

/** Accessible FAQ accordions using native details/summary. */
export default function Faq() {
  return (
    <div className="mt-8 max-w-3xl">
      {faqs.faqs.map((f) => (
        <details key={f.q} className="ruled-row group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 font-display text-lg font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="text-gold transition-transform group-open:rotate-45">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 4v16M4 12h16" /></svg>
            </span>
          </summary>
          <p className="max-w-prose pb-4 text-[0.95rem] leading-relaxed" style={{ color: "var(--fg-soft)" }}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
