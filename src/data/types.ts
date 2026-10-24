export type ProjectCategory = "Web App" | "System" | "Design" | "Graphic";

export interface Project {
  id: string;
  index: string; // "01", "02", ...
  title: string;
  category: ProjectCategory;
  year: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: string;   // single image under /public
  images?: string[]; // multiple images — enables slideshow in ProjectCard
}

export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string; // leave empty string if not yet provided
}

export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}
