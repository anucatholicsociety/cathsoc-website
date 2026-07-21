/**
 * HOSTING-PATH PORTABILITY HELPERS
 * --------------------------------
 * Every reference to a bundled asset (images, downloads, icons, calendar
 * files) must go through assetPath(). Every absolute URL that leaves the
 * page (Open Graph images, canonical URLs, JSON-LD, sitemap entries) must
 * go through absoluteUrl(). No exceptions - raw asset references in markup
 * do NOT inherit Next's basePath.
 *
 * Both are driven by environment variables with zero-config defaults:
 *
 *   NEXT_PUBLIC_BASE_PATH   ""  by default (custom domain at the root).
 *                           Set to "/repo-name" when serving from
 *                           username.github.io/repo-name.
 *   NEXT_PUBLIC_SITE_ORIGIN "https://anucatholicsociety.com" by default.
 *                           Set to the actual host if previewing elsewhere,
 *                           e.g. "https://anucathsoc.github.io" - social
 *                           scrapers can only fetch absolute URLs that
 *                           resolve to the real host.
 */

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://anucatholicsociety.com"
).replace(/\/$/, "");

/** Prefix a root-relative asset/page path with the configured base path. */
export function assetPath(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${p}`;
}

/** Build a full absolute URL (origin + base path) for metadata and feeds. */
export function absoluteUrl(path: string = "/"): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${BASE_PATH}${p}`;
}
