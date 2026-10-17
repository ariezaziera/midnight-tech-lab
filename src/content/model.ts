export type PublicationStatus = "published" | "draft" | "placeholder";
export type Approval = { source: string; ownerVerified: true; publicPresentationApproved: true };
export type EditorialRecord = { status: PublicationStatus; approval?: Approval };
export type VerifiedLink = { label: string; href: string; approval: Approval };
export type Media = { src: string; width: number; height: number; alt: string; rights: string; provenance: string; approval: Approval };
export type Category = { id: string; label: string };
export type CaseStudy = {
  overview?: string; problem?: string; contribution?: string; process?: string[];
  solution?: string; outcomes?: { text: string; approval: Approval }[];
};
export type Project = EditorialRecord & {
  slug: string; title: string; summary: string; categoryIds: string[];
  role?: string; tools: string[]; projectType?: string; caseStudy: CaseStudy;
  media: Media[]; links: VerifiedLink[]; relatedSlugs: string[];
};
export type ProfileSection = EditorialRecord & { id: string; title: string; text?: string; missing: string };
export type Service = EditorialRecord & {
  id: string; title: string; description: string; deliverables: string[];
  suitableFor?: string; process?: string[]; relatedSlugs: string[];
};
export type ContactMethod = EditorialRecord & { id: string; destination: VerifiedLink };
export type EditorialContent = {
  categories: Category[]; projects: Project[]; profile: ProfileSection[];
  services: Service[]; contacts: ContactMethod[]; resume?: VerifiedLink;
};
