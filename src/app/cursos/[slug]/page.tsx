import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { LockIcon } from "@/components/icons";
import { getCoursePreview } from "@/lib/courses";
import { getViewer } from "@/lib/resources";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCoursePreview(slug);
  if (!data) return { title: "Curso no encontrado" };
  const { course } = data;
  const description = course.description.split("\n")[0] || undefined;
  const base = process.env.BETTER_AUTH_URL ?? "";
  return {
    title: course.title,
    description,
    openGraph: {
      title: course.title,
      description,
      type: "website",
      images: course.coverUrl ? [`${base}${course.coverUrl}`] : undefined,
    },
  };
}

/** Vista previa pública de un curso: solo el temario; el contenido de las lecciones es para miembros. */
export default async function CursoPreviewPage({ params }: Props) {
  const { slug } = await params;
  const viewer = await getViewer();
  const isAdmin = viewer.kind === "member" && viewer.user.role === "admin";
  const data = await getCoursePreview(slug, isAdmin);
  if (!data) notFound();
  const { course, outline, total } = data;

  // Quien ya es miembro entra directo al curso.
  if (viewer.kind === "member" && !isAdmin) redirect(`/classroom/${course.id}`);

  const cta =
    viewer.kind === "lead"
      ? { href: viewer.user.onboarded ? "/pendiente" : "/onboarding", label: viewer.user.onboarded ? "Ver mi solicitud" : "Completar mi perfil" }
      : { href: "/registro", label: course.isPaid ? "Crear cuenta gratis" : "Crear cuenta gratis y empezar" };

  return (
    <article className="mx-auto max-w-3xl pb-24 md:pb-0">
      <Link href="/" className="text-sm text-ash hover:text-ink">← Inicio</Link>

      {isAdmin && (
        <p className="label mt-3 !text-ash">
          Vista de administrador{course.published ? "" : " · borrador (solo lo ves tú)"} ·{" "}
          <Link href={`/classroom/${course.id}`} className="underline">ver como alumno</Link>
        </p>
      )}

      {course.coverUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={course.coverUrl} alt="" className="mt-4 aspect-[16/9] w-full rounded-lg border border-hairline object-cover" />
      )}

      <p className="label mt-6">{course.isPaid ? "Curso" : "Curso gratis"} · {outline.length} {outline.length === 1 ? "módulo" : "módulos"} · {total} lecciones</p>
      <h1 className="display mt-1 text-5xl sm:text-6xl">
        {course.title}
        <span className="text-accent">.</span>
      </h1>
      <p className="mt-4 text-lg whitespace-pre-line text-ash">{course.description}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link href={cta.href} className="btn btn-primary !px-5 !py-3">{cta.label}</Link>
        {viewer.kind === "visitor" && (
          <Link href={`/login?next=/cursos/${slug}`} className="text-sm font-semibold text-accent">Ya tengo cuenta</Link>
        )}
      </div>

      <h2 className="display mt-12 mb-4 text-3xl">Temario<span className="text-accent">.</span></h2>
      <div className="space-y-4">
        {outline.map((m, i) => (
          <section key={m.id} className="card overflow-hidden">
            <h3 className="border-b border-hairline bg-sidebar px-4 py-3 font-semibold">
              <span className="label mr-2">{String(i + 1).padStart(2, "0")}</span>
              {m.title}
            </h3>
            <ul className="divide-y divide-hairline">
              {m.lessons.map((l) => (
                <li key={l.id} className="flex items-center gap-3 px-4 py-3 text-sm text-ash">
                  <LockIcon size={14} className="shrink-0 text-hollow" />
                  {l.title}
                </li>
              ))}
              {m.lessons.length === 0 && <li className="px-4 py-3 text-sm text-hollow">Próximamente.</li>}
            </ul>
          </section>
        ))}
        {outline.length === 0 && <p className="text-sm text-ash">El temario se publicará pronto.</p>}
      </div>

      <section className="card mt-10 border-accent bg-accent-soft/40 p-6">
        <p className="label mb-1">{course.isPaid ? "Curso" : "Gratis"}</p>
        <h2 className="display text-4xl">
          {viewer.kind === "lead" ? "Falta un paso para entrar" : "Crea tu cuenta para ver las lecciones"}
          <span className="text-accent">.</span>
        </h2>
        <p className="mt-2 text-sm text-ash">
          El contenido de cada lección es para los miembros de AG Lab: se desbloquea al entrar a la comunidad, y la cuenta es gratis.
        </p>
        <div className="mt-5">
          <Link href={cta.href} className="btn btn-primary">{cta.label}</Link>
        </div>
      </section>

      {viewer.kind === "visitor" && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-hairline bg-paper p-3 md:hidden">
          <Link href="/registro" className="btn btn-primary w-full">{cta.label}</Link>
        </div>
      )}
    </article>
  );
}
