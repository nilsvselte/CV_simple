import type { Metadata } from "next";
import type {
  Article,
  BreadcrumbList,
  Graph,
  IdReference,
  Person,
  ProfilePage,
  WebPage,
  WebSite,
} from "schema-dts";

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  index?: boolean;
  openGraphType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
};

type ArticleStructuredDataOptions = {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  section?: string;
  wordCount?: number;
};

export const PERSON_NAME = "Nils Valseth Selte";
export const SEARCH_NAME = "Nils Selte";
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

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    "https://nilsselte.no"
);
export const SITE_TITLE = `${SEARCH_NAME} | AI, finance, and software projects`;
export const SITE_DESCRIPTION =
  "Nils Selte, full name Nils Valseth Selte, is an Industrial Economics and Technology Management student at NTNU who writes about AI, finance, software, and the projects he builds.";
export const LINKEDIN_URL = "https://www.linkedin.com/in/nils-selte/";
export const GITHUB_URL = "https://github.com/nilsvselte";
export const DEFAULT_OG_IMAGE_PATH = "/og-default.svg";

const SITE_KEYWORDS = [
  SEARCH_NAME,
  PERSON_NAME,
  "AI",
  "finance",
  "software engineering",
  "machine learning",
  "portfolio",
];

const DEFAULT_OG_IMAGES = [
  {
    url: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
    width: 1200,
    height: 630,
    alt: `${SEARCH_NAME} website preview`,
  },
];

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? SITE_URL : `${SITE_URL}${normalizedPath}`;
}

function getStructuredDataIds(path = "/") {
  return {
    websiteId: absoluteUrl("/#website"),
    personId: absoluteUrl("/#person"),
    profilePageId: absoluteUrl("/#profile"),
    webPageId: absoluteUrl(`${path}#webpage`),
    articleId: absoluteUrl(`${path}#article`),
    breadcrumbId: absoluteUrl(`${path}#breadcrumb`),
  };
}

function createIdReference(id: string): IdReference {
  return {
    "@id": id,
  };
}

function getPageKeywords(extraKeywords: string[] = []) {
  return Array.from(new Set([...SITE_KEYWORDS, ...extraKeywords.filter(Boolean)]));
}

function createBreadcrumbStructuredData(
  name: string,
  path: string
): BreadcrumbList {
  const url = absoluteUrl(path);

  return {
    "@type": "BreadcrumbList",
    "@id": absoluteUrl(`${path}#breadcrumb`),
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SEARCH_NAME,
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: url,
      },
    ],
  };
}

export function countWordsFromTextBlocks(textBlocks: string[]) {
  const text = textBlocks.join(" ").trim();

  if (!text) {
    return undefined;
  }

  return text.split(/\s+/).length;
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  index = true,
  openGraphType = "website",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const pageKeywords = getPageKeywords([title, ...tags]);
  const resolvedModifiedTime = modifiedTime ?? publishedTime;
  const openGraphBase = {
    title,
    description,
    url: canonical,
    siteName: PERSON_NAME,
    locale: "en_US",
    images: DEFAULT_OG_IMAGES,
  };

  return {
    title,
    description,
    keywords: pageKeywords,
    authors: [
      {
        name: PERSON_NAME,
        url: absoluteUrl("/"),
      },
    ],
    creator: PERSON_NAME,
    publisher: PERSON_NAME,
    category: section,
    alternates: {
      canonical,
    },
    openGraph:
      openGraphType === "article"
        ? {
            ...openGraphBase,
            type: "article",
            authors: [PERSON_NAME],
            publishedTime,
            modifiedTime: resolvedModifiedTime,
            section,
            tags: pageKeywords,
          }
        : {
            ...openGraphBase,
            type: "website",
          },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(DEFAULT_OG_IMAGE_PATH)],
    },
    robots: index
      ? {
          index: true,
          follow: true,
          "max-snippet": -1,
          "max-image-preview": "large",
          "max-video-preview": -1,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        }
      : {
          index: false,
          follow: true,
          "max-snippet": -1,
          "max-image-preview": "large",
          "max-video-preview": -1,
          googleBot: {
            index: false,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
  };
}

export function createHomepageStructuredData(): Graph {
  const { websiteId, profilePageId, personId } = getStructuredDataIds("/");
  const personReference = createIdReference(personId);

  const website: WebSite = {
    "@type": "WebSite",
    "@id": websiteId,
    url: absoluteUrl("/"),
    name: PERSON_NAME,
    alternateName: SEARCH_NAME,
    description: SITE_DESCRIPTION,
    publisher: personReference,
    inLanguage: "en",
  };

  const profilePage: ProfilePage = {
    "@type": "ProfilePage",
    "@id": profilePageId,
    url: absoluteUrl("/"),
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    isPartOf: createIdReference(websiteId),
    mainEntity: personReference,
    about: personReference,
    inLanguage: "en",
  };

  const person: Person = {
    "@type": "Person",
    "@id": personId,
    name: PERSON_NAME,
    givenName: "Nils",
    additionalName: "Valseth",
    familyName: "Selte",
    alternateName: SEARCH_NAME,
    url: absoluteUrl("/"),
    description: SITE_DESCRIPTION,
    image: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
    sameAs: [LINKEDIN_URL, GITHUB_URL],
    jobTitle: "Industrial Economics and Technology Management student",
    homeLocation: {
      "@type": "Place",
      name: "Oslo, Norway",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Norwegian University of Science and Technology",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "University of California, Berkeley",
      },
    ],
    knowsAbout: [
      "Artificial intelligence",
      "Finance",
      "Software engineering",
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [website, profilePage, person],
  };
}

export function createArticleStructuredData({
  title,
  description,
  path,
  datePublished,
  dateModified,
  section,
  wordCount,
}: ArticleStructuredDataOptions) {
  const {
    websiteId,
    personId,
    webPageId,
    articleId,
    breadcrumbId,
  } = getStructuredDataIds(path);
  const url = absoluteUrl(path);
  const resolvedDateModified = dateModified ?? datePublished;
  const pageKeywords = getPageKeywords([title, ...(section ? [section] : [])]);

  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": webPageId,
    url,
    name: title,
    description,
    isPartOf: createIdReference(websiteId),
    breadcrumb: createIdReference(breadcrumbId),
    inLanguage: "en",
  };

  const article: Article = {
    "@type": "Article",
    "@id": articleId,
    headline: title,
    description,
    url,
    mainEntityOfPage: createIdReference(webPageId),
    isPartOf: createIdReference(websiteId),
    image: [absoluteUrl(DEFAULT_OG_IMAGE_PATH)],
    author: createIdReference(personId),
    publisher: createIdReference(personId),
    inLanguage: "en",
    keywords: pageKeywords,
    articleSection: section,
    wordCount,
    datePublished,
    dateModified: resolvedDateModified,
  };

  const breadcrumb = createBreadcrumbStructuredData(title, path);

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, article, breadcrumb],
  };
}
