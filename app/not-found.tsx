import { assetPath } from "@/lib/paths";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start px-4 py-24 sm:px-6">
      <span className="eyebrow">404</span>
      <h1 className="display mt-3 text-4xl">This page has wandered off.</h1>
      <p className="mt-4 max-w-prose leading-relaxed" style={{ color: "var(--fg-soft)" }}>
        The address may have changed when we rebuilt the site. Everything still exists — try one of these:
      </p>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
        <li><a className="underline decoration-gold underline-offset-4" href={assetPath("/")}>Home</a></li>
        <li><a className="underline decoration-gold underline-offset-4" href={assetPath("/find-mass/")}>Find Mass</a></li>
        <li><a className="underline decoration-gold underline-offset-4" href={assetPath("/events/")}>Events</a></li>
        <li><a className="underline decoration-gold underline-offset-4" href={assetPath("/contact/")}>Contact</a></li>
      </ul>
    </section>
  );
}
