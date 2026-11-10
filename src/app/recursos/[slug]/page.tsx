import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LockIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { GoogleButton } from "@/components/google-button";
import { RichText } from "@/components/rich-text";
import { SourceCookie } from "@/components/source-cookie";
import { isGoogleEnabled } from "@/lib/google";
import { teaser } from "@/lib/resource-teaser";
import { excerpt } from "@/lib/news-format";
import { getResourceBySlug, getViewer } from "@/lib/resources";
import { abs, orgRef, siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ welcome?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = await getResourceBySlug(slug);
  if (!r) return { title: "Recurso no encontrado" };
  const description = r.summary || excerpt(r.body) || undefined;
  return {
    title: r.title,
    description,
    openGraph: {
      title: r.title,
      description,
      type: "article",
      publishedTime: r.createdAt.toISOString(),
      section: "Recursos de IA",
      locale: "es_ES",
      images: r.coverUrl ? [abs(r.coverUrl)] : undefined,
    },
    twitter: { card: "summary_large_image", title: r.title, description },
  };
}

const mb = (n: number) => (n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`);

export default async function RecursoPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { welcome } = await searchParams;
  const viewer = await getViewer();
  const isAdmin = viewer.kind === "member" && viewer.user.role === "admin";
  const r = await getResourceBySlug(slug, isAdmin);
  if (!r) notFound();

  const canDownload = viewer.kind !== "visitor";
  const preview = viewer.kind === "visitor";
  const shownBody = preview ? teaser(r.body) : r.body;
  const url = `${siteUrl()}/recursos/${r.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      mainEntityOfPage: url,
      url,
      headline: r.title,
      description: r.summary || excerpt(r.body, 300),
      articleBody: teaser(r.body) || undefined,
      image: r.coverUrl ? [abs(r.coverUrl)] : undefined,
      datePublished: r.createdAt.toISOString(),
      dateModified: r.createdAt.toISOString(),
      inLanguage: "es",
      isAccessibleForFree: true,
      author: orgRef(),
      publisher: orgRef(),
      isPartOf: { "@id": `${siteUrl()}/#website` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: abs("/") },
        { "@type": "ListItem", position: 2, name: "Recursos", item: abs("/recursos") },
        { "@type": "ListItem", position: 3, name: r.title, item: url },
      ],
    },
  ];

  return (
    <article className="mx-auto max-w-3xl pb-16 md:pb-0">
      {r.published && <JsonLd data={jsonLd} />}
      {viewer.kind === "visitor" && <SourceCookie slug={r.slug} />}

      <Link href="/recursos" className="text-sm text-ash hover:text-ink">
        ← Todos los recursos
      </Link>

      {!r.published && <p className="label mt-3 !text-ash">Borrador (solo lo ves tú)</p>}

      {r.coverUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={r.coverUrl} alt={r.title} className="mt-4 aspect-[16/9] w-full rounded-lg border border-hairline object-cover" />
      )}

      <h1 className="display mt-5 text-5xl sm:text-6xl">
        {r.title}
        <span className="text-accent">.</span>
      </h1>
      {r.summary && <p className="mt-3 text-lg text-ash">{r.summary}</p>}

      {welcome === "1" && viewer.kind === "lead" && (
        <div className="card mt-5 border-accent bg-accent-soft/40 p-4 text-sm">
          <p className="font-semibold">¡Listo, tu cuenta está creada!</p>
          <p className="mt-1 text-ash">
            Ya puedes descargar los archivos de abajo.{" "}
            <Link href={"/gracias"} className="font-semibold text-accent underline">
              Crea tu tarjeta de miembro
            </Link>
            .
          </p>
        </div>
      )}

      {shownBody && (
        <div className={`relative mt-8 ${preview ? "max-h-72 overflow-hidden" : ""}`}>
          <div className={preview ? "select-none blur-[3px]" : ""} aria-hidden={preview || undefined}>
            <RichText text={shownBody} />
          </div>
          {preview && <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-paper/70 to-paper" />}
        </div>
      )}

      {preview && (
        <section className="card relative z-10 -mt-10 p-6" id="unete">
          <p className="label mb-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 !text-accent">
            <LockIcon size={14} /> Guía gratis
          </p>
          <h2 className="display text-4xl">
            Únete a la comunidad<span className="text-accent">.</span>
          </h2>
          <p className="mt-2 mb-5 text-sm text-ash">
            Entra con tu cuenta de Google y la guía se abre aquí mismo. Te sirve para todas las guías.
          </p>
          {isGoogleEnabled() ? (
            <>
              <GoogleButton callbackURL={`/recursos/${r.slug}?welcome=1`} divider={false} />
              <Link href={`/registro?from=${r.slug}`} className="mt-3 block text-center text-sm text-ash underline">
                Prefiero registrarme con mi correo
              </Link>
            </>
          ) : (
            <Link href={`/registro?from=${r.slug}`} className="btn btn-primary w-full">Crear mi cuenta gratis</Link>
          )}
          <p className="mt-4 text-sm text-ash">
            ¿Ya tienes cuenta?{" "}
            <Link href={`/login?next=/recursos/${r.slug}`} className="font-semibold text-accent">Entrar</Link>
          </p>
        </section>
      )}

      {!preview && r.files.length > 0 && (
        <section className="card mt-8 p-5">
          <h2 className="font-semibold">Archivos para descargar</h2>
          <ul className="mt-3 divide-y divide-hairline">
            {r.files.map((f) => (
              <li key={f.id} className="flex items-center gap-3 py-2.5 text-sm">
                {canDownload ? (
                  <a href={`/api/resource-files/${f.id}`} className="flex-1 truncate font-semibold text-accent underline">
                    ⬇ {f.name}
                  </a>
                ) : (
                  <span className="flex flex-1 items-center gap-2 truncate text-ash">
                    <LockIcon size={15} /> {f.name}
                  </span>
                )}
                <span className="shrink-0 text-xs text-hollow">{mb(f.size)}</span>
              </li>
            ))}
          </ul>
          {!canDownload && (
            <p className="mt-3 text-sm text-ash">
              Para descargar estos archivos crea tu cuenta gratis: toma menos de un minuto.
            </p>
          )}
        </section>
      )}

      {viewer.kind === "lead" && welcome !== "1" && (
        <div className="card mt-8 p-5 text-sm">
          <p className="font-semibold">Crea tu tarjeta de miembro</p>
          <Link href={"/gracias"} className="btn btn-primary mt-3 !py-2">
            {"Mi tarjeta"}
          </Link>
        </div>
      )}

    </article>
  );
}
