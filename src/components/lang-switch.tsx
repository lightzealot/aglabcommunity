import Link from "next/link";
import { langQuery, type Lang } from "@/lib/resource-i18n";

const LABEL: Record<Lang, [string, string]> = {
  es: ["ES", "Ver en español"],
  en: ["EN", "View in English"],
  pt: ["PT", "Ver em português"],
};

/** Selector de idioma de los recursos (ES / EN / PT). Cambia con ?lang=xx (enlace compartible e indexable). */
export function LangSwitch({ lang, href, langs }: { lang: Lang; href: string; langs: Lang[] }) {
  if (langs.length < 2) return null;
  return (
    <div role="group" aria-label="Idioma / Language" className="inline-flex items-center gap-0.5 rounded-full border border-hairline bg-veil p-0.5">
      {langs.map((l) => (
        <Link
          key={l}
          href={`${href}${langQuery(l)}`}
          hrefLang={l}
          aria-current={lang === l ? "true" : undefined}
          title={LABEL[l][1]}
          scroll={false}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
            lang === l ? "bg-accent text-white" : "text-ash hover:text-ink"
          }`}
        >
          {LABEL[l][0]}
        </Link>
      ))}
    </div>
  );
}
