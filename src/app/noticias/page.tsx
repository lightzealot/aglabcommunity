import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { NewsCover } from "@/components/news-cover";
import { dayLabel, excerpt } from "@/lib/news-format";
import { listNews } from "@/lib/news";
import { abs, orgRef, siteUrl } from "@/lib/site";
import { dateKey } from "@/lib/streak";

export const metadata: Metadata = {
  title: "Noticias de IA al día",
  description:
    "Una noticia de inteligencia artificial al día, explicada en español para que le saques provecho en tu trabajo y tu negocio.",
};

export default async function NoticiasPage({ searchParams }: { searchParams: Promise<{ todas?: string }> }) {
  const { todas } = await searchParams;
  const items = await listNews();
  const today = dateKey();
  const [featured, ...older] = items;
  const shown = todas ? older : older.slice(0, 12);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Noticias de IA al día",
    url: `${siteUrl()}/noticias`,
    inLanguage: "es",
    isPartOf: { "@id": `${siteUrl()}/#website` },
    publisher: orgRef(),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.slice(0, 30).map((n, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: abs(`/noticias/${n.day}`),
        name: n.title,
      })),
    },
  };

  return (
    <div className="mx-auto max-w-6xl">
      <JsonLd data={jsonLd} />
      <div className="mb-6">
        <h1 className="display text-5xl">
          Noticias<span className="text-accent">.</span>
        </h1>
        <p className="mt-2 text-sm text-ash">Una noticia de IA al día, explicada para que le saques provecho.</p>
      </div>

      {!featured ? (
        <p className="card p-10 text-center text-sm text-ash">La primera noticia destacada aparecerá en unos minutos.</p>
      ) : (
        <>
          <article className="card grid overflow-hidden lg:grid-cols-[1.15fr_1fr]">
            <NewsCover day={featured.day} label={dayLabel(featured.day)} fill />
            <div className="p-6 lg:p-8">
              <p className="label !text-ash">
                {featured.day === today ? "Noticia destacada de hoy" : `Destacada · ${dayLabel(featured.day)}`}
              </p>
              <h2 className="mt-2 text-2xl leading-snug font-bold sm:text-3xl">
                <Link href={`/noticias/${featured.day}`} className="hover:text-accent">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-prose leading-relaxed text-ash">{excerpt(featured.summary, 280)}</p>
              <Link href={`/noticias/${featured.day}`} className="mt-5 inline-block text-sm font-semibold text-accent">
                Leer la noticia →
              </Link>
            </div>
          </article>

          {older.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-3 text-sm font-semibold text-ash">Anteriores</h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((n) => (
                  <li key={n.id}>
                    <Link href={`/noticias/${n.day}`} className="card group flex h-full flex-col overflow-hidden transition hover:shadow-md">
                      <NewsCover day={n.day} label={dayLabel(n.day)} compact />
                      <span className="flex flex-1 flex-col p-4">
                        <span className="block text-lg leading-snug font-semibold group-hover:text-accent">{n.title}</span>
                        <span className="mt-1 block text-sm text-ash">{excerpt(n.summary, 120)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              {older.length > 12 && (
                <p className="mt-5 text-center">
                  <Link href={todas ? "/noticias" : "/noticias?todas=1"} className="btn btn-ghost">
                    {todas ? "Ver menos" : `Ver todas (${older.length})`}
                  </Link>
                </p>
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
}
