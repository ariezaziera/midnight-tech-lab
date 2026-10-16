import type { Metadata } from "next";
import { PageIntro, Placeholder } from "@/components/ui/shell";
export const metadata: Metadata = { title: "Contact" };
export default function Contact() {
  return <><PageIntro eyebrow="03 / Contact" title="Let’s connect, soon."><p>Contact information is being prepared.</p></PageIntro><Placeholder title="A verified contact destination is still needed."><p>This page is incomplete. A direct contact link will appear once the owner supplies and verifies it. There is currently no way to send an inquiry through this preview.</p></Placeholder></>;
}
