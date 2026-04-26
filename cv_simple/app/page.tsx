import type { Metadata } from "next";

import { HomeHeader } from "@/components/home-header";
import {
  SITE_DESCRIPTION,
  SITE_TITLE,
  createHomepageStructuredData,
  createPageMetadata,
} from "@/lib/site";

import content, { TimelineVariant, TitlePart } from "./content";

const classNames = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

const variantStyles: Record<
  TimelineVariant,
  { interactive: string; static: string }
> = {
  primary: {
    interactive:
      "bg-white border border-black shadow-[3px_3px_0px_rgba(0,0,0,0.85)] hover:shadow-[5px_5px_0px_rgba(0,0,0,0.85)]",
    static:
      "bg-white border border-black shadow-[3px_3px_0px_rgba(0,0,0,0.85)]",
  },
  muted: {
    interactive:
      "bg-white/80 border border-[#d4d3cb] hover:border-[#bfbba4] hover:shadow-[3px_3px_0px_#c4c1aa]",
    static: "bg-white/80 border border-[#d4d3cb]",
  },
  plain: {
    interactive: "hover:bg-[#f3efe3]",
    static: "",
  },
};

const renderTitleParts = (parts: TitlePart[]) =>
  parts.map((part, index) => {
    if (part.type === "pi") {
      return (
        <span key={`pi-${part.subscript}-${index}`}>
          <span className="font-serif">{part.symbol}</span>
          <sub className="text-xs align-top">{part.subscript}</sub>
        </span>
      );
    }

    return (
      <span key={`text-${index}`}>
        {part.value}
      </span>
    );
  });

export const metadata: Metadata = createPageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function Home() {
  const { site, navigation, timeline, team, investors } = content;
  const homepageStructuredData = createHomepageStructuredData();
  const hasTeamHeading = team.heading.trim().length > 0;
  const teamMembers = team.members.filter((member) => member.trim().length > 0);
  const heroIntro = [
    site.hero.paragraphs[0],
    "",
    ...site.hero.paragraphs.slice(1),
  ].join("\n");

  return (
    <div className="min-h-screen bg-background" id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageStructuredData),
        }}
      />
      <main className="w-full max-w-2xl px-3 pb-6 pt-4 text-sm text-foreground sm:px-5 sm:pt-6 md:px-6">
        <HomeHeader
          siteName={site.name}
          links={navigation.links}
          intro={heroIntro}
        />

        <section id={timeline.sectionId} className="mt-6">
          <div className="pl-1">
            <div className="relative border-l border-neutral-300">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 left-0 block h-8 w-px bg-linear-to-t from-transparent to-background"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 left-0 block h-8 w-px bg-linear-to-b from-transparent to-background"
              />
              <div className="space-y-3 py-4 pl-5">
                {timeline.items.map((item) => {
                  const {
                    href,
                    postSlug,
                    titleParts,
                    description,
                    date,
                    badge,
                    variant,
                  } = item;
                  const baseKey = `${date}-${titleParts
                    .map((part) =>
                      part.type === "pi"
                        ? `${part.symbol}${part.subscript}`
                        : part.value
                    )
                    .join("-")}`;
                  const linkHref = postSlug ? `/post/${postSlug}` : href || "#";
                  const hasLink = Boolean(postSlug) || (href && href !== "#");
                  const isExternal =
                    hasLink && !postSlug && /^https?:\/\//.test(linkHref);

                  const itemContent = (
                    <>
                      <span className="absolute -left-5 top-1/2 block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-neutral-900 outline outline-background" />
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 flex-1 items-center gap-2">
                          {badge && (
                            <span className="shrink-0 bg-[#fbd45b] px-1 text-[10px] font-semibold uppercase text-[#111]">
                              {badge}
                            </span>
                          )}
                          <p className="min-w-0 flex-1 truncate text-[12px] font-semibold leading-relaxed text-foreground">
                            {renderTitleParts(titleParts)}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1 pt-0.5 text-[11px] text-neutral-500">
                          <time>{date}</time>
                          {hasLink && (
                            <span className="relative -top-0.5 text-sm font-semibold leading-none text-neutral-400 transition-colors group-hover:text-neutral-700">
                              ↗
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="mt-1.5 text-[12px] leading-normal text-neutral-600">
                        {description}
                      </p>
                    </>
                  );

                  const sharedClasses = classNames(
                    "relative block px-3 py-2.5 transition-all duration-200",
                    variantStyles[variant][hasLink ? "interactive" : "static"],
                    hasLink ? "group cursor-pointer" : "cursor-default"
                  );

                  if (hasLink) {
                    return (
                      <a
                        key={`${baseKey}-link`}
                        href={linkHref}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer noopener" : undefined}
                        className={sharedClasses}
                      >
                        {itemContent}
                      </a>
                    );
                  }

                  return (
                    <div key={`${baseKey}-static`} className={sharedClasses}>
                      {itemContent}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="mt-8 sm:ml-2">
          {hasTeamHeading && (
            <h2 className="text-base font-semibold uppercase tracking-[0.3em]">
              {team.heading}
            </h2>
          )}
          {teamMembers.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-[13px] text-neutral-700 md:grid-cols-3">
              {teamMembers.map((name) => (
                <p key={name} className="truncate">
                  {name}
                </p>
              ))}
            </div>
          )}
          <p className="mt-4 text-sm">
            {team.cta.prefix}{" "}
            <a
              href={team.cta.linkHref}
              target="_blank"
              rel="noreferrer noopener"
              className="underline decoration-2 underline-offset-4"
            >
              {team.cta.linkText}
            </a>
            {team.cta.suffix}
          </p>
        </section>

        <section id="investors" className="mt-8 space-y-2 sm:ml-2">
          <h2 className="text-base font-semibold uppercase tracking-[0.3em]">
            {investors.heading}
          </h2>
          <p>
            {investors.body.prefix}{" "}
            <a
              href={investors.body.linkHref}
              target="_blank"
              rel="noreferrer noopener"
              className="underline decoration-2 underline-offset-4"
            >
              {investors.body.linkText}
            </a>{" "}
            {investors.body.suffix}
          </p>
        </section>

        <footer className="mt-9 border-t border-black/10 pt-4 text-xs uppercase tracking-[0.3em] text-neutral-500 sm:ml-2">
          {site.footer}
        </footer>
      </main>
    </div>
  );
}
