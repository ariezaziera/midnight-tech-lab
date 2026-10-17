import type { EditorialContent } from "./model";
import { validateContent } from "@/lib/content";

// No candidate project name in documentation has publication approval.
export const content: EditorialContent = {
  categories: [{ id: "layout-preview", label: "Layout preview" }],
  projects: [{
    slug: "placeholder", title: "Placeholder case study",
    summary: "A local template preview, not real portfolio or client work.",
    status: "placeholder", categoryIds: ["layout-preview"], tools: [],
    caseStudy: {}, media: [], links: [], relatedSlugs: [],
  }],
  profile: [
    { id: "introduction", title: "Personal introduction", missing: "An owner-approved introduction is still needed.", status: "draft" },
    { id: "background", title: "Professional background", missing: "Verified education and professional background have not been supplied.", status: "draft" },
    { id: "skills", title: "Skills & capabilities", missing: "An approved skills inventory is still needed.", status: "draft" },
    { id: "experience", title: "Selected experience", missing: "Experience and permission to share it await verification.", status: "draft" },
    { id: "interests", title: "Creative & technical interests", missing: "Personal interests await owner input.", status: "draft" },
    { id: "approach", title: "Working approach", missing: "A description of the working approach awaits owner approval.", status: "draft" },
  ],
  services: [], contacts: [],
};
validateContent(content);
