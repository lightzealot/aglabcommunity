"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const TABS = [
  { href: "/", label: "Comunidad", also: ["/post"] },
  { href: "/classroom", label: "Cursos", also: [] },
  { href: "/recursos", label: "Recursos", also: [] },
  { href: "/noticias", label: "Noticias", also: [] },
  { href: "/calendario", label: "Calendario", also: [] },
  { href: "/miembros", label: "Miembros", also: ["/u"] },
  { href: "/ranking", label: "Clasificación", also: [] },
  { href: "/acerca", label: "Acerca de", also: [] },
];

export function NavTabs() {
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const [more, setMore] = useState({ left: false, right: false });
  const isActive = (t: (typeof TABS)[number]) =>
    t.href === "/"
      ? pathname === "/" || t.also.some((a) => pathname.startsWith(a))
      : pathname === t.href || pathname.startsWith(t.href + "/") || t.also.some((a) => pathname.startsWith(a));

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setMore({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    update();
    // Deja a la vista la pestaña activa.
    ref.current?.querySelector<HTMLElement>('[aria-current="page"]')?.scrollIntoView({ inline: "center", block: "nearest" });
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update, pathname]);

  const nudge = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * 160, behavior: "smooth" });

  return (
    <div className="relative mx-auto max-w-6xl">
      <nav
        ref={ref}
        onScroll={update}
        className="flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Secciones"
      >
        {TABS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            aria-current={isActive(t) ? "page" : undefined}
            className={`border-b-2 px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
              isActive(t) ? "border-ink text-ink" : "border-transparent text-hollow hover:text-ink"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </nav>
      {more.left && (
        <button
          type="button"
          aria-label="Ver secciones anteriores"
          onClick={() => nudge(-1)}
          className="absolute top-0 left-0 flex h-full w-10 items-center justify-start bg-gradient-to-r from-paper via-paper/90 to-transparent pl-1.5 text-ash"
        >
          ‹
        </button>
      )}
      {more.right && (
        <button
          type="button"
          aria-label="Ver más secciones"
          onClick={() => nudge(1)}
          className="absolute top-0 right-0 flex h-full w-12 items-center justify-end bg-gradient-to-l from-paper via-paper/90 to-transparent pr-2 text-lg font-bold text-ink"
        >
          <span className="animate-pulse">›</span>
        </button>
      )}
    </div>
  );
}
