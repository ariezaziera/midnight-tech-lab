import type { Approval, EditorialContent, EditorialRecord, Project, VerifiedLink } from "@/content/model";

export function approved(approval: Approval | undefined): boolean {
  return !!approval?.ownerVerified && !!approval.publicPresentationApproved && !!approval.source.trim();
}
export function isPublished(record: EditorialRecord): boolean {
  return record.status === "published" && approved(record.approval);
}
export function safeLink(link: VerifiedLink): boolean {
  return approved(link.approval) && /^(https:\/\/[^\s]+|mailto:[^\s@]+@[^\s@]+|tel:\+?[\d ()-]+|\/(?!\/)[^\s]*)$/.test(link.href);
}
export function publishedProjects(data: EditorialContent): Project[] { return data.projects.filter(isPublished); }
export function routableProjects(data: EditorialContent): Project[] {
  return data.projects.filter(p => isPublished(p) || (p.slug === "placeholder" && p.status === "placeholder"));
}
export function projectForRoute(data: EditorialContent, slug: string): Project | undefined {
  return routableProjects(data).find(p => p.slug === slug);
}
export function projectSelection(data: EditorialContent, category?: string) {
  const projects = publishedProjects(data);
  const categories = data.categories.filter(c => projects.some(p => p.categoryIds.includes(c.id)));
  return { categories, projects: category ? projects.filter(p => p.categoryIds.includes(category)) : projects };
}
export function validateContent(data: EditorialContent): void {
  const fail = (message: string): never => { throw new Error(`Editorial content: ${message}`); };
  const unique = (ids: string[]) => { if (new Set(ids).size !== ids.length) fail("duplicate identifier"); };
  unique(data.projects.map(p => p.slug)); unique(data.categories.map(c => c.id));
  unique(data.services.map(s => s.id)); unique(data.profile.map(s => s.id)); unique(data.contacts.map(c => c.id));
  const records = [...data.projects, ...data.profile, ...data.services, ...data.contacts];
  for (const record of records) {
    if (!["published", "draft", "placeholder"].includes(record.status)) fail("invalid status");
    if (record.status === "published" && !approved(record.approval)) fail("published record requires owner approval");
  }
  for (const category of data.categories) if (!category.id.trim() || !category.label.trim()) fail("empty category");
  for (const project of data.projects) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) || !project.title.trim() || !project.summary.trim()) fail("invalid project identity");
    if (project.categoryIds.some(id => !data.categories.some(c => c.id === id))) fail("unknown category");
    for (const slug of project.relatedSlugs) if (!data.projects.some(p => p.slug === slug) || slug === project.slug) fail("invalid related project");
    if (isPublished(project) && (!project.role?.trim() || !project.caseStudy.overview?.trim())) fail("published project requires overview and role");
    for (const media of project.media) if (!Number.isInteger(media.width) || media.width <= 0 || !Number.isInteger(media.height) || media.height <= 0 || !media.alt.trim() || !media.rights.trim() || !media.provenance.trim() || !approved(media.approval) || !/^\/(?!\/)/.test(media.src) || media.src.includes("..")) fail("unapproved media");
    if (project.links.some(link => !safeLink(link))) fail("unverified external link");
    if (project.caseStudy.outcomes?.some(outcome => !outcome.text.trim() || !approved(outcome.approval))) fail("unverified outcome");
  }
  for (const service of data.services) {
    if (!service.title.trim() || !service.description.trim()) fail("incomplete service");
    if (service.relatedSlugs.some(slug => !data.projects.some(p => p.slug === slug))) fail("invalid service reference");
  }
  for (const method of data.contacts) if (!safeLink(method.destination)) fail("unverified contact");
  if (data.resume && !safeLink(data.resume)) fail("unverified resume");
}
