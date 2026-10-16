"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";

export function GlobalNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation" className="flex flex-wrap gap-1">
      {navigation.map(({ href, label }) => {
        const current = href === "/" ? pathname === href : pathname.startsWith(href + "/") || pathname === href;
        return <Link key={href} href={href} aria-current={current ? "page" : undefined} className="nav-link">{label}</Link>;
      })}
    </nav>
  );
}
