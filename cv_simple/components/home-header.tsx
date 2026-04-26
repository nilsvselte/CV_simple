"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

import type { NavigationLink } from "@/app/content";

const getCurrentHash = () => {
  if (typeof window === "undefined") {
    return "top";
  }

  return window.location.hash.replace(/^#/, "") || "top";
};

const getLinkHash = (href: string) => {
  if (!href.startsWith("#")) {
    return null;
  }

  return href.replace(/^#/, "") || "top";
};

export function HomeHeader({
  siteName,
  links,
  intro,
}: {
  siteName: string;
  links: NavigationLink[];
  intro: string;
}) {
  const [activeHash, setActiveHash] = useState("top");
  const showIntro = activeHash !== "updates";

  useEffect(() => {
    const updateHash = () => setActiveHash(getCurrentHash());

    updateHash();
    window.addEventListener("hashchange", updateHash);
    window.addEventListener("popstate", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("popstate", updateHash);
    };
  }, []);

  const handleHashClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    linkHash: string | null
  ) => {
    if (!linkHash) {
      return;
    }

    if (linkHash === "updates") {
      event.preventDefault();
      window.history.pushState(null, "", href);
      setActiveHash(linkHash);
      return;
    }

    setActiveHash(linkHash);
  };

  return (
    <>
      <header className="flex flex-col gap-3 pb-4 sm:ml-2 md:flex-row md:items-center md:justify-between">
        <h1 className="m-0">
          <a href="#top" className="text-3xl font-serif tracking-tight">
            {siteName}
          </a>
        </h1>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm leading-normal text-(--muted)">
          {links.map(({ label, href, external }) => {
            const linkHash = getLinkHash(href);
            const isActive = linkHash === activeHash;

            return (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer noopener" : undefined}
                className={[
                  "underline-offset-8 decoration-2 hover:underline hover:text-foreground",
                  isActive ? "text-foreground underline" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={(event) => handleHashClick(event, href, linkHash)}
              >
                {label}
              </a>
            );
          })}
        </nav>
      </header>

      {showIntro && (
        <section className="mt-5 whitespace-pre-line text-sm leading-snug sm:ml-2">
          {intro}
        </section>
      )}
    </>
  );
}
