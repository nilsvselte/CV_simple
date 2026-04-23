import type { NextConfig } from "next";

function normalizeSiteUrl(rawUrl: string) {
  const trimmed = rawUrl.replace(/\/$/, "");

  try {
    const url = new URL(trimmed);

    if (url.hostname.startsWith("www.")) {
      url.hostname = url.hostname.replace(/^www\./, "");
    }

    return url.toString().replace(/\/$/, "");
  } catch {
    return trimmed.replace(/^https?:\/\/www\./, (match) =>
      match.includes("https://") ? "https://" : "http://"
    );
  }
}

const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    "https://nilsselte.no"
);
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
