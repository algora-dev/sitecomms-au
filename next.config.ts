import type { NextConfig } from "next";

const publicIndexingEnabled = process.env.SITE_INDEXING_ENABLED === "true";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/compare", destination: "/compare/schools", permanent: true }];
  },
  async headers() {
    // Staging/preview stays blocked at HTTP-header level. In production launch
    // mode ordinary pages are crawlable, while API responses remain noindex.
    if (!publicIndexingEnabled) {
      return [
        {
          source: "/:path*",
          headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
        },
      ];
    }

    return [
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
};

export default nextConfig;
