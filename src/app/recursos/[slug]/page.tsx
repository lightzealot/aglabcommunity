import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LockIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { LangSwitch } from "@/components/lang-switch";
import { GoogleButton } from "@/components/google-button";
import { RichText } from "@/components/rich-text";
import { SourceCookie } from "@/components/source-cookie";
import { isGoogleEnabled } from "@/lib/google";
import { excerpt } from "@/lib/news-format";
import { EyeCount } from "@/components/eye-count";
import { recordResourceView, viewCounts } from "@/lib/resource-views";
import { getResourceBySlug, getViewer, listPublishedResources } from "@/lib/resources";
import { headings, promptCount, readMinutes } from "@/lib/resource-meta";
import { getResourceEn, langOf, UI } from "@/lib/resource-i18n";
import { abs, orgRef, siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ welcome?: string; lang?: string }> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const base = await getResourceBySlug(slug);
  if (!base) return { title: "Recurso no encontrado" };
  const en = getResourceEn(slug);
  const lang = en ? langOf((await searchParams).lang) : "es";
  const r = lang === "en" && en ? { ...base, ...en } : base;
  const description = r.summary || excerpt(r.body) || undefined;
  const path = `/recursos/${slug}`;
  return {
    title: r.title,
    description,
    alternates: en
      ? { canonical: lang === "en" ? `${path}?lang=en` : path, languages: { es: path, en: `${path}?lang=en`, "x-default": path } }
      : undefined,
    openGraph: {
      title: r.title,
      description,
      type: "article",
      publishedTime: r.createdAt.toISOString(),
      section: lang === "en" ? "AI resources" : "Recursos de IA",
      locale: lang === "en" ? "en_US" : "es_ES",
      images: r.coverUrl ? [abs(r.coverUrl)] : undefined,
    },
    twitter: { card: "summary_large_image", title: r.title, description },
  };
}

