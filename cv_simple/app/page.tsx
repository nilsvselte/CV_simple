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
      <span key={`text-${index}`} className="whitespace-pre-wrap">
        {part.value}
      </span>
    );
  });

export default function Home() {
  const { site, navigation, timeline, team, investors } = content;

  return (
    <div className="min-h-screen bg-background" id="top">
      <main className="w-full max-w-3xl px-4 pr-6 py-8 text-sm text-foreground sm:px-6 md:px-8">
        <header className="flex flex-col gap-4 border-b border-black/10 pb-6 md:flex-row md:items-center md:justify-between">
          <a
            href="#top"
            className="text-3xl font-serif tracking-tight hover:underline"
          >
            {site.name}
          </a>
          <nav className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-(--muted)">
            {navigation.links.map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer noopener" : undefined}
                className="underline-offset-8 decoration-2 hover:underline hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
        </header>

        <section className="mt-8 space-y-4 text-sm leading-relaxed">
          {site.hero.paragraphs.map((paragraph, index) => (
            <p key={`hero-${index}`}>{paragraph}</p>
          ))}
        </section>

        <section id={timeline.sectionId} className="mt-8">
          <div className="pl-2">
            <div className="relative border-l border-neutral-300">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 left-0 block h-8 w-px bg-linear-to-t from-transparent to-background"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 left-0 block h-8 w-px bg-linear-to-b from-transparent to-background"
              />
              <div className="space-y-4 py-6 pl-6">
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
                      <span className="absolute -left-6 top-1/2 block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-neutral-900 outline outline-background" />
                      <div className="flex flex-wrap items-baseline gap-2">
                        <div className="flex flex-1 flex-wrap items-center gap-2">
                          {badge && (
                            <span className="bg-[#fbd45b] px-1 text-[10px] font-semibold uppercase text-[#111]">
                              {badge}
                            </span>
                          )}
                          <div className="min-w-0 text-sm font-semibold leading-tight">
                            {renderTitleParts(titleParts)}
                          </div>
                        </div>
                        <time className="text-[11px] text-neutral-500">
                          {date}
                        </time>
                      </div>
                      <p className="mt-2 text-[12px] text-neutral-600">
                        {description}
                      </p>
                    </>
                  );

                  const sharedClasses = classNames(
                    "relative block px-4 py-3 transition-all duration-200",
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

        <section id="team" className="mt-10">
          <h2 className="text-base font-semibold uppercase tracking-[0.3em]">
            {team.heading}
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-[13px] text-neutral-700 md:grid-cols-3">
            {team.members.map((name) => (
              <p key={name} className="truncate">
                {name}
              </p>
            ))}
          </div>
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

        <section id="investors" className="mt-10 space-y-3">
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

        <footer className="mt-12 border-t border-black/10 pt-6 text-xs uppercase tracking-[0.3em] text-neutral-500">
          {site.footer}
        </footer>
      </main>
    </div>
  );
}
