import rawContent from "./content.json";

export type TimelineVariant = "primary" | "muted" | "plain";

export type TitlePart =
  | { type: "text"; value: string }
  | { type: "pi"; symbol: string; subscript: string };

export type TimelineItem = {
  href: string;
  postSlug?: string;
  titleParts: TitlePart[];
  description: string;
  date: string;
  badge?: string;
  variant: TimelineVariant;
};

export type NavigationLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type TeamCTA = {
  prefix: string;
  linkText: string;
  linkHref: string;
  suffix: string;
};

export type InvestorBody = {
  prefix: string;
  linkText: string;
  linkHref: string;
  suffix: string;
};

export type SiteContent = {
  site: {
    name: string;
    hero: {
      paragraphs: string[];
    };
    footer: string;
  };
  navigation: {
    links: NavigationLink[];
  };
  timeline: {
    sectionId: string;
    items: TimelineItem[];
  };
  team: {
    heading: string;
    members: string[];
    cta: TeamCTA;
  };
  investors: {
    heading: string;
    body: InvestorBody;
  };
};

type NavigationLinkSource = Omit<NavigationLink, "href"> & {
  href?: string;
  hrefEnv?: string;
};

type TimelineItemSource = Omit<TimelineItem, "href"> & {
  href?: string;
  hrefEnv?: string;
};

type TeamCTASource = Omit<TeamCTA, "linkHref"> & {
  linkHref?: string;
  linkHrefEnv?: string;
};

type InvestorBodySource = Omit<InvestorBody, "linkHref"> & {
  linkHref?: string;
  linkHrefEnv?: string;
};

type SiteContentSource = {
  site: SiteContent["site"];
  navigation: {
    links: NavigationLinkSource[];
  };
  timeline: {
    sectionId: string;
    items: TimelineItemSource[];
  };
  team: {
    heading: string;
    members: string[];
    cta: TeamCTASource;
  };
  investors: {
    heading: string;
    body: InvestorBodySource;
  };
};

const contentData = rawContent as SiteContentSource;

const isRelativePath = (value?: string) => {
  if (!value) return false;
  if (value.startsWith("#")) {
    return false;
  }
  return !/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(value);
};

const joinBaseWithPath = (base: string, path: string) => {
  const normalizedBase = base.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
};

const resolveHrefValue = (
  direct?: string,
  envKey?: string,
  fallback = "#"
): string => {
  if (envKey) {
    const envValue = process.env[envKey];
    if (envValue) {
      if (isRelativePath(direct)) {
        return joinBaseWithPath(envValue, direct!);
      }
      return envValue;
    }
    console.warn(`Environment variable "${envKey}" is not defined.`);
  }
  return direct ?? fallback;
};

const content: SiteContent = {
  site: contentData.site,
  navigation: {
    links: contentData.navigation.links.map<NavigationLink>((link) => {
      const { hrefEnv, href, ...rest } = link;
      return {
        ...rest,
        href: resolveHrefValue(href, hrefEnv, "#"),
      };
    }),
  },
  timeline: {
    sectionId: contentData.timeline.sectionId,
    items: contentData.timeline.items.map<TimelineItem>((item) => {
      const { hrefEnv, href, ...rest } = item;
      return {
        ...rest,
        href: resolveHrefValue(href, hrefEnv, "#"),
      };
    }),
  },
  team: {
    heading: contentData.team.heading,
    members: contentData.team.members,
    cta: (() => {
      const { linkHrefEnv, linkHref, ...rest } = contentData.team.cta;
      return {
        ...rest,
        linkHref: resolveHrefValue(linkHref, linkHrefEnv, "#"),
      };
    })(),
  },
  investors: {
    heading: contentData.investors.heading,
    body: (() => {
      const { linkHrefEnv, linkHref, ...rest } = contentData.investors.body;
      return {
        ...rest,
        linkHref: resolveHrefValue(linkHref, linkHrefEnv, "#"),
      };
    })(),
  },
};

export default content;