const mb = (n: number) => (n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`);

export default async function RecursoPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { welcome, lang: langParam } = await searchParams;
  const viewer = await getViewer();
  const isAdmin = viewer.kind === "member" && viewer.user.role === "admin";
  const base = await getResourceBySlug(slug, isAdmin);
  if (!base) notFound();
  await recordResourceView(base.id, viewer.kind === "member" ? viewer.user.id : undefined);
  const views = (await viewCounts()).get(base.id) ?? 0;
  const en = getResourceEn(slug);
  const lang = en ? langOf(langParam) : "es";
  const r = lang === "en" && en ? { ...base, ...en } : base;
  const t = UI[lang];
  const q = lang === "en" ? "?lang=en" : "";

  // La guía se lee completa sin cuenta; solo la descarga de archivos pide registrarse (opcional, con beneficios).
  const visitor = viewer.kind === "visitor";
  const toc = headings(r.body);
  const prompts = promptCount(r.body);
  const related = (await listPublishedResources())
    .filter((x) => x.slug !== r.slug)
    .slice(0, 2)
    .map((x) => (lang === "en" ? { ...x, title: getResourceEn(x.slug)?.title ?? x.title } : x));
  const url = `${siteUrl()}/recursos/${r.slug}${q}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      mainEntityOfPage: url,
      url,
      headline: r.title,
      description: r.summary || excerpt(r.body, 300),
      articleBody: excerpt(r.body, 5000) || undefined,
      image: r.coverUrl ? [abs(r.coverUrl)] : undefined,
      datePublished: r.createdAt.toISOString(),
      dateModified: r.createdAt.toISOString(),
      inLanguage: lang,
      isAccessibleForFree: true,
      author: orgRef(),
      publisher: orgRef(),
      isPartOf: { "@id": `${siteUrl()}/#website` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: abs("/") },
        { "@type": "ListItem", position: 2, name: lang === "en" ? "Resources" : "Recursos", item: abs(`/recursos${q}`) },
        { "@type": "ListItem", position: 3, name: r.title, item: url },
      ],
    },
  ];

  return (
    <article lang={lang} className="mx-auto max-w-3xl pb-16 md:pb-0">
      {r.published && <JsonLd data={jsonLd} />}
      {visitor && <SourceCookie slug={r.slug} />}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href={`/recursos${q}`} className="text-sm text-ash hover:text-ink">
          {t.back}
        </Link>
        {en && <LangSwitch lang={lang} href={`/recursos/${r.slug}`} />}
      </div>

      {!r.published && <p className="label mt-3 !text-ash">{t.draft}</p>}

      <p className="label mt-5">{t.kicker}</p>
      <h1 className="display mt-2 text-5xl sm:text-6xl">
        {r.title}
        <span className="text-accent">.</span>
      </h1>
      {r.summary && <p className="mt-3 text-lg text-ash">{r.summary}</p>}

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ash">
        <span className="font-semibold text-ink">Andrés Gómez</span>
        <span aria-hidden>·</span>
        <span>{r.createdAt.toLocaleDateString(t.dateLocale, { day: "numeric", month: "short", year: "numeric" })}</span>
        <span aria-hidden>·</span>
        <span>{readMinutes(r.body)} {t.readMin}</span>
        {views > 0 && (
          <>
            <span aria-hidden>·</span>
            <EyeCount n={views} />
          </>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {prompts > 0 && (
          <span className="rounded-full border border-hairline bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
            {prompts} {t.prompt(prompts)}
          </span>
        )}
        {r.files.length > 0 && (
          <span className="rounded-full border border-hairline bg-veil px-3 py-1 text-xs font-semibold text-ash">
            {r.files.length} {t.file(r.files.length)}
          </span>
        )}
        <span className="rounded-full border border-hairline bg-veil px-3 py-1 text-xs font-semibold text-ash">{t.free}</span>
      </div>

      {r.coverUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={r.coverUrl} alt={r.title} className="mt-6 aspect-[16/9] w-full rounded-lg border border-hairline object-cover" />
      )}

      {toc.length > 1 && (
        <nav aria-label={t.toc} className="card mt-6 p-4">
          <p className="label !text-ash">{t.toc}</p>
          <ol className="mt-2 space-y-1 text-sm">
            {toc.map((h, i) => (
              <li key={h.id}>
                <a href={`#${h.id}`} className="flex gap-2 py-0.5 hover:text-accent">
                  <span className="font-mono text-xs text-hollow">{String(i + 1).padStart(2, "0")}</span>
                  <span>{h.text}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {welcome === "1" && viewer.kind === "lead" && (
        <div className="card mt-5 border-accent bg-accent-soft/40 p-4 text-sm">
          <p className="font-semibold">{t.welcomeTitle}</p>
          <p className="mt-1 text-ash">
            {t.welcomeBody}{" "}
            <Link href={"/gracias"} className="font-semibold text-accent underline">
              {t.welcomeCard}
            </Link>
            .
          </p>
        </div>
      )}

      {r.body && (
        <div className="mt-8">
          <RichText text={r.body} numbered copyLabels={{ copy: t.copy, copied: t.copied, fallback: t.copyFallback }} />
        </div>
      )}

      {visitor && (
        <section className="card mt-10 p-6" id="unete">
          <p className="label mb-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 !text-accent">
            <LockIcon size={14} /> {r.files.length > 0 ? t.optional : t.freeCommunity}
          </p>
          <h2 className="display text-4xl">
            {r.files.length > 0 ? t.takeIt : t.join}
            <span className="text-accent">.</span>
          </h2>
          <p className="mt-2 text-sm text-ash">
            {r.files.length > 0 ? t.takeItBody : t.joinBody}
          </p>
          {r.files.length > 0 && (
            <ul className="mt-4 divide-y divide-hairline rounded-lg border border-hairline">
              {r.files.map((f) => (
                <li key={f.id} className="flex items-center gap-3 px-3 py-2.5 text-sm">
                  <span className="flex flex-1 items-center gap-2 truncate text-ash">
                    <LockIcon size={15} /> {f.name}
                  </span>
                  <span className="shrink-0 text-xs text-hollow">{mb(f.size)}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="label mt-5 !text-ash">{t.withAccount}</p>
          <ul className="mt-2 space-y-2 text-sm">
            {t.perks.map(([pt, d]) => (
              <li key={pt} className="flex gap-2">
                <span className="mt-0.5 text-accent" aria-hidden>✓</span>
                <span>
                  <span className="font-semibold">{pt}.</span> <span className="text-ash">{d}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            {isGoogleEnabled() ? (
              <>
                <GoogleButton callbackURL={`/recursos/${r.slug}?welcome=1${lang === "en" ? "&lang=en" : ""}`} divider={false} />
                <Link href={`/registro?from=${r.slug}`} className="mt-3 block text-center text-sm text-ash underline">
                  {t.byEmail}
                </Link>
              </>
            ) : (
              <Link href={`/registro?from=${r.slug}`} className="btn btn-primary w-full">{t.create}</Link>
            )}
          </div>
          <p className="mt-4 text-sm text-ash">
            {t.haveAccount}{" "}
            <Link href={`/login?next=/recursos/${r.slug}`} className="font-semibold text-accent">{t.login}</Link>
          </p>
        </section>
      )}

      {!visitor && r.files.length > 0 && (
        <section className="card mt-8 p-5">
          <h2 className="font-semibold">{t.downloads}</h2>
          <ul className="mt-3 divide-y divide-hairline">
            {r.files.map((f) => (
              <li key={f.id} className="flex items-center gap-3 py-2.5 text-sm">
                <a href={`/api/resource-files/${f.id}`} className="flex-1 truncate font-semibold text-accent underline">
                  ⬇ {f.name}
                </a>
                <span className="shrink-0 text-xs text-hollow">{mb(f.size)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {viewer.kind === "lead" && welcome !== "1" && (
        <div className="card mt-8 p-5 text-sm">
          <p className="font-semibold">{t.welcomeCard}</p>
          <Link href={"/gracias"} className="btn btn-primary mt-3 !py-2">
            {t.myCard}
          </Link>
        </div>
      )}

      {(
        <section className="card mt-10 flex items-center gap-4 p-5">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-lg font-semibold text-white">
            AG
          </span>
          <div className="min-w-0">
            <p className="font-semibold">Andrés Gómez</p>
            <p className="text-sm text-ash">
              {t.bio}{" "}
              <a href="https://instagram.com/andresgomez.ia" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent">
                @andresgomez.ia
              </a>
            </p>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-10">
          <p className="label">{t.next}</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {related.map((x) => (
              <Link key={x.slug} href={`/recursos/${x.slug}${q}`} className="card group flex flex-col overflow-hidden transition hover:shadow-md">
                <div className="aspect-[16/9] bg-accent-soft">
                  {x.coverUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={x.coverUrl} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <p className="p-3 leading-snug font-bold group-hover:text-accent">{x.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

    </article>
  );
}
