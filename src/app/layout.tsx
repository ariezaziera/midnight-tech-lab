import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/navigation/global-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Midnight Tech Lab — Local preview", template: "%s | Midnight Tech Lab" },
  description: "A local foundation preview for Arieza’s portfolio. Content and visual design are provisional.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="min-h-screen antialiased">
    <a href="#main-content" className="skip-link">Skip to content</a>
    <div className="border-b border-white/10 px-6 py-2 text-center text-xs leading-relaxed text-muted">Local preview · Placeholder content · Provisional design</div>
    <header className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-6 sm:px-10">
      <Link href="/" className="text-sm font-semibold tracking-[.16em]">MIDNIGHT TECH LAB<span className="mt-1 block text-xs font-normal tracking-normal text-muted">Arieza / Independent creative studio</span></Link>
      <GlobalNav />
    </header>
    <main id="main-content" tabIndex={-1} className="mx-auto min-h-[65vh] max-w-7xl px-6 py-12 sm:px-10 sm:py-20">{children}</main>
    <footer className="mx-auto mt-12 flex max-w-7xl flex-wrap justify-between gap-4 border-t border-white/15 px-6 py-8 text-sm text-muted sm:px-10"><p>Midnight Tech Lab / Arieza</p><p>Work in progress. Authentic content is being prepared.</p></footer>
  </body></html>;
}
