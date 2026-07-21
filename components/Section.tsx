/** Reusable editorial section: eyebrow label + display heading, spacious padding.
 *  Set h1 on the first Section of a page so every page has exactly one <h1>. */
export function Section({
  eyebrow, title, children, className = "", panel = false, id, h1 = false,
}: {
  eyebrow?: string; title?: string; children: React.ReactNode; className?: string; panel?: boolean; id?: string; h1?: boolean;
}) {
  const Heading = (h1 ? "h1" : "h2") as "h1" | "h2";
  return (
    <section
      id={id}
      className={`${panel ? "bg-navy text-ivory dark:bg-navy-deep" : ""} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        {(eyebrow || title) && (
          <header className="max-w-3xl">
            {eyebrow && <span className={`eyebrow ${panel ? "!text-gold-bright" : ""}`}>{eyebrow}</span>}
            {title && <Heading className="display mt-3 text-3xl sm:text-4xl">{title}</Heading>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
