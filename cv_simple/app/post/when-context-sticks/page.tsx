import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import {
  CurriculumEquations,
  PromptSwitchFigure,
} from "@/components/when-context-sticks/figures";
import { getTrackedGitDates } from "@/lib/git-dates";
import type { HeadingLink } from "@/lib/posts";
import { isPostIndexable } from "@/lib/posts";
import {
  SEARCH_NAME,
  countWordsFromTextBlocks,
  createArticleStructuredData,
  createPageMetadata,
} from "@/lib/site";
import whenContextSticksPost, {
  type SectionFigureContent,
} from "@/lib/when-context-sticks-post";

export async function generateMetadata(): Promise<Metadata> {
  const gitDates = await getTrackedGitDates([
    "content/posts/when-context-sticks.json",
    "app/post/when-context-sticks/page.tsx",
  ]);

  return createPageMetadata({
    title: `${whenContextSticksPost.title} | ${SEARCH_NAME}`,
    description:
      whenContextSticksPost.description || whenContextSticksPost.intro[0],
    path: "/post/when-context-sticks",
    index: isPostIndexable(whenContextSticksPost),
    openGraphType: "article",
    publishedTime:
      whenContextSticksPost.publishedAt ?? gitDates.publishedAt,
    modifiedTime: whenContextSticksPost.updatedAt ?? gitDates.updatedAt,
    section: whenContextSticksPost.subtitle,
    tags: [whenContextSticksPost.title, whenContextSticksPost.subtitle],
  });
}

const buttonBaseClasses =
  "group inline-flex items-center gap-2 border border-black/70 bg-[var(--background)] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--foreground)] shadow-[3px_3px_0_rgba(0,0,0,0.7)] transition-transform duration-200 hover:-translate-y-0.5 hover:translate-x-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const figureDotsStyle = {
  backgroundImage: "radial-gradient(circle, #eadfbc 1.2px, transparent 1.2px)",
  backgroundSize: "18px 18px",
} as const;

const dottedFigureNoteOffsetClasses = "px-2 sm:px-4 md:px-0 md:pl-[2.65625%]";
const dottedFigureNoteClasses =
  "mr-auto w-full max-w-2xl border border-black/10 bg-[#fbf8ef] p-5 text-left text-[12px] leading-relaxed text-foreground";
const dottedFigureCaptionClasses =
  "mt-2 px-7 text-left sm:px-9 md:mt-5 md:px-0 md:pl-[calc(2.65625%+1.25rem)]";

