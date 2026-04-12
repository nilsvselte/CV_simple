import rawPost from "@/content/posts/norgesgruppen-shelf-system.json";

import type { HeadingLink } from "@/lib/posts";

export type RankingStat = {
  label: string;
  short: string;
  value: string;
};

export type SystemFigureLabels = {
  kicker: string;
  input: {
    step: string;
    title: string;
    footer: string;
  };
  detector: {
    step: string;
    title: string;
    footer: string;
  };
  crop: {
    step: string;
    title: string;
    footer: string;
  };
  classifier: {
    step: string;
    title: string;
    topCandidates: string;
    topScores: string;
    lowMarginOnly: string;
  };
  rerank: {
    step: string;
    title: string;
    maxCos: string;
    labels: {
      crop: string;
      embed: string;
      refBank: string;
      rerank: string;
    };
  };
};

export type TrainingLaneSegment = {
  label: string[];
  weight: number;
  fill: string;
};

export type TrainingLane = {
  title: string;
  summary: string;
  segments: TrainingLaneSegment[];
};

export type TrainingFigureLabels = {
  kicker: string;
  lanes: TrainingLane[];
};

export type EquationContent = {
  line1Html: string;
  line2Html: string;
};

export type SectionFigureContent = {
  note?: string;
  caption?: string;
};

export type TextSection = {
  heading: string;
  paragraphs: string[];
};

export type NorgesgruppenPostContent = {
  layout: "norgesgruppen";
  title: string;
  subtitle: string;
  description: string;
  date: string;
  readingTime: string;
  headingLinks: HeadingLink[];
  ranking: {
    stats: RankingStat[];
  };
  intro: string[];
  systemSection: TextSection & {
    equation: EquationContent;
    figure: SectionFigureContent;
    figureLabels: SystemFigureLabels;
  };
  scoreSection: TextSection & {
    figure: SectionFigureContent;
  };
  trainingSection: TextSection & {
    figure: SectionFigureContent;
    figureLabels: TrainingFigureLabels;
  };
  resultsSection: TextSection;
};

const norgesgruppenPost = rawPost as NorgesgruppenPostContent;

export default norgesgruppenPost;
