"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Comunidad", also: ["/post"] },
  { href: "/classroom", label: "Cursos", also: [] },
  { href: "/recursos", label: "Recursos", also: [] },
  { href: "/calendario", label: "Calendario", also: [] },
  { href: "/miembros", label: "Miembros", also: ["/u"] },
  { href: "/ranking", label: "Clasificación", also: [] },
  { href: "/acerca", label: "Acerca de", also: [] },
];

export function NavTabs() {
  const pathname = usePathname();
  const isActive = (t: (typeof TABS)[number]) =>
    t.href === "/"
      ? pathname === "/" || t.also.some((a) => pathname.startsWith(a))
      : pathname === t.href || pathname.startsWith(t.href + "/") || t.also.some((a) => pathname.startsWith(a));

  return (
    <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4" aria-label="Secciones">
      {TABS.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          className={`border-b-2 px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
            isActive(t) ? "border-ink text-ink" : "border-transparent text-hollow hover:text-ink"
          }`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
