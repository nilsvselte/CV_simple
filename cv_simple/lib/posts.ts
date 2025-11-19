import fs from "fs/promises";
import path from "path";

export type PostSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type HeadingLinkIcon =
  | "paper"
  | "github"
  | "external"
  | "dog"
  | "linkedin";

export type HeadingLink = {
  label: string;
  href: string;
  icon?: HeadingLinkIcon;
};

export type PostContent = {
  title: string;
  subtitle?: string;
  date: string;
  readingTime?: string;
  headingLinks?: HeadingLink[];
  intro: string[];
  highlight?: {
    label?: string;
    text: string;
  };
  sections: PostSection[];
  quote?: {
    text: string;
    attribution?: string;
  };
  cta?: {
    title: string;
    body: string;
    actionLabel?: string;
    actionHref?: string;
  };
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export async function getPostSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(POSTS_DIR);
    return files
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(/\.json$/, ""));
  } catch (error) {
    console.error("Unable to read posts directory", error);
    return [];
  }
}

export async function getPost(slug: string): Promise<PostContent | null> {
  try {
    const filePath = path.join(POSTS_DIR, `${slug}.json`);
    const file = await fs.readFile(filePath, "utf-8");
    return JSON.parse(file) as PostContent;
  } catch (error) {
    console.error(`Unable to load post ${slug}`, error);
    return null;
  }
}
