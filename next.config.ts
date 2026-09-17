import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PREVIEW MODE: block indexing at header level too. Remove when going public.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
};

export default nextConfig;
