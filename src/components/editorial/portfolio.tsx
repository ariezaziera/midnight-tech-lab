import Link from "next/link";
import Image from "next/image";
import type { EditorialContent, Project } from "@/content/model";
import { isPublished, projectSelection, safeLink, approved } from "@/lib/content";
import { ActionLink, PageIntro, Placeholder } from "@/components/ui/shell";

export function JourneyLinks() {
  return <section className="editorial-section"><h2 className="text-2xl">Continue the conversation</h2><p className="mt-3 mb-6 text-muted">Explore the studio background or check the status of contact information.</p><div className="flex flex-wrap gap-4"><ActionLink href="/about" secondary>About Arieza</ActionLink><ActionLink href="/contact" secondary>Contact information</ActionLink></div></section>;
}
export function ProjectCard({ project, data }: { project: Project; data: EditorialContent }) {
  const preview = !isPublished(project);
  return <article className="editorial-card"><p className="eyebrow text-amber">{preview ? "Local placeholder · not real work" : "Published project"}</p><h3 className="mt-5 text-2xl">{project.title}</h3><p className="mt-3 text-muted">{project.summary}</p><ul aria-label="Project categories" className="my-6 flex flex-wrap gap-2">{project.categoryIds.map(id => <li className="tag" key={id}>{data.categories.find(c => c.id === id)?.label}</li>)}</ul><ActionLink href={`/projects/${project.slug}`} secondary>{preview ? "View placeholder case study" : `Read ${project.title}`}</ActionLink></article>;
}
export function ProjectLibrary({ data, category }: { data: EditorialContent; category?: string }) {
  const selection = projectSelection(data, category);
  const template = data.projects.find(p => p.slug === "placeholder" && p.status === "placeholder");
  return <><nav aria-label="Project filters" className="mb-8 flex flex-wrap gap-3"><Link className="studio-control" aria-current={!category ? "page" : undefined} href="/projects">All projects</Link>{selection.categories.map(c => <Link key={c.id} className="studio-control" aria-current={category === c.id ? "page" : undefined} href={`/projects?category=${encodeURIComponent(c.id)}`}>{c.label}</Link>)}</nav>
    {selection.projects.length ? <section><h2 className="mb-6 text-2xl">Published work</h2><div className="grid gap-6 md:grid-cols-2">{selection.projects.map(project => <ProjectCard key={project.slug} project={project} data={data} />)}</div></section> : <section className="editorial-card" aria-labelledby="projects-empty"><p className="eyebrow text-violet">Portfolio in preparation</p><h2 id="projects-empty" className="mt-5 text-3xl">{category ? "No projects match this filter." : "No approved projects yet."}</h2><p className="mt-4 max-w-2xl text-muted">Project descriptions, contributions, media and publication permissions are awaiting owner approval. No completed work is represented here.</p>{category && <div className="mt-6"><ActionLink href="/projects" secondary>Clear filters</ActionLink></div>}</section>}
    {template && <section className="editorial-section" aria-labelledby="template-heading"><h2 id="template-heading" className="mb-3 text-2xl">Explore the template</h2><p className="mb-6 text-muted">Separate from the portfolio: this local demonstration contains no actual project claims.</p><ProjectCard project={template} data={data} /></section>}</>;
}
export function CaseStudyPage({ project, data }: { project: Project; data: EditorialContent }) {
  const preview = !isPublished(project);
  const study = project.caseStudy;
  const sections = [
    ["Overview", study.overview], ["Context & problem", study.problem],
    ["Role & responsibilities", [project.role, study.contribution].filter(Boolean).join(" — ")],
    ["Tools & technologies", project.tools.join(", ")],
    ["Process & decisions", study.process?.join("\n\n")], ["Solution & deliverables", study.solution],
  ];
  const related = data.projects.filter(p => project.relatedSlugs.includes(p.slug) && isPublished(p));
  return <><div className="mb-9"><ActionLink href="/projects" secondary>Back to projects</ActionLink></div><PageIntro eyebrow={preview ? "Local layout preview / Not a real project" : "Case study"} title={project.title}><p>{project.summary}</p></PageIntro>
    {preview && <Placeholder title="Template preview only"><p>This is a local placeholder, not a completed project. Empty sections identify missing input; no narrative or outcome has been invented.</p></Placeholder>}
    <div className="mt-10 grid gap-8 md:grid-cols-2">{sections.filter(([, text]) => text || preview).map(([title, text]) => <section className="editorial-section" key={title}><h2 className="mb-4 text-2xl">{title}</h2><p className="whitespace-pre-line text-muted">{text || "Incomplete — owner-approved content has not been supplied."}</p></section>)}</div>
    {!!study.outcomes?.filter(o => approved(o.approval)).length && <section className="editorial-section"><h2 className="mb-4 text-2xl">Verified outcomes</h2>{study.outcomes.filter(o => approved(o.approval)).map(o => <p key={o.text} className="text-muted">{o.text}</p>)}</section>}
    {!!project.media.length && <section className="editorial-section"><h2 className="mb-6 text-2xl">Media gallery</h2><div className="grid gap-6 md:grid-cols-2">{project.media.filter(m => approved(m.approval)).map(m => <figure key={m.src}><Image src={m.src} alt={m.alt} width={m.width} height={m.height} sizes="(max-width: 767px) 100vw, 50vw" className="h-auto max-w-full" /><figcaption className="mt-2 text-sm text-muted">{m.provenance} · {m.rights}</figcaption></figure>)}</div></section>}
    {preview && <section className="editorial-section"><h2 className="mb-3 text-2xl">Project media pending</h2><p className="text-muted">Approved media, alt text and rights information are still needed. No imagery is substituted.</p></section>}
    {!!project.links.filter(safeLink).length && <section className="editorial-section"><h2 className="mb-4 text-2xl">Project links</h2><ul>{project.links.filter(safeLink).map(link => <li key={link.href}><ActionLink href={link.href} secondary>{link.label}</ActionLink></li>)}</ul></section>}
    <section className="editorial-section"><h2 className="mb-4 text-2xl">Continue exploring</h2>{related.length ? related.map(p => <ProjectCard key={p.slug} project={p} data={data} />) : <p className="mb-6 text-muted">Related approved work is not available yet.</p>}<ActionLink href="/projects" secondary>Browse all projects</ActionLink></section><JourneyLinks /></>;
}
