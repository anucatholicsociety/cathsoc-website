/**
 * Next.js configuration - ANU Catholic Society
 *
 * The site is a fully static export (plain HTML/CSS/JS, no server) so it can be
 * hosted on GitHub Pages, Cloudflare Pages, Vercel, or handed over as a folder.
 *
 * HOSTING PATH PORTABILITY
 * ------------------------
 * Two environment variables control where the build expects to live:
 *
 *   NEXT_PUBLIC_BASE_PATH    e.g. ""                      (custom domain / root - DEFAULT)
 *                            e.g. "/anucathsoc-website"   (project pages sub-path)
 *   NEXT_PUBLIC_SITE_ORIGIN  e.g. "https://anucatholicsociety.com"  (DEFAULT)
 *                            e.g. "https://anucssa.github.io"
 *
 * Never hardcode either of these in components - use assetPath() / absoluteUrl()
 * from lib/paths.ts instead.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    // GitHub Pages has no image optimisation server; serve images as-is.
    unoptimized: true,
  },
};

export default nextConfig;
