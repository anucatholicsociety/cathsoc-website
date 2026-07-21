import type { Metadata } from "next";
import { site } from "@/lib/data";
import { Section } from "@/components/Section";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Ask a Question, Meet Someone, Speak with the Chaplain",
  description: "Contact the ANU Catholic Society: general enquiries, meeting someone before your first event, or a confidential conversation with the chaplain.",
};

export default function Contact() {
  return (
    <Section eyebrow="Contact" title="We'd love to hear from you" h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="prose-block max-w-prose leading-relaxed">
          <p>
            Whether you're new to ANU, exploring the faith, organising an event with us, or just want someone to say
            hello at the chapel door — send a note. Messages are routed to the right person, and anything marked for
            the chaplain stays confidential.
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${site.email}`} className="font-semibold underline decoration-gold underline-offset-4">{site.email}</a>
            <br />
            <strong>Instagram:</strong>{" "}
            <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-gold underline-offset-4">{site.links.instagramHandle}</a>
            <br />
            <strong>Find us:</strong> {site.primaryLocation.name}, {site.primaryLocation.address}
          </p>
          <p className="text-sm" style={{ color: "var(--fg-soft)" }}>
            During semester we usually reply within a few days. {site.emergencyNote}
          </p>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
