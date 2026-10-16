import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActionLink, PageIntro, Placeholder } from "@/components/ui/shell";

export const dynamicParams = false;
export function generateStaticParams() { return [{ slug: "placeholder" }]; }
export const metadata: Metadata = { title: "Placeholder case study" };

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== "placeholder") notFound();
  return <><div className="mb-9"><ActionLink href="/projects" secondary>Back to projects</ActionLink></div><PageIntro eyebrow="Local layout preview / Not a real project" title="Placeholder case study"><p>Structure only. No project claims, results or client work are represented.</p></PageIntro><Placeholder title="Project media pending"><p>Approved screenshots and descriptive alternative text will be added with the actual project.</p></Placeholder><div className="mt-10 grid gap-8 sm:grid-cols-2">{["Overview", "Contribution", "Process", "Outcomes"].map(title => <section key={title} className="border-t border-white/15 pt-6"><h2 className="mb-3 text-2xl">{title}</h2><p className="text-muted">Placeholder — verified {title.toLowerCase()} content has not been supplied.</p></section>)}</div></>;
}
