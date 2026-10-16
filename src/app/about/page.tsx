import type { Metadata } from "next";
import { PageIntro, Placeholder } from "@/components/ui/shell";
export const metadata: Metadata = { title: "About" };
export default function About() {
  return <><PageIntro eyebrow="About / The person behind the studio" title="Hello, I’m Arieza."><p>Midnight Tech Lab is a personal portfolio and solo creative-studio storefront.</p></PageIntro><div className="grid gap-8 md:grid-cols-2"><Placeholder title="Portrait pending"><p>A real portrait will appear here when supplied and approved. No substitute likeness is used.</p></Placeholder><Placeholder title="The story is being prepared."><p>Biography, experience, education and skills await verified content. A CV download will be available only after an approved file is supplied.</p></Placeholder></div></>;
}
