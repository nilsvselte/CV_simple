import type { NextConfig } from "next";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  "https://www.nilsselte.no"
).replace(/\/$/, "");
const canonicalUrl = new URL(siteUrl);
const canonicalHost = canonicalUrl.hostname;
const alternateHost = canonicalHost.startsWith("www.")
  ? canonicalHost.slice(4)
  : `www.${canonicalHost}`;

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: alternateHost,
          },
        ],
        destination: `${canonicalUrl.origin}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
