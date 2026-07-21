"use client";

import { useState } from "react";
import { site } from "@/lib/data";

/**
 * Contact form. If a Formspree endpoint is configured in data/site.json it
 * posts there; otherwise it composes an email in the visitor's mail app -
 * either way, nothing on a static host ever "breaks".
 */
const TOPICS = [
  "General enquiry",
  "I'm new and would like someone to say hello",
  "Speak with the chaplain (confidential)",
  "Events",
  "Membership",
  "Sponsorship or partnership",
  "Website correction",
];

export default function ContactForm() {
  const endpoint = site.contactForm.formspreeEndpoint;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [name, setName] = useState("");
  const [reply, setReply] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot field - bots fill it, humans never see it.
  const [company, setCompany] = useState("");

  const mailtoHref = () => {
    const subject = encodeURIComponent(`[Website] ${topic}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${reply ? ` (${reply})` : ""}`);
    return `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const submit = async () => {
    if (company) return; // spam
    if (!endpoint) {
      window.location.href = mailtoHref();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ topic, name, contact: reply, message }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-lg border-l-4 border-gold p-6" style={{ background: "var(--bg-soft)" }}>
        <h3 className="font-display text-xl font-semibold">Thank you — we've got it.</h3>
        <p className="mt-2 max-w-prose text-sm leading-relaxed">
          Your message is on its way to the right person. We usually reply within a few days during semester. If you
          asked to meet someone before an event, keep an eye on your inbox — someone will be in touch to arrange it.
        </p>
      </div>
    );
  }

  const field = "mt-1 w-full rounded border px-3 py-2 text-sm";
  const fieldStyle = { borderColor: "var(--rule)", background: "var(--bg)", color: "var(--fg)" } as const;

  return (
    <div className="max-w-xl space-y-4">
      <div>
        <label htmlFor="topic" className="text-sm font-semibold">What is this about?</label>
        <select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} className={field} style={fieldStyle}>
          {TOPICS.map((t) => <option key={t}>{t}</option>)}
        </select>
        {topic.includes("chaplain") && (
          <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "var(--fg-soft)" }}>
            Chaplaincy requests are passed on privately and not shared with the general committee.
          </p>
        )}
      </div>
      <div>
        <label htmlFor="name" className="text-sm font-semibold">First name</label>
        <input id="name" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} className={field} style={fieldStyle} />
      </div>
      <div>
        <label htmlFor="reply" className="text-sm font-semibold">Email or preferred contact</label>
        <input id="reply" autoComplete="email" value={reply} onChange={(e) => setReply(e.target.value)} className={field} style={fieldStyle} />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-semibold">Message <span className="font-normal" style={{ color: "var(--fg-soft)" }}>(optional)</span></label>
        <textarea id="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={field} style={fieldStyle} />
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>
      <button type="button" onClick={submit} disabled={status === "sending"} className="btn btn-solid disabled:opacity-60">
        {status === "sending" ? "Sending…" : endpoint ? "Send message" : "Compose email"}
      </button>
      {status === "error" && (
        <p className="text-sm" role="alert">
          That didn't send — sorry. Please email us directly at{" "}
          <a href={`mailto:${site.email}`} className="font-semibold underline">{site.email}</a>.
        </p>
      )}
      <p className="text-xs leading-relaxed" style={{ color: "var(--fg-soft)" }}>
        We only use what you enter here to reply to you, and we delete submissions once resolved. This form is not an
        emergency service — see the support links in the footer if you need urgent help.
      </p>
    </div>
  );
}
