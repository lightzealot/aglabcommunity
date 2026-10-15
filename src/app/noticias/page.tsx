import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { NewsCover } from "@/components/news-cover";
import { dayLabel, excerpt, paragraphs } from "@/lib/news-format";
import { listNews } from "@/lib/news";
import { abs, orgRef, siteUrl } from "@/lib/site";
import { dateKey } from "@/lib/streak";

export const metadata: Metadata = {
  title: "Noticias de IA al día",
  description:
    "Una noticia de inteligencia artificial al día, explicada en español para que le saques provecho en tu trabajo y tu negocio.",
};

export default async function NoticiasPage() {
  const items = await listNews();
  const today = dateKey();
  const [featured, ...older] = items;

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
    <div className="mx-auto max-w-3xl">
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
          <article className="card overflow-hidden">
            <NewsCover day={featured.day} label={dayLabel(featured.day)} />
            <div className="p-6">
              <p className="label !text-ash">
                {featured.day === today ? "Noticia destacada de hoy" : `Destacada · ${dayLabel(featured.day)}`}
              </p>
              <h2 className="mt-2 text-2xl leading-snug font-bold sm:text-3xl">
                <Link href={`/noticias/${featured.day}`} className="hover:text-accent">
                  {featured.title}
                </Link>
              </h2>
              <div className="mt-4 space-y-3 text-ash">
                {paragraphs(featured.summary).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <Link href={`/noticias/${featured.day}`} className="mt-5 inline-block text-sm font-semibold text-accent">
                Abrir esta noticia →
              </Link>
            </div>
          </article>

          {older.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-3 text-sm font-semibold text-ash">Anteriores</h2>
              <ul className="space-y-3">
                {older.map((n) => (
                  <li key={n.id}>
                    <Link href={`/noticias/${n.day}`} className="card group block p-4 transition hover:shadow-md">
                      <p className="label !text-ash">{dayLabel(n.day)}</p>
                      <span className="mt-0.5 block text-lg leading-snug font-semibold group-hover:text-accent">{n.title}</span>
                      <span className="mt-1 block text-sm text-ash">{excerpt(n.summary, 180)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}
