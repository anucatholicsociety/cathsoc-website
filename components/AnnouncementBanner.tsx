"use client";

import { useEffect, useState } from "react";
import { announcement } from "@/lib/data";
import { assetPath } from "@/lib/paths";

/**
 * Optional site-wide banner controlled by data/announcement.json.
 * Dismissal is remembered per message for the whole session so it does not
 * reappear as the visitor navigates.
 */
export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!announcement.enabled || !announcement.message) return;
    const today = new Date().toISOString().slice(0, 10);
    if (announcement.startDate && today < announcement.startDate) return;
    if (announcement.endDate && today > announcement.endDate) return;
    try {
      if (sessionStorage.getItem(`banner:${announcement.message}`) === "dismissed") return;
    } catch {}
    setVisible(true);
  }, []);

  if (!visible) return null;

  const urgent = announcement.severity === "urgent";
  return (
    <div
      role="status"
      className={`${urgent ? "bg-gold text-white" : "bg-navy text-ivory"} px-4 py-2.5 text-sm`}
      style={urgent ? { textShadow: "0 1px 1px rgb(0 0 0 / 0.3)" } : undefined}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <p>
          {announcement.message}{" "}
          {announcement.linkHref && (
            <a href={announcement.linkHref.startsWith("http") ? announcement.linkHref : assetPath(announcement.linkHref)} className="underline underline-offset-2">
              {announcement.linkLabel || "More information"}
            </a>
          )}
        </p>
        <button
          type="button"
          aria-label="Dismiss announcement"
          className="shrink-0 rounded p-1 hover:opacity-70"
          onClick={() => {
            try { sessionStorage.setItem(`banner:${announcement.message}`, "dismissed"); } catch {}
            setVisible(false);
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
      </div>
    </div>
  );
}
