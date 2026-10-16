import { ActionLink, PageIntro } from "@/components/ui/shell";
export default function NotFound() {
  return <><PageIntro eyebrow="404 / Page not found" title="This page isn’t here."><p>The address may be incorrect, or the content is not available.</p></PageIntro><div className="flex flex-wrap gap-4"><ActionLink href="/">Return home</ActionLink><ActionLink href="/projects" secondary>Browse projects</ActionLink></div></>;
}
