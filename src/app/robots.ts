import type { MetadataRoute } from "next";

// PREVIEW MODE: private, not for indexing. Flip to the production rules
// (allow all + sitemap) when the site is ready to go public.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
  };
}
