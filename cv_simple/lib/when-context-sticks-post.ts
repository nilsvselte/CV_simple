import rawPost from "@/content/posts/when-context-sticks.json";

import type { HeadingLink, PostSEO } from "@/lib/posts";

export type SectionFigureContent = {
  note?: string;
  caption?: string;
};

export type TextSection = {
  heading: string;
  paragraphs: string[];
};

export type FindingsSection = TextSection & {
  bullets: string[];
};

export type WhenContextSticksPostContent = {
  layout: "context-sticks";
  title: string;
  subtitle: string;
  description: string;
  publishedAt?: string;
  updatedAt?: string;
  date: string;
  readingTime: string;
  headingLinks: HeadingLink[];
  intro: string[];
  stickinessSection: TextSection & {
    figure: SectionFigureContent;
  };
  setupSection: TextSection;
  curriculumSection: TextSection & {
    figure: SectionFigureContent;
  };
  findingsSection: FindingsSection;
  whySection: TextSection;
  limitationsSection: TextSection;
  closing: {
    label: string;
    text: string;
  };
  seo?: PostSEO;
};

const whenContextSticksPost = rawPost as WhenContextSticksPostContent;

export default whenContextSticksPost;
