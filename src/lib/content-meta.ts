/**
 * Central content-metadata registry (V7).
 *
 * Single source of truth for published/reviewed dates so visible "last
 * reviewed" text, Article dateModified and sitemap lastModified cannot drift.
 * Dates change only when content was substantively reviewed or updated,
 * never merely because a deployment happened.
 */

export interface ContentMeta {
  published: string; // ISO date
  reviewed: string; // ISO date, only bumped on substantive review
}

export const CONTENT_META: Record<string, ContentMeta> = {
  "/funding": { published: "2026-09-20", reviewed: "2026-09-20" },
  "/funding/queensland": { published: "2026-09-20", reviewed: "2026-09-20" },
  "/funding/new-south-wales": { published: "2026-09-20", reviewed: "2026-09-20" },
  "/funding/victoria": { published: "2026-09-20", reviewed: "2026-09-20" },
  "/funding/western-australia": { published: "2026-09-20", reviewed: "2026-09-20" },
  "/funding/south-australia": { published: "2026-09-20", reviewed: "2026-09-20" },

  "/integrations": { published: "2026-09-19", reviewed: "2026-09-20" },
  "/states": { published: "2026-09-19", reviewed: "2026-09-20" },
  "/guides/school-pa-paging-requirements": { published: "2026-09-19", reviewed: "2026-09-19" },
  "/guides/compare-pa-system-quotes": { published: "2026-09-19", reviewed: "2026-09-19" },

  "/": { published: "2026-09-05", reviewed: "2026-09-20" },
  "/schools": { published: "2026-09-11", reviewed: "2026-09-13" },
  "/systems": { published: "2026-09-11", reviewed: "2026-09-13" },
  "/systems/ip-paging-pa": { published: "2026-09-12", reviewed: "2026-09-19" },
  "/systems/school-bell-announcements": { published: "2026-09-12", reviewed: "2026-09-19" },
  "/systems/emergency-lockdown": { published: "2026-09-12", reviewed: "2026-09-19" },
  "/systems/ip-intercom": { published: "2026-09-12", reviewed: "2026-09-12" },
  "/systems/traditional-vs-ip": { published: "2026-09-11", reviewed: "2026-09-13" },
  "/guides": { published: "2026-09-12", reviewed: "2026-09-20" },
  "/guides/ip-paging-network-readiness": { published: "2026-09-12", reviewed: "2026-09-19" },
  "/guides/school-pa-specification-checklist": { published: "2026-09-12", reviewed: "2026-09-12" },
  "/pricing": { published: "2026-09-11", reviewed: "2026-09-17" },
  "/pricing-tool": { published: "2026-09-11", reviewed: "2026-09-19" },
  "/tools/funding-check": { published: "2026-09-11", reviewed: "2026-09-20" },
  "/tools": { published: "2026-09-11", reviewed: "2026-09-20" },
  "/financing": { published: "2026-09-17", reviewed: "2026-09-19" },
  "/tools/finance-check": { published: "2026-09-17", reviewed: "2026-09-19" },
  "/compare": { published: "2026-09-12", reviewed: "2026-09-19" },
  "/industries/aged-care-retirement-villages": { published: "2026-09-17", reviewed: "2026-09-19" },
  "/about": { published: "2026-09-05", reviewed: "2026-09-17" },
  "/about/methodology": { published: "2026-09-05", reviewed: "2026-09-17" },
  "/about/disclosure": { published: "2026-09-05", reviewed: "2026-09-17" },
  "/about/editorial-policy": { published: "2026-09-05", reviewed: "2026-09-17" },
  "/privacy": { published: "2026-09-05", reviewed: "2026-09-19" },
  "/contact": { published: "2026-09-05", reviewed: "2026-09-17" },
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-09-13" -> "13 September 2026" */
export function formatContentDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** Human label for the visible "Last reviewed" line on a page. */
export function reviewedLabel(path: string): string {
  const meta = CONTENT_META[path];
  return meta ? formatContentDate(meta.reviewed) : "";
}

/** ISO reviewed date for Article dateModified / sitemap lastModified. */
export function reviewedDate(path: string): string {
  return CONTENT_META[path]?.reviewed ?? "2026-09-11";
}

/** ISO published date for Article datePublished (NOT the reviewed date). */
export function publishedDate(path: string): string {
  return CONTENT_META[path]?.published ?? "2026-09-11";
}
