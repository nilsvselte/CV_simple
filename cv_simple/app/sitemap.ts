import fs from "fs/promises";
import path from "path";

import type { MetadataRoute } from "next";

import { getPost, getPostSlugs, isPostIndexable } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

type SitemapEntry = MetadataRoute.Sitemap[number];

async function getLastModified(...relativePaths: string[]) {
  const timestamps = await Promise.all(
    relativePaths.map(async (relativePath) => {
      try {
        const stats = await fs.stat(path.join(process.cwd(), relativePath));
        return stats.mtime;
      } catch {
        return null;
      }
    })
  );

  const dates = timestamps.filter((date): date is Date => date !== null);

  if (dates.length === 0) {
    return undefined;
  }

  return new Date(
    Math.max(...dates.map((date) => date.getTime()))
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getPostSlugs();
  const genericPostEntries: Array<SitemapEntry | null> = await Promise.all(
      slugs
        .filter((slug) => slug !== "norgesgruppen-shelf-system")
        .map(async (slug) => {
          const post = await getPost(slug);

        if (!post || !isPostIndexable(post)) {
          return null;
        }

        return {
          url: absoluteUrl(`/post/${slug}`),
          lastModified: await getLastModified(
            `content/posts/${slug}.json`,
            "app/post/[slug]/page.tsx",
            "lib/site.ts"
          ),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        };
      })
  );
  const indexedPostEntries = genericPostEntries.filter(
    (entry): entry is SitemapEntry => entry !== null
  );

  return [
    {
      url: absoluteUrl("/"),
      lastModified: await getLastModified(
        "app/page.tsx",
        "app/content.json",
        "app/layout.tsx",
        "lib/site.ts"
      ),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/post/norgesgruppen-shelf-system"),
      lastModified: await getLastModified(
        "app/post/norgesgruppen-shelf-system/page.tsx",
        "content/posts/norgesgruppen-shelf-system.json",
        "lib/norgesgruppen-post.ts",
        "lib/site.ts"
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...indexedPostEntries,
  ];
}
