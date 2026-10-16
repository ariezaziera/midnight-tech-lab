import type { Metadata } from "next";
import { ActionLink, PageIntro, Placeholder } from "@/components/ui/shell";
export const metadata: Metadata = { title: "Projects" };
export default function Projects() {
  return <><PageIntro eyebrow="01 / Projects" title="Work, with context."><p>Verified projects and their stories will live here.</p></PageIntro><Placeholder title="No approved projects yet."><p>Project descriptions, images, roles and links are awaiting owner approval. The preview below demonstrates the page structure only; it is not a real project.</p><div className="mt-7"><ActionLink href="/projects/placeholder">View placeholder case study</ActionLink></div></Placeholder></>;
}
