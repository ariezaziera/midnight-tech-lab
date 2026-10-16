import type { Metadata } from "next";
import { PageIntro, Placeholder } from "@/components/ui/shell";
export const metadata: Metadata = { title: "Services" };
export default function Services() {
  return <><PageIntro eyebrow="02 / Independent studio" title="Space for collaboration."><p>A future home for Arieza’s confirmed creative services.</p></PageIntro><Placeholder title="Service offerings are not confirmed yet."><p>Deliverables, scope, process and related work will be added after owner approval. No packages, pricing or booking are available in this preview.</p></Placeholder></>;
}
