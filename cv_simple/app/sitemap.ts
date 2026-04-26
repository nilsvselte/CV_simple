import fs from "fs/promises";
import path from "path";

import type { MetadataRoute } from "next";

import { getPost, getPostSlugs, isPostIndexable } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

type SitemapEntry = MetadataRoute.Sitemap[number];

const customPosts = [
  {
    slug: "norgesgruppen-shelf-system",
    files: [
      "app/post/norgesgruppen-shelf-system/page.tsx",
      "content/posts/norgesgruppen-shelf-system.json",
      "lib/norgesgruppen-post.ts",
      "lib/site.ts",
    ],
    priority: 0.8,
  },
  {
    slug: "when-context-sticks",
    files: [
      "app/post/when-context-sticks/page.tsx",
      "content/posts/when-context-sticks.json",
      "lib/when-context-sticks-post.ts",
      "lib/site.ts",
    ],
    priority: 0.8,
  },
];

const customPostSlugs = new Set(customPosts.map((post) => post.slug));

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
      .filter((slug) => !customPostSlugs.has(slug))
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
  const customPostEntries: SitemapEntry[] = (
    await Promise.all(
      customPosts.map(async (customPost): Promise<SitemapEntry | null> => {
        const post = await getPost(customPost.slug);

        if (!post || !isPostIndexable(post)) {
          return null;
        }

        return {
          url: absoluteUrl(`/post/${customPost.slug}`),
          lastModified: await getLastModified(...customPost.files),
          changeFrequency: "monthly" as const,
          priority: customPost.priority,
        };
      })
    )
  ).filter((entry): entry is SitemapEntry => entry !== null);

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
    ...customPostEntries,
    ...indexedPostEntries,
  ];
}
