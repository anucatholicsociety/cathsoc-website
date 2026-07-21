import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/data";
import { absoluteUrl, assetPath } from "@/lib/paths";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: `${site.name} — ${site.motto}`,
    template: `%s — ${site.name}`,
  },
  description: site.socialDescription,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Faith and friendship at ANU`,
    description: site.socialDescription,
    url: absoluteUrl("/"),
    // Social scrapers need an absolute URL that resolves at the deployed host.
    images: [{ url: absoluteUrl("/images/photos/chapel-exterior-day.jpg"), width: 1600, height: 1200, alt: "St John the Evangelist Chapel at ANU" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Faith and friendship at ANU`,
    description: site.socialDescription,
    images: [absoluteUrl("/images/photos/chapel-exterior-day.jpg")],
  },
  icons: {
    icon: assetPath("/images/brand/crest-seal-160.png"),
    apple: assetPath("/images/brand/crest-seal-160.png"),
  },
  manifest: assetPath("/site.webmanifest"),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF7F0" },
    { media: "(prefers-color-scheme: dark)", color: "#1C1B29" },
  ],
};

// Applied before first paint so dark mode never flashes.
const themeInit = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.name,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/images/brand/crest-seal.png"),
  email: site.email,
  sameAs: [site.links.instagram, site.links.linktree],
  location: {
    "@type": "Place",
    name: site.primaryLocation.name,
    address: site.primaryLocation.address,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <AnnouncementBanner />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
