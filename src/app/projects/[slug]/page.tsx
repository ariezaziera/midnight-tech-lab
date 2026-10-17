import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content } from "@/content/editorial";
import { projectForRoute, routableProjects, isPublished } from "@/lib/content";
import { CaseStudyPage } from "@/components/editorial/portfolio";
export const dynamicParams = false;
export function generateStaticParams() { return routableProjects(content).map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = projectForRoute(content, (await params).slug);
  return { title: project ? `${isPublished(project) ? "" : "Local placeholder — "}${project.title}` : "Project unavailable", robots: { index: false, follow: false } };
}
export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const project = projectForRoute(content, (await params).slug);
  if (!project) notFound();
  return <CaseStudyPage project={project} data={content} />;
}
