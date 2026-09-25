import type { MetadataRoute } from "next";
import { modelTrainingCrawlerEnabled, siteIndexingEnabled } from "@/lib/indexing";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!siteIndexingEnabled()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  const rules = [
    { userAgent: "*", allow: "/", disallow: ["/api/"] },
    // Keep ChatGPT search discovery separate from model-training policy.
    { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/api/"] },
    ...(modelTrainingCrawlerEnabled()
      ? []
      : [{ userAgent: "GPTBot", disallow: "/" }]),
  ];

  return {
    rules,
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
