import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/shell";
import { ProjectLibrary, JourneyLinks } from "@/components/editorial/portfolio";
import { content } from "@/content/editorial";
export const metadata: Metadata = { title: "Projects" };
export default async function Projects({ searchParams }: { searchParams: Promise<{ category?: string | string[] }> }) {
  const query = await searchParams;
  const category = typeof query.category === "string" ? query.category : undefined;
  return <><PageIntro eyebrow="01 / Projects" title="Work, with context."><p>A library for approved work, its process and the contribution behind it. Publication is waiting on verified content.</p></PageIntro><ProjectLibrary data={content} category={category} /><JourneyLinks /></>;
}
