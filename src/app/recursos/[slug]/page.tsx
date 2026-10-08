import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LockIcon } from "@/components/icons";
import { JoinCta } from "@/components/join-cta";
import { RichText } from "@/components/rich-text";
import { SourceCookie } from "@/components/source-cookie";
import { getResourceBySlug, getViewer } from "@/lib/resources";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ welcome?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = await getResourceBySlug(slug);
  if (!r) return { title: "Recurso no encontrado" };
  const base = process.env.BETTER_AUTH_URL ?? "";
  return {
    title: r.title,
    description: r.summary || undefined,
    openGraph: {
      title: r.title,
      description: r.summary || undefined,
      type: "article",
      images: r.coverUrl ? [`${base}${r.coverUrl}`] : undefined,
    },
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

  return (
    <article className="mx-auto max-w-3xl pb-16 md:pb-0">
      {viewer.kind === "visitor" && <SourceCookie slug={r.slug} />}

      <Link href="/recursos" className="text-sm text-ash hover:text-ink">
        ← Todos los recursos
      </Link>

      {!r.published && <p className="label mt-3 !text-ash">Borrador (solo lo ves tú)</p>}

      {r.coverUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={r.coverUrl} alt="" className="mt-4 aspect-[16/9] w-full rounded-lg border border-hairline object-cover" />
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
            <Link href={viewer.user.onboarded ? "/pendiente" : "/onboarding"} className="font-semibold text-accent underline">
              {viewer.user.onboarded ? "Ver el estado de tu solicitud" : "Completa tu perfil para entrar a la comunidad"}
            </Link>
            .
          </p>
        </div>
      )}

      {r.body && (
        <div className="mt-8">
          <RichText text={r.body} />
        </div>
      )}

      {r.files.length > 0 && (
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

      {viewer.kind === "visitor" && (
        <div className="mt-8">
          <JoinCta slug={r.slug} />
        </div>
      )}
      {viewer.kind === "lead" && welcome !== "1" && (
        <div className="card mt-8 p-5 text-sm">
          <p className="font-semibold">Completa tu perfil para entrar a la comunidad</p>
          <Link href={viewer.user.onboarded ? "/pendiente" : "/onboarding"} className="btn btn-primary mt-3 !py-2">
            {viewer.user.onboarded ? "Ver mi solicitud" : "Completar mi perfil"}
          </Link>
        </div>
      )}

      {/* Barra fija en celular para visitantes */}
      {viewer.kind === "visitor" && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-hairline bg-paper p-3 md:hidden">
          <Link href={`/registro?from=${r.slug}`} className="btn btn-primary w-full">
            Crear cuenta gratis y descargar
          </Link>
        </div>
      )}
    </article>
  );
}
