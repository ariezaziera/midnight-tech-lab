import { ActionLink } from "@/components/ui/shell";
import { StudioPreview } from "@/components/studio/studio-preview";

export default function Home() {
  return <>
    <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.3fr]">
      <section><p className="eyebrow mb-7 text-violet">Arieza / Midnight Tech Lab</p><h1 className="max-w-3xl text-5xl font-medium leading-[1.07] tracking-tight sm:text-7xl">A space for<br />work &amp; ideas.</h1><p className="mt-7 max-w-lg text-lg leading-relaxed text-muted">A portfolio and independent creative studio, taking shape. Explore the page previews while verified work and personal content are prepared.</p><div className="mt-9 flex flex-wrap gap-4"><ActionLink href="/projects">Explore projects</ActionLink><ActionLink href="/about" secondary>About Arieza</ActionLink></div></section>
      <StudioPreview />
    </div>
    <section className="mt-20 border-t border-white/15 pt-8"><p className="eyebrow mb-7 text-muted">Explore the portfolio</p><div className="grid gap-8 md:grid-cols-3">{[
      { n: "01", title: "Projects", text: "A place for verified work and the process behind it.", href: "/projects" },
      { n: "02", title: "Services", text: "Offerings and scope will appear here once confirmed.", href: "/services" },
      { n: "03", title: "Contact", text: "Contact details are awaiting verification.", href: "/contact" },
    ].map(item => <div key={item.n}><p className="mb-3 text-sm text-violet">{item.n}</p><h2 className="mb-3 text-2xl">{item.title}</h2><p className="mb-5 leading-relaxed text-muted">{item.text}</p><ActionLink href={item.href} secondary>View {item.title.toLowerCase()}</ActionLink></div>)}</div></section>
  </>;
}
