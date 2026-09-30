import raw from "./projects.json";

export type Project = {
  id: number;
  name: string;
  image: string;
  description: string;
  deployed_url: string;
  github_url: string;
  /** Optional label override for the repo/secondary link button. */
  github_tag?: string;
  deployed_tag?: string;
  alt: string;
  type: "Coding" | "Creative";
  /** Full-size gallery images, if the project has a photo set. */
  media?: string[];
};

/**
 * Ordered newest-first in the JSON itself; that order is the display order.
 * Ids are unique and used only as React keys — the previous site had two
 * entries sharing id 18, which silently dropped one project from the grid.
 */
export const projects = raw as Project[];

export const codingProjects = projects.filter((p) => p.type === "Coding");
export const creativeProjects = projects.filter((p) => p.type === "Creative");

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => toSlug(p.name) === slug);
}

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
