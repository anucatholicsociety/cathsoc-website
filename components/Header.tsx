"use client";

import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/lib/data";
import { assetPath } from "@/lib/paths";

function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="rounded-full border border-current opacity-100 [border-color:color-mix(in_srgb,currentColor_35%,transparent)] p-2 text-current hover:opacity-70"
    >
      {/* moon / sun */}
      {dark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape; lock background scroll while the mobile menu is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all ${
        scrolled ? "shadow-sm" : ""
      }`}
      style={{ background: "var(--bg)", borderColor: "var(--rule)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
        <a href={assetPath("/")} className="flex items-center gap-3">
          <img
            src={assetPath("/images/brand/crest-seal-160.png")}
            alt=""
            width={scrolled ? 38 : 46}
            height={scrolled ? 38 : 46}
            className="transition-all"
          />
          <span className="font-display text-lg font-semibold leading-tight sm:text-xl">
            <span className="block text-[0.6rem] font-body font-semibold uppercase tracking-eyebrow" style={{ color: "var(--accent-strong)" }}>
              Australian National University
            </span>
            Catholic Society
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {navigation.header.map((item) => (
            <a key={item.href} href={assetPath(item.href)} className="text-sm font-semibold hover:opacity-70">
              {item.label}
            </a>
          ))}
          <a href={assetPath(navigation.headerCta.href)} className="btn btn-gold !px-4 !py-2">
            {navigation.headerCta.label}
          </a>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="rounded border border-current opacity-100 [border-color:color-mix(in_srgb,currentColor_35%,transparent)] p-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="border-t lg:hidden"
          style={{ background: "var(--bg)", borderColor: "var(--rule)" }}
        >
          <nav aria-label="Mobile" className="mx-auto max-w-6xl px-4 py-4">
            <ul>
              {navigation.header.map((item) => (
                <li key={item.href} className="ruled-row">
                  <a href={assetPath(item.href)} className="block py-3 font-display text-xl font-semibold" onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={assetPath(navigation.headerCta.href)} className="btn btn-gold" onClick={() => setOpen(false)}>
                {navigation.headerCta.label}
              </a>
              <a href={assetPath("/find-mass/")} className="btn btn-line" onClick={() => setOpen(false)}>
                Find Mass
              </a>
            </div>
            <p className="mt-4 text-sm" style={{ color: "var(--fg-soft)" }}>
              {site.primaryLocation.name}, {site.primaryLocation.address}
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
