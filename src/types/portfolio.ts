import type { LucideIcon } from "lucide-react";

export type Project = {
  title: string;
  slug: string;
  category: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  customizable: string;
  images: {
    src: string;
    alt: string;
  }[];
  focus: string[];
  liveUrl?: string;
  featured?: boolean;
};

export type SkillGroup = {
  category: string;
  skills: string[];
};

export type ExperienceItem = {
  role: string;
  context: string;
  date?: string;
  location?: string;
  summary: string;
  responsibilities: string[];
  tools?: string[];
};

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};
