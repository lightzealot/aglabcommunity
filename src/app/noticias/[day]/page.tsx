import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { NewsCover } from "@/components/news-cover";
import { getNewsByDay, getNewsNeighbours } from "@/lib/news";
import { dayLabel, excerpt, isDayKey, paragraphs } from "@/lib/news-format";
import { getViewer } from "@/lib/resources";
import { abs, orgRef, siteUrl } from "@/lib/site";
import { removeNews } from "../actions";

type Props = { params: Promise<{ day: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { day } = await params;
  const n = isDayKey(day) ? await getNewsByDay(day) : null;
  if (!n) return { title: "Noticia no encontrada", robots: { index: false } };
  const description = excerpt(n.summary);
  return {
    title: n.title,
    description,
    openGraph: {
      title: n.title,
      description,
      type: "article",
      publishedTime: n.createdAt.toISOString(),
      modifiedTime: n.createdAt.toISOString(),
      section: "Inteligencia artificial",
      locale: "es_ES",
    },
    twitter: { card: "summary_large_image", title: n.title, description },
  };
}

export default async function NoticiaPage({ params }: Props) {
  const { day } = await params;
  if (!isDayKey(day)) notFound();
  const n = await getNewsByDay(day);
  if (!n) notFound();
  const [{ prev, next }, viewer] = await Promise.all([getNewsNeighbours(day), getViewer()]);
  const isAdmin = viewer.kind === "member" && viewer.user.role === "admin";
  const url = `${siteUrl()}/noticias/${n.day}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "@id": `${url}#article`,
      mainEntityOfPage: url,
      url,
      headline: n.title,
      description: excerpt(n.summary, 300),
      articleBody: n.summary,
      image: [abs(`/noticias/${n.day}/opengraph-image`)],
      datePublished: n.createdAt.toISOString(),
      dateModified: n.createdAt.toISOString(),
      inLanguage: "es",
      articleSection: "Inteligencia artificial",
      author: orgRef(),
      publisher: orgRef(),
      isPartOf: { "@id": `${siteUrl()}/#website` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: abs("/") },
        { "@type": "ListItem", position: 2, name: "Noticias", item: abs("/noticias") },
        { "@type": "ListItem", position: 3, name: n.title, item: url },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-3xl pb-16 md:pb-0">
      <JsonLd data={jsonLd} />
      <Link href="/noticias" className="text-sm text-ash hover:text-ink">
        ← Todas las noticias
      </Link>

      <article className="card mt-4 overflow-hidden">
        <NewsCover day={n.day} label={dayLabel(n.day)} />
        <div className="p-6">
          <p className="label !text-ash">
            <time dateTime={n.day}>{dayLabel(n.day)}</time>
          </p>
          <h1 className="mt-2 text-2xl leading-snug font-bold sm:text-4xl">{n.title}</h1>
          <div className="mt-4 space-y-3 text-ash">
            {paragraphs(n.summary).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {isAdmin && (
            <form action={removeNews} className="mt-5 text-right">
              <input type="hidden" name="id" value={n.id} />
              <button type="submit" className="text-xs font-semibold text-hollow hover:text-accent">
                Quitar
              </button>
            </form>
          )}
        </div>
      </article>

      {(prev || next) && (
        <nav className="mt-6 grid gap-3 sm:grid-cols-2" aria-label="Más noticias">
          {prev ? (
            <Link href={`/noticias/${prev.day}`} className="card p-4 text-sm hover:shadow-md">
              <span className="label !text-ash">← Anterior</span>
              <span className="mt-0.5 block font-semibold">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/noticias/${next.day}`} className="card p-4 text-sm hover:shadow-md sm:text-right">
              <span className="label !text-ash">Siguiente →</span>
              <span className="mt-0.5 block font-semibold">{next.title}</span>
            </Link>
          )}
        </nav>
      )}

      {viewer.kind === "visitor" && (
        <section className="card mt-8 border-accent bg-accent-soft/40 p-6">
          <h2 className="display text-3xl">
            Aprende a aplicarlo en tu negocio<span className="text-accent">.</span>
          </h2>
          <p className="mt-2 text-sm text-ash">
            En AG Lab, la comunidad gratis de Andrés Gómez, convertimos estas novedades en automatizaciones y procesos reales.
          </p>
          <Link href="/registro" className="btn btn-primary mt-4">
            Crear mi cuenta gratis
          </Link>
        </section>
      )}
    </div>
  );
}
