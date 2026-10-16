import Link from "next/link";
import type { ReactNode } from "react";

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <header className="mb-10 max-w-3xl"><p className="eyebrow mb-5">{eyebrow}</p><h1 className="mb-6 text-4xl font-medium tracking-tight sm:text-6xl">{title}</h1><div className="text-lg leading-relaxed text-muted">{children}</div></header>;
}

export function Placeholder({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return <section className={`placeholder ${className}`}><p className="eyebrow mb-6 text-amber">Placeholder · awaiting approval</p><h2 className="mb-3 text-2xl font-medium">{title}</h2><div className="max-w-xl leading-relaxed text-muted">{children}</div></section>;
}

export function ActionLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <Link href={href} className={secondary ? "action action-secondary" : "action"}>{children}<span aria-hidden="true">↗</span></Link>;
}
