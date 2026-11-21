import Link from "next/link";
import type { Lang } from "@/lib/resource-i18n";

/** Selector ES / EN de los recursos. Cambia el idioma con ?lang=en (enlace compartible e indexable). */
export function LangSwitch({ lang, href }: { lang: Lang; href: string }) {
  const opt = (l: Lang, label: string, title: string) => (
    <Link
      href={l === "en" ? `${href}?lang=en` : href}
      hrefLang={l}
      aria-current={lang === l ? "true" : undefined}
      title={title}
      scroll={false}
      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
        lang === l ? "bg-accent text-white" : "text-ash hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );
  return (
    <div role="group" aria-label="Idioma / Language" className="inline-flex items-center gap-0.5 rounded-full border border-hairline bg-veil p-0.5">
      {opt("es", "ES", "Ver en español")}
      {opt("en", "EN", "View in English")}
    </div>
  );
}
