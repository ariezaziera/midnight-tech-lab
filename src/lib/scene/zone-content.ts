import type { EditorialContent } from "@/content/model";
import { projectForRoute, isPublished } from "@/lib/content";

/** Public presentation subset only. Approval notes, drafts and media never cross into the scene. */
export type DevelopmentExhibit = { id: "savvyra"; title: string; summary: string; contribution: string; approach: string; href: string };
export function developmentExhibit(data: EditorialContent): DevelopmentExhibit | null {
  const project = projectForRoute(data, "savvyra");
  if (!project || !isPublished(project) || !project.categoryIds.includes("development") || !project.role?.trim() || !project.caseStudy.overview?.trim() || !project.caseStudy.contribution?.trim() || !project.caseStudy.process?.[0]?.trim()) return null;
  return { id: "savvyra", title: project.title, summary: project.summary, contribution: project.caseStudy.contribution, approach: project.caseStudy.process[0], href: `/projects/${project.slug}` };
}
