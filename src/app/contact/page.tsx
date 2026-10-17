import type { Metadata } from "next";
import { ActionLink, PageIntro, Placeholder } from "@/components/ui/shell";
import { content } from "@/content/editorial";
import { isPublished, safeLink } from "@/lib/content";
export const metadata: Metadata = { title: "Contact" };
export default function Contact() {
  const methods = content.contacts.filter(method => isPublished(method) && safeLink(method.destination));
  return <><PageIntro eyebrow="03 / Contact" title="Let’s connect, soon."><p>Contact information is being prepared.</p></PageIntro>{methods.length ? <section aria-label="Verified contact methods" className="editorial-card"><h2 className="mb-6 text-2xl">Contact Arieza</h2><ul className="space-y-4">{methods.map(method => <li key={method.id}><ActionLink href={method.destination.href}>{method.destination.label}</ActionLink></li>)}</ul></section> : <Placeholder title="A verified contact destination is still needed."><p>This page is incomplete. A direct contact link will appear once the owner supplies and verifies it. There is currently no way to send an inquiry through this preview.</p><p className="mt-4">Availability has not been confirmed. No email address, phone number or social destination is published.</p></Placeholder>}</>;
}