function renderHeadingLinkIcon(icon?: HeadingLink["icon"]) {
  switch (icon) {
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
    case "arxiv":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4 fill-current stroke-current"
        >
          <path
            d="M3.8423 0a1.0037 1.0037 0 0 0-.922.6078c-.1536.3687-.0438.6275.2938 1.1113l6.9185 8.3597-1.0223 1.1058a1.0393 1.0393 0 0 0 .003 1.4229l1.2292 1.3135-5.4391 6.4444c-.2803.299-.4538.823-.2971 1.1986a1.0253 1.0253 0 0 0 .9585.635.9133.9133 0 0 0 .6891-.3405l5.783-6.126 7.4902 8.0051a.8527.8527 0 0 0 .6835.2597.9575.9575 0 0 0 .8777-.6138c.1577-.377-.017-.7502-.306-1.1407l-7.0518-8.3418 1.0632-1.13a.9626.9626 0 0 0 .0089-1.3165L4.6336.4639s-.3733-.4535-.768-.463z"
            strokeWidth="0.45"
            strokeLinejoin="round"
          />
          <path
            d="M3.8423.272h.0166c.2179.0052.4874.2715.5644.3639l.005.006.0052.0055 10.169 10.9905a.6915.6915 0 0 1-.0072.945l-1.0666 1.133-1.4982-1.7724-8.5994-10.39c-.3286-.472-.352-.6183-.2592-.841a.7307.7307 0 0 1 .6704-.4401Z"
            strokeWidth="0.45"
            strokeLinejoin="round"
          />
          <path
            d="M18.1833 1.8421a.877.877 0 0 0-.6554.2418l-5.6962 6.1584 1.6944 1.8319 5.3089-6.5138c.3251-.4335.479-.6603.3247-1.0292a1.1205 1.1205 0 0 0-.9763-.689Z"
            strokeWidth="0.45"
            strokeLinejoin="round"
          />
          <path
            d="m10.5276 14.1244 1.3186 1.4135-5.7864 6.1295a.6494.6494 0 0 1-.4959.26.7516.7516 0 0 1-.706-.4669c-.1119-.2682.0359-.6864.2442-.9083l.0051-.0055.0047-.0055Z"
            strokeWidth="0.45"
            strokeLinejoin="round"
          />
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
}

function FigureCaption({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const hasCustomTopMargin = /\b(?:[\w-]+:)?mt-/.test(className);

  return (
    <p
      className={[
        hasCustomTopMargin ? "" : "mt-5",
        "font-mono text-[12px] italic text-(--muted)",
        className || "text-center",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}

function BreakoutFigure({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative left-1/2 w-[min(100vw-2rem,78rem)] -translate-x-1/2 ${className}`.trim()}
    >
      {children}
    </div>
  );
}

function FigureNote({ figure }: { figure: SectionFigureContent }) {
  if (!figure.note) {
    return null;
  }

  return (
    <div className={dottedFigureNoteOffsetClasses}>
      <aside className={dottedFigureNoteClasses}>{figure.note}</aside>
    </div>
  );
}

function FigureBlock({
  figure,
  children,
  className = "mt-10",
}: {
  figure: SectionFigureContent;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <BreakoutFigure className={className}>
      <div className="space-y-7 pt-7 pb-2" style={figureDotsStyle}>
        <FigureNote figure={figure} />
        <div>{children}</div>
        {figure.caption ? (
          <FigureCaption className={dottedFigureCaptionClasses}>
            {figure.caption}
          </FigureCaption>
        ) : null}
      </div>
    </BreakoutFigure>
  );
}

function ResultsSurfaceFigure() {
  return (
    <BreakoutFigure className="my-7">
      <div className="px-2 py-5 sm:px-4" style={figureDotsStyle}>
        <figure className="mx-auto max-w-3xl">
          <Image
            src="/when-context-sticks/figure1-article-transparent.webp"
            alt="Three 3D error surfaces comparing random, sequential, and mixed curricula across linear and quadratic context lengths."
            width={1400}
            height={460}
            sizes="(min-width: 768px) 42rem, calc(100vw - 3rem)"
            loading="lazy"
            className="h-auto w-full"
          />
          <FigureCaption className="mt-3 px-1 text-left sm:px-2">
            Overall 3D error surfaces from the linear-to-quadratic sweep. The
            axes vary the number of pre-switch linear examples and post-switch
            quadratic examples, with error shown vertically for each training
            curriculum.
          </FigureCaption>
        </figure>
      </div>
    </BreakoutFigure>
  );
}

export default async function WhenContextSticksPage() {
  const post = whenContextSticksPost;
  const gitDates = await getTrackedGitDates([
    "content/posts/when-context-sticks.json",
    "app/post/when-context-sticks/page.tsx",
  ]);
  const wordCount = countWordsFromTextBlocks([
    ...post.intro,
    ...post.stickinessSection.paragraphs,
    ...post.setupSection.paragraphs,
    ...post.curriculumSection.paragraphs,
    ...post.findingsSection.paragraphs,
    ...post.findingsSection.bullets,
    ...post.whySection.paragraphs,
    ...post.limitationsSection.paragraphs,
    post.stickinessSection.heading,
    post.setupSection.heading,
    post.curriculumSection.heading,
    post.findingsSection.heading,
    post.whySection.heading,
    post.limitationsSection.heading,
    post.closing.text,
  ]);
  const articleStructuredData = isPostIndexable(post)
    ? createArticleStructuredData({
        title: post.title,
        description: post.description || post.intro[0],
        path: "/post/when-context-sticks",
        datePublished: post.publishedAt ?? gitDates.publishedAt,
        dateModified: post.updatedAt ?? gitDates.updatedAt,
        section: post.subtitle,
        wordCount,
      })
    : null;
  const hasStickinessText =
    post.stickinessSection.heading ||
    post.stickinessSection.paragraphs.length > 0;
  const hasWhyText =
    post.whySection.heading || post.whySection.paragraphs.length > 0;
  const hasClosingText = post.closing.label || post.closing.text;

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      {articleStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleStructuredData),
          }}
        />
      )}
      <main className="mx-auto w-full max-w-4xl px-4 py-10 text-base leading-relaxed text-foreground sm:px-6 md:px-8">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.25em] text-(--muted) underline-offset-4 hover:text-foreground hover:underline"
        >
          ← Back to updates
        </Link>

        <header className="mt-6 space-y-4 border-b border-black/10 pb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-(--muted)">
            {post.subtitle}
          </p>
          <h1 className="text-3xl font-serif leading-tight tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-(--muted)">
            <span>{post.date}</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="space-y-3 pt-4">
            <div className="flex flex-wrap items-start gap-3">
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
        </header>

        <section className="mt-8 space-y-4 text-[15px] leading-relaxed text-foreground sm:text-base">
          {post.intro.map((paragraph, index) => (
            <p key={`intro-${index}`}>{paragraph}</p>
          ))}
        </section>

        <FigureBlock figure={post.stickinessSection.figure} className="mt-8">
          <PromptSwitchFigure />
        </FigureBlock>

        <div className="mt-10 space-y-10">
          {hasStickinessText ? (
            <section className="space-y-4">
              {post.stickinessSection.heading ? (
                <h2 className="text-2xl font-serif leading-snug">
                  {post.stickinessSection.heading}
                </h2>
              ) : null}
              {post.stickinessSection.paragraphs.map((paragraph, index) => (
                <p key={`stickiness-${index}`}>{paragraph}</p>
              ))}
            </section>
          ) : null}

          <section className="space-y-4">
            <h2 className="text-2xl font-serif leading-snug">
              {post.setupSection.heading}
            </h2>
            {post.setupSection.paragraphs.map((paragraph, index) => (
              <p key={`setup-${index}`}>{paragraph}</p>
            ))}
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif leading-snug">
              {post.curriculumSection.heading}
            </h2>
            <p>{post.curriculumSection.paragraphs[0]}</p>
            <CurriculumEquations />
            {post.curriculumSection.paragraphs.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif leading-snug">
              {post.findingsSection.heading}
            </h2>
            {post.findingsSection.paragraphs.map((paragraph, index) => (
              <div key={`findings-${index}`}>
                <p>{paragraph}</p>
                {index === 1 ? <ResultsSurfaceFigure /> : null}
              </div>
            ))}
            {post.findingsSection.bullets.length > 0 ? (
              <ul className="ml-4 list-disc space-y-2 text-[15px]">
                {post.findingsSection.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>

          {hasWhyText ? (
            <section className="space-y-4">
              {post.whySection.heading ? (
                <h2 className="text-2xl font-serif leading-snug">
                  {post.whySection.heading}
                </h2>
              ) : null}
              {post.whySection.paragraphs.map((paragraph, index) => (
                <p key={`why-${index}`}>{paragraph}</p>
              ))}
            </section>
          ) : null}

          <section className="space-y-4">
            <h2 className="text-2xl font-serif leading-snug">
              {post.limitationsSection.heading}
            </h2>
            {post.limitationsSection.paragraphs.map((paragraph, index) => (
              <p key={`limitations-${index}`}>{paragraph}</p>
            ))}
          </section>

          {hasClosingText ? (
            <aside className="border border-black/10 bg-white/75 p-5 text-sm leading-relaxed shadow-[4px_4px_0_rgba(0,0,0,0.08)]">
              {post.closing.label ? (
                <p className="text-[11px] uppercase tracking-[0.3em] text-(--muted)">
                  {post.closing.label}
                </p>
              ) : null}
              {post.closing.text ? (
                <p className="mt-2 font-serif text-lg leading-snug text-foreground">
                  {post.closing.text}
                </p>
              ) : null}
            </aside>
          ) : null}
        </div>
      </main>
    </div>
  );
}
