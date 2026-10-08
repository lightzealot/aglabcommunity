import Link from "next/link";

/** Llamado a unirse a la comunidad, desde un recurso (guarda el origen en el enlace). */
export function JoinCta({ slug, title = "Descárgalo gratis y únete a AG Lab" }: { slug?: string; title?: string }) {
  const q = slug ? `?from=${slug}` : "";
  return (
    <section className="card border-accent bg-accent-soft/40 p-6">
      <p className="label mb-1">Gratis</p>
      <h2 className="display text-4xl">
        {title}
        <span className="text-accent">.</span>
      </h2>
      <ul className="mt-3 space-y-1 text-sm text-ash">
        <li>✓ Descarga las plantillas y archivos de este recurso al instante</li>
        <li>✓ Entra a una comunidad de gente implementando IA en su negocio</li>
        <li>✓ Cursos, eventos en vivo y más recursos nuevos cada semana</li>
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link href={`/registro${q}`} className="btn btn-primary">
          Crear mi cuenta gratis
        </Link>
        <Link href={`/login${slug ? `?next=/recursos/${slug}` : ""}`} className="text-sm font-semibold text-accent">
          Ya tengo cuenta
        </Link>
      </div>
    </section>
  );
}
