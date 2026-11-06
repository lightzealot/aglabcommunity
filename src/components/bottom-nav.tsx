"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type IconName = "home" | "file" | "news" | "course" | "people";
type Item = { href: string; label: string; icon: IconName; also?: string[] };
type Right = { href: string; label: string; image?: string | null; name?: string };

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Icon({ name }: { name: IconName }) {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" aria-hidden {...S}>
      {name === "home" && <path d="M3 11.5 12 4l9 7.5M5.5 10v9.5h13V10M10 19.5v-5h4v5" />}
      {name === "file" && <path d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5" />}
      {name === "news" && <path d="M5 4h11v16H7a2 2 0 0 1-2-2zM16 8h3v10a2 2 0 0 1-2 2M8 8h5M8 12h5M8 16h3" />}
      {name === "course" && <path d="M3 9 12 5l9 4-9 4zM7 11.5V16c0 1.2 2.2 2.5 5 2.5s5-1.3 5-2.5v-4.5" />}
      {name === "people" && <path d="M9 11a3.2 3.2 0 1 0 0-6.4A3.2 3.2 0 0 0 9 11zM3 19c.5-3 3-4.8 6-4.8s5.5 1.8 6 4.8M16 5.2a3.2 3.2 0 0 1 0 5.8M17.5 14.5c2 .5 3.3 2 3.6 4.5" />}
    </svg>
  );
}

/** Menú inferior flotante para celular: inicio · secciones · cuenta. */
export function BottomNav({ items, right }: { items: Item[]; right: Right }) {
  const pathname = usePathname();
  const active = (i: Item) =>
    i.href === "/"
      ? pathname === "/"
      : pathname === i.href || pathname.startsWith(i.href + "/") || (i.also ?? []).some((a) => pathname.startsWith(a));
  const [home, ...rest] = items;

  return (
    <nav
      aria-label="Menú principal"
      className="fixed left-3 right-3 z-50 flex items-center gap-2 md:hidden"
      style={{ bottom: "max(12px, env(safe-area-inset-bottom))", transform: "translateZ(0)", WebkitTransform: "translateZ(0)" }}
    >
      <Link
        href={home.href}
        aria-label={home.label}
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-hairline bg-paper shadow-lg ${active(home) ? "text-accent" : "text-ash"}`}
      >
        <Icon name={home.icon} />
      </Link>

      <div className="flex h-12 min-w-0 flex-1 items-center justify-around overflow-hidden rounded-full border border-hairline bg-paper px-1 shadow-lg">
        {rest.map((i) => {
          const on = active(i);
          return (
            <Link
              key={i.href}
              href={i.href}
              aria-label={i.label}
              aria-current={on ? "page" : undefined}
              className={`flex h-10 min-w-0 items-center gap-1 rounded-full px-2.5 text-[13px] font-semibold whitespace-nowrap ${on ? "bg-veil text-ink" : "text-ash"}`}
            >
              <Icon name={i.icon} />
              {on && <span>{i.label}</span>}
            </Link>
          );
        })}
      </div>

      {right.image ? (
        <Link
          href={right.href}
          aria-label={right.label}
          className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-hairline bg-paper shadow-lg"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={right.image} alt="" className="h-full w-full object-cover" />
        </Link>
      ) : right.name ? (
        <Link
          href={right.href}
          aria-label={right.label}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-hairline bg-accent-soft text-sm font-semibold text-accent shadow-lg"
        >
          {right.name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("")}
        </Link>
      ) : (
        <Link
          href={right.href}
          aria-label={right.label}
          className="flex h-12 shrink-0 items-center justify-center rounded-full border border-hairline bg-paper px-4 text-[13px] font-semibold whitespace-nowrap shadow-lg"
        >
          {right.label}
        </Link>
      )}
    </nav>
  );
}
