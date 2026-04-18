# AGENTS.md

## New Post SEO Checklist

When adding or updating a post, keep these items up to date so the site stays search-friendly without changing the visual design.

### For standard JSON-backed posts in `content/posts/*.json`

- Add a clear `title` that matches the actual topic of the post.
- Add a concise `description`. This is used for page metadata, social previews, and search snippets.
- Keep `subtitle` meaningful when present. It is reused as article/category metadata.
- Make sure the `intro` and `sections` contain real text. Avoid placeholder copy on indexable pages.
- Do not leave empty section headings. Use a real heading or leave the heading string empty only if the section intentionally has no heading.
- Add real `headingLinks` only when they point to a live repo, paper, demo, or external reference.
- Decide whether the page should be indexed:
  - Use `"seo": { "index": false }` for stealth, placeholder, thin, or not-ready pages.
  - Omit it or set it to `true` for real public posts that should rank.

### Dates

- Do not guess `publishedAt` or `updatedAt`.
- By default, article schema now derives publish/update dates from git history using the post file's commit history.
- Only add `publishedAt` or `updatedAt` if you intentionally want to override git-derived dates.
- If you do override them, use ISO format: `YYYY-MM-DD`.

### Custom post routes

If a post is not powered by the generic JSON route, wire it up manually:

- Use `createPageMetadata(...)` from `lib/site.ts`.
- Emit JSON-LD with `createArticleStructuredData(...)`.
- Pull publish/update dates from `getTrackedGitDates(...)` in `lib/git-dates.ts` unless you have an explicit reason not to.

### Sitewide SEO assumptions

- Canonicals, Open Graph, Twitter metadata, structured data, `robots.txt`, and `sitemap.xml` are already handled centrally. Do not duplicate them ad hoc in components.
- Keep the canonical host as configured in `NEXT_PUBLIC_SITE_URL` / `SITE_URL`.
- The homepage and posts already emit schema. Prefer extending the shared helpers in `lib/site.ts` instead of inventing page-specific metadata shapes.

### Before shipping

- Run `pnpm lint`.
- Run `pnpm build`.
- If the page is meant to rank, sanity-check the title, description, slug, and whether the content is substantial enough to deserve indexing.
