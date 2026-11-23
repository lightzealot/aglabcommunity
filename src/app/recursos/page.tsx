import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { LangSwitch } from "@/components/lang-switch";
import { LevelBadge, LEVEL_LABEL } from "@/components/level-badge";
import { levelOf, LEVELS } from "@/lib/resource-constants";
import { EyeCount } from "@/components/eye-count";
import { viewCounts } from "@/lib/resource-views";
import { getViewer, listPublishedResources } from "@/lib/resources";
import { getResourceTr, LANGS, langOf, langQuery, UI } from "@/lib/resource-i18n";
import { abs, orgRef, siteUrl } from "@/lib/site";

type Props = { searchParams: Promise<{ lang?: string; nivel?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const lang = langOf((await searchParams).lang);
  return {
    title: { es: "Recursos gratuitos", en: "Free AI resources", pt: "Recursos gratuitos de IA" }[lang],
    description: {
      es: "Guías, prompts y plantillas gratis para usar la inteligencia artificial y crear contenido, fotos y marca.",
      en: "Free guides, prompts and templates to use artificial intelligence to create content, photos and brand.",
      pt: "Guias, prompts e modelos grátis para usar inteligência artificial e criar conteúdo, fotos e marca.",
    }[lang],
    alternates: {
      canonical: `/recursos${langQuery(lang)}`,
      languages: { ...Object.fromEntries(LANGS.map((l) => [l, `/recursos${langQuery(l)}`])), "x-default": "/recursos" },
    },
  };
}

export default async function RecursosPage({ searchParams }: Props) {
  const sp = await searchParams;
  const lang = langOf(sp.lang);
  const nivel = (LEVELS as readonly string[]).includes(sp.nivel ?? "") ? levelOf(sp.nivel) : null;
  const t = UI[lang];
  const q = langQuery(lang);
  const pick = <T,>(o: { es: T; en: T; pt: T }) => o[lang];
  const viewer = await getViewer();
  const views = await viewCounts();
  const all = await listPublishedResources();
  const resources = all.filter((r) => !nivel || r.level === nivel).map((r) => {
    const tr = getResourceTr(r.slug, lang);
    return tr ? { ...r, title: tr.title, summary: tr.summary || r.summary } : r;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pick({ es: "Recursos gratuitos de IA", en: "Free AI resources", pt: "Recursos gratuitos de IA" }),
    url: `${siteUrl()}/recursos${q}`,
    inLanguage: lang,
    isPartOf: { "@id": `${siteUrl()}/#website` },
    publisher: orgRef(),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: resources.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: abs(`/recursos/${r.slug}${q}`),
        name: r.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="mb-4 flex justify-end">
        <LangSwitch lang={lang} href="/recursos" langs={LANGS} />
      </div>
      {viewer.kind === "visitor" ? (
        <section className="mx-auto max-w-3xl pb-8 text-center">
          <p className="label mb-2">{pick({ es: "Recursos gratuitos", en: "Free resources", pt: "Recursos gratuitos" })}</p>
          <h1 className="display text-6xl sm:text-7xl">
            {pick({ es: "Guías y plantillas para usar IA en tu trabajo", en: "Guides and templates to use AI in your work", pt: "Guias e modelos para usar IA no seu trabalho" })}
            <span className="text-accent">.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ash">
            {pick({
              es: "Lee todas las guías gratis. Para descargar los archivos, crea tu cuenta y entra a la comunidad de AG Lab.",
              en: "Read every guide for free. To download the files, create your account and join the AG Lab community.",
              pt: "Leia todos os guias grátis. Para baixar os arquivos, crie sua conta e entre para a comunidade AG Lab.",
            })}
          </p>
          <Link href="/registro" className="btn btn-primary mt-6">
            {t.create}
          </Link>
        </section>
      ) : (
        <div className="mb-6">
          <h1 className="display text-5xl">
            {pick({ es: "Recursos", en: "Resources", pt: "Recursos" })}<span className="text-accent">.</span>
          </h1>
        </div>
      )}

      <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
        <span className="label !text-ash">{pick({ es: "Nivel", en: "Level", pt: "Nível" })}</span>
        {[null, ...LEVELS].map((l) => {
          const href = `/recursos${[lang !== "es" ? `lang=${lang}` : "", l ? `nivel=${l}` : ""].filter(Boolean).map((x, i) => (i ? "&" : "?") + x).join("")}`;
          return (
            <Link
              key={l ?? "all"}
              href={href}
              scroll={false}
              aria-current={nivel === l ? "true" : undefined}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                nivel === l ? "border-accent bg-accent text-white" : "border-hairline text-ash hover:text-ink"
              }`}
            >
              {l ? LEVEL_LABEL[lang][l] : pick({ es: "Todos", en: "All", pt: "Todos" })}
            </Link>
          );
        })}
      </div>

      {resources.length === 0 ? (
        <p className="card p-10 text-center text-sm text-ash">{pick({ es: "Pronto publicaremos los primeros recursos.", en: "The first resources are coming soon.", pt: "Em breve publicaremos os primeiros recursos." })}</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <Link
              key={r.id}
              href={`/recursos/${r.slug}${q}`}
              className="card group flex flex-col overflow-hidden transition hover:shadow-md"
            >
              <div className="aspect-[16/9] bg-accent-soft">
                {r.coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.coverUrl} alt={r.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="display text-6xl text-accent">{r.title.slice(0, 1)}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <LevelBadge level={r.level} lang={lang} className="mb-2 self-start" />
                <h2 className="text-lg leading-snug font-bold group-hover:text-accent">{r.title}</h2>
                <p className="mt-1 line-clamp-3 text-sm text-ash">{r.summary}</p>
                <div className="mt-auto flex items-center justify-between pt-3 text-xs">
                  <span className="font-semibold text-accent">{r.files > 0 ? t.filesForDownload(r.files) : t.guide}</span>
                  <EyeCount n={views.get(r.id) ?? 0} className="text-hollow" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
