import type { Metadata } from "next";
import Link from "next/link";
import { getViewer, listPublishedResources } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Recursos gratuitos",
  description: "Guías, prompts y plantillas gratis para usar la inteligencia artificial en tu trabajo y en tu negocio.",
};

export default async function RecursosPage() {
  const viewer = await getViewer();
  const resources = await listPublishedResources();

  return (
    <>
      {viewer.kind === "visitor" ? (
        <section className="mx-auto max-w-3xl pb-8 text-center">
          <p className="label mb-2">Recursos gratuitos</p>
          <h1 className="display text-6xl sm:text-7xl">
            Guías y plantillas para usar IA en tu trabajo<span className="text-accent">.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ash">
            Lee todas las guías gratis. Para descargar los archivos, crea tu cuenta y entra a la comunidad de AG Lab.
          </p>
          <Link href="/registro" className="btn btn-primary mt-6">
            Crear mi cuenta gratis
          </Link>
        </section>
      ) : (
        <div className="mb-6">
          <h1 className="display text-5xl">
            Recursos<span className="text-accent">.</span>
          </h1>
        </div>
      )}

      {resources.length === 0 ? (
        <p className="card p-10 text-center text-sm text-ash">Pronto publicaremos los primeros recursos.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <Link
              key={r.id}
              href={`/recursos/${r.slug}`}
              className="card group flex flex-col overflow-hidden transition hover:shadow-md"
            >
              <div className="aspect-[16/9] bg-accent-soft">
                {r.coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.coverUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="display text-6xl text-accent">{r.title.slice(0, 1)}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h2 className="text-lg leading-snug font-bold group-hover:text-accent">{r.title}</h2>
                <p className="mt-1 line-clamp-3 text-sm text-ash">{r.summary}</p>
                <p className="mt-auto pt-3 text-xs font-semibold text-accent">
                  {r.files > 0 ? `${r.files} archivo${r.files === 1 ? "" : "s"} para descargar` : "Guía"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
