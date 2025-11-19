import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getPost, getPostSlugs } from "@/lib/posts";
import type { HeadingLink } from "@/lib/posts";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: `${post.title} | Nils Valseth Selte`,
    description: post.intro?.[0],
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const buttonBaseClasses =
    "group inline-flex items-center gap-2 border border-black/70 bg-[var(--background)] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--foreground)] shadow-[3px_3px_0_rgba(0,0,0,0.7)] transition-transform duration-200 hover:-translate-y-0.5 hover:translate-x-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

  const renderHeadingLinkIcon = (icon?: HeadingLink["icon"]) => {
    switch (icon) {
      case "dog":
        return (
          <span role="img" aria-label="Dog" className="text-lg leading-none">
            🐶
          </span>
        );
      case "linkedin":
        return (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-4 fill-current"
          >
            <path d="M20.45 20.45h-3.56V15c0-1.3-.02-2.97-1.81-2.97-1.82 0-2.1 1.42-2.1 2.87v5.55H9.42V8.96h3.42v1.57h.05c.48-.9 1.66-1.84 3.41-1.84 3.65 0 4.33 2.4 4.33 5.52v6.24ZM5.34 7.39a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm-1.78 13.06h3.56V8.96H3.56v11.49Z" />
          </svg>
        );
      case "github":
        return (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-4 fill-current"
          >
            <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.22.7-3.9-1.4-3.9-1.4a3.08 3.08 0 0 0-1.32-1.7c-1.07-.73.08-.72.08-.72a2.44 2.44 0 0 1 1.78 1.2 2.48 2.48 0 0 0 3.39 1 2.47 2.47 0 0 1 .74-1.56c-2.57-.29-5.28-1.29-5.28-5.73a4.49 4.49 0 0 1 1.2-3.12 4.18 4.18 0 0 1 .12-3.08s.97-.31 3.18 1.2a10.96 10.96 0 0 1 5.8 0c2.2-1.51 3.17-1.2 3.17-1.2a4.18 4.18 0 0 1 .12 3.08 4.5 4.5 0 0 1 1.2 3.12c0 4.46-2.72 5.43-5.31 5.72a2.74 2.74 0 0 1 .78 2.13v3.16c0 .31.2.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
          </svg>
        );
      case "paper":
        return (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-4 stroke-current"
            fill="none"
          >
            <path
              d="M7 3h10l4 4v14H7V3Z"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M7 3v18H3V7l4-4Z"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M12 11h6M12 15h6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        );
      default:
        return (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-4 stroke-current"
            fill="none"
          >
            <path
              d="M6 12h12m0 0-4-4m4 4-4 4"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto w-full max-w-4xl px-4 py-10 text-base leading-relaxed text-foreground sm:px-6 md:px-8">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.25em] text-(--muted) underline-offset-4 hover:text-foreground hover:underline"
        >
          ← Back to updates
        </Link>

        <header className="mt-6 space-y-4 border-b border-black/10 pb-8">
          {post.subtitle && (
            <p className="text-xs uppercase tracking-[0.35em] text-(--muted)">
              {post.subtitle}
            </p>
          )}
          <h1 className="text-3xl font-serif leading-tight tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-(--muted)">
            <span>{post.date}</span>
            {post.readingTime && <span>{post.readingTime}</span>}
          </div>
          {post.headingLinks && post.headingLinks.length > 0 && (
            <div className="pt-4">
              <div className="flex flex-wrap gap-3">
                {post.headingLinks.map((headingLink) => (
                  <a
                    key={`${headingLink.label}-${headingLink.href}`}
                    href={headingLink.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={buttonBaseClasses}
                  >
                    {renderHeadingLinkIcon(headingLink.icon)}
                    <span>{headingLink.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </header>

        <section className="mt-8 space-y-4 text-[15px] leading-relaxed text-foreground sm:text-base">
          {post.intro.map((paragraph, index) => (
            <p key={`intro-${index}`}>{paragraph}</p>
          ))}
        </section>

        {post.highlight && (
          <aside className="mt-8 rounded-sm border border-black/10 bg-white/75 p-5 text-sm leading-relaxed shadow-[4px_4px_0_rgba(0,0,0,0.08)]">
            {post.highlight.label && (
              <p className="text-[11px] uppercase tracking-[0.3em] text-(--muted)">
                {post.highlight.label}
              </p>
            )}
            <p className="mt-2 font-serif text-lg leading-snug text-foreground">
              {post.highlight.text}
            </p>
          </aside>
        )}

        <div className="mt-10 space-y-10">
          {post.sections.map((section, index) => (
            <section key={`section-${index}`} className="space-y-4">
              <h2 className="text-2xl font-serif leading-snug">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`section-${index}-${paragraphIndex}`}>{paragraph}</p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="ml-4 list-disc space-y-2 text-[15px]">
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li key={`section-${index}-bullet-${bulletIndex}`}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {post.quote && (
          <figure className="mt-12 border-l-4 border-black/70 pl-5">
            <blockquote className="font-serif text-xl leading-snug">
              “{post.quote.text}”
            </blockquote>
            {post.quote.attribution && (
              <figcaption className="mt-2 text-sm uppercase tracking-[0.25em] text-(--muted)">
                {post.quote.attribution}
              </figcaption>
            )}
          </figure>
        )}

        {post.cta && (
          <section className="mt-12 border border-black/10 bg-(--paper-muted) p-6 text-foreground shadow-[4px_4px_0_rgba(0,0,0,0.08)]">
            <p className="text-xs uppercase tracking-[0.3em] text-(--muted)">
              {post.cta.title}
            </p>
            <p className="mt-3 text-base">{post.cta.body}</p>
            {post.cta.actionHref && (
              <Link
                href={post.cta.actionHref}
                className={`${buttonBaseClasses} mt-4 w-fit`}
              >
                {post.cta.actionLabel ?? "Get in touch"}
              </Link>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
