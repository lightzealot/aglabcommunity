import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { LangSwitch } from "@/components/lang-switch";
import { EyeCount } from "@/components/eye-count";
import { viewCounts } from "@/lib/resource-views";
import { getViewer, listPublishedResources } from "@/lib/resources";
import { getResourceEn, langOf, UI } from "@/lib/resource-i18n";
import { abs, orgRef, siteUrl } from "@/lib/site";

type Props = { searchParams: Promise<{ lang?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const en = langOf((await searchParams).lang) === "en";
  return {
    title: en ? "Free AI resources" : "Recursos gratuitos",
    description: en
      ? "Free guides, prompts and templates to use artificial intelligence to create content, photos and brand."
      : "Guías, prompts y plantillas gratis para usar la inteligencia artificial y crear contenido, fotos y marca.",
    alternates: { canonical: en ? "/recursos?lang=en" : "/recursos", languages: { es: "/recursos", en: "/recursos?lang=en", "x-default": "/recursos" } },
  };
}

export default async function RecursosPage({ searchParams }: Props) {
  const lang = langOf((await searchParams).lang);
  const t = UI[lang];
  const q = lang === "en" ? "?lang=en" : "";
  const viewer = await getViewer();
  const views = await viewCounts();
  const resources = (await listPublishedResources()).map((r) => {
    const en = lang === "en" ? getResourceEn(r.slug) : null;
    return en ? { ...r, title: en.title, summary: en.summary || r.summary } : r;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: lang === "en" ? "Free AI resources" : "Recursos gratuitos de IA",
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
        <LangSwitch lang={lang} href="/recursos" />
      </div>
      {viewer.kind === "visitor" ? (
        <section className="mx-auto max-w-3xl pb-8 text-center">
          <p className="label mb-2">{lang === "en" ? "Free resources" : "Recursos gratuitos"}</p>
          <h1 className="display text-6xl sm:text-7xl">
            {lang === "en" ? "Guides and templates to use AI in your work" : "Guías y plantillas para usar IA en tu trabajo"}
            <span className="text-accent">.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ash">
            {lang === "en"
              ? "Read every guide for free. To download the files, create your account and join the AG Lab community."
              : "Lee todas las guías gratis. Para descargar los archivos, crea tu cuenta y entra a la comunidad de AG Lab."}
          </p>
          <Link href="/registro" className="btn btn-primary mt-6">
            {t.create}
          </Link>
        </section>
      ) : (
        <div className="mb-6">
          <h1 className="display text-5xl">
            {lang === "en" ? "Resources" : "Recursos"}<span className="text-accent">.</span>
          </h1>
        </div>
      )}

      {resources.length === 0 ? (
        <p className="card p-10 text-center text-sm text-ash">{lang === "en" ? "The first resources are coming soon." : "Pronto publicaremos los primeros recursos."}</p>
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
