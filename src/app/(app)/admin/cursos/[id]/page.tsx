import { and, asc, eq, notInArray } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db, schema } from "@/db";
import { courseOutline, UUID_RE } from "@/lib/courses";
import { requireAdmin } from "@/lib/session";
import {
  addLesson,
  addModule,
  deleteCourse,
  deleteModule,
  grantAccess,
  revokeAccess,
  saveModule,
} from "../actions";
import { CourseForm } from "../forms";

export default async function AdminCursoPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = await requireAdmin();
  const { id } = await params;
  if (!UUID_RE.test(id)) notFound();

  const [course] = await db.select().from(schema.course).where(eq(schema.course.id, id));
  if (!course) notFound();

  const { outline } = await courseOutline(id, user.id);

  const granted = await db
    .select({ id: schema.user.id, name: schema.user.name, email: schema.user.email })
    .from(schema.courseAccess)
    .innerJoin(schema.user, eq(schema.user.id, schema.courseAccess.userId))
    .where(eq(schema.courseAccess.courseId, id))
    .orderBy(asc(schema.user.name));
  const candidates = await db
    .select({ id: schema.user.id, name: schema.user.name, email: schema.user.email })
    .from(schema.user)
    .where(
      and(
        eq(schema.user.status, "approved"),
        eq(schema.user.role, "member"),
        granted.length ? notInArray(schema.user.id, granted.map((g) => g.id)) : undefined,
      ),
    )
    .orderBy(asc(schema.user.name));

  return (
    <>
      <Link href="/admin/cursos" className="text-sm text-ash hover:text-ink">← Cursos</Link>
      <h1 className="display mt-3 text-5xl">
        {course.title}
        <span className="text-accent">.</span>
      </h1>
      <p className="mt-1 text-sm">
        <Link href={`/classroom/${course.id}`} className="text-accent underline">Ver como alumno</Link>
        {course.slug && (
          <>
            {" · "}
            <Link href={`/cursos/${course.slug}`} className="text-accent underline">Vista previa pública</Link>
            <span className="text-hollow"> · /cursos/{course.slug}{course.published ? "" : " (publica el curso para compartirlo)"}</span>
          </>
        )}
      </p>

      <div className="mt-6">
        <CourseForm course={course} />
      </div>

      <h2 className="display mt-10 mb-3 text-3xl">Contenido<span className="text-accent">.</span></h2>
      <div className="space-y-4">
        {outline.map((m) => (
          <section key={m.id} className="card overflow-hidden">
            <div className="flex flex-wrap items-center gap-2 border-b border-hairline bg-sidebar p-3">
              <form action={saveModule} className="flex flex-1 flex-wrap items-center gap-2">
                <input type="hidden" name="id" value={m.id} />
                <input name="title" required defaultValue={m.title} className="input min-w-40 flex-1 !py-1.5 font-semibold" />
                <input name="position" type="number" min={0} defaultValue={m.position} title="Orden" className="input !w-20 !py-1.5" />
                <button className="btn btn-ghost !py-1.5">Guardar</button>
              </form>
              <form action={deleteModule}>
                <input type="hidden" name="id" value={m.id} />
                <button className="btn btn-ghost !py-1.5" title="Borra el módulo y sus lecciones">Borrar módulo</button>
              </form>
            </div>
            <ul className="divide-y divide-hairline">
              {m.lessons.map((l) => (
                <li key={l.id}>
                  <Link href={`/admin/cursos/${course.id}/leccion/${l.id}`} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-veil">
                    <span className="label !text-hollow w-6">{l.position}</span>
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
            <form action={addLesson} className="flex gap-2 border-t border-hairline p-3">
              <input type="hidden" name="moduleId" value={m.id} />
              <input name="title" required placeholder="Nueva lección" className="input flex-1 !py-1.5" />
              <button className="btn btn-ghost !py-1.5">Añadir lección</button>
            </form>
          </section>
        ))}
        <form action={addModule} className="card flex gap-2 p-3">
          <input type="hidden" name="courseId" value={course.id} />
          <input name="title" required placeholder="Nuevo módulo" className="input flex-1 !py-1.5" />
          <button className="btn btn-primary !py-1.5">Añadir módulo</button>
        </form>
      </div>

      {course.isPaid && (
        <>
          <h2 className="display mt-10 mb-3 text-3xl">Acceso<span className="text-accent">.</span></h2>
          <div className="card p-4">
            <form action={grantAccess} className="flex gap-2">
              <input type="hidden" name="courseId" value={course.id} />
              <select name="userId" required defaultValue="" className="input flex-1">
                <option value="" disabled>Elegir miembro…</option>
                {candidates.map((c) => (
                  <option key={c.id} value={c.id}>{c.name} · {c.email}</option>
                ))}
              </select>
              <button className="btn btn-primary">Dar acceso</button>
            </form>
            <ul className="mt-4 divide-y divide-hairline">
              {granted.map((g) => (
                <li key={g.id} className="flex items-center gap-3 py-2 text-sm">
                  <span className="flex-1">{g.name} <span className="text-ash">· {g.email}</span></span>
                  <form action={revokeAccess}>
                    <input type="hidden" name="courseId" value={course.id} />
                    <input type="hidden" name="userId" value={g.id} />
                    <button className="btn btn-ghost !py-1">Quitar</button>
                  </form>
                </li>
              ))}
              {granted.length === 0 && <li className="py-2 text-sm text-ash">Nadie tiene acceso todavía.</li>}
            </ul>
          </div>
        </>
      )}

      <form action={deleteCourse} className="mt-10">
        <input type="hidden" name="id" value={course.id} />
        <button className="btn btn-ghost !border-red-300 !text-red-600">Eliminar curso</button>
      </form>
    </>
  );
}
