import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db, schema } from "@/db";
import { courseOutline, hasCourseAccess, UUID_RE } from "@/lib/courses";
import { requireMember } from "@/lib/session";

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { user } = await requireMember();
  const { courseId } = await params;
  if (!UUID_RE.test(courseId)) notFound();

  const [course] = await db.select().from(schema.course).where(eq(schema.course.id, courseId));
  if (!course || (!course.published && user.role !== "admin")) notFound();

  const access = await hasCourseAccess(user, course);
  const { outline, flat, total, done } = await courseOutline(course.id, user.id);
  const next = flat.find((l) => !l.done) ?? flat[0];
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <>
      <Link href="/classroom" className="text-sm text-ash hover:text-ink">← Classroom</Link>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="display text-5xl">
          {course.title}
          <span className="text-accent">.</span>
        </h1>
        {course.isPaid && <span className="label">{access ? "De pago · activo" : "🔒 De pago"}</span>}
        {!course.published && <span className="label !text-ash">Borrador</span>}
      </div>
      <p className="mt-3 max-w-2xl text-ash whitespace-pre-line">{course.description}</p>

      {!access ? (
        <div className="card mt-6 p-6">
          <p className="font-semibold">Este curso es de pago.</p>
          <p className="mt-1 text-sm text-ash">
            Escríbenos a{" "}
            <a className="text-accent underline" href="mailto:hello@andresgomez.store">hello@andresgomez.store</a>{" "}
            y te damos acceso en cuanto confirmemos tu pago.
          </p>
        </div>
      ) : (
        <>
          {total > 0 && (
            <div className="card mt-6 flex flex-wrap items-center gap-4 p-4">
              <div className="min-w-48 flex-1">
                <div className="h-1.5 overflow-hidden rounded bg-veil">
                  <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-1 text-xs text-hollow">{done}/{total} lecciones · {pct}%</p>
              </div>
              {next && (
                <Link href={`/classroom/${course.id}/${next.id}`} className="btn btn-primary">
                  {done === 0 ? "Empezar" : done === total ? "Repasar" : "Continuar"}
                </Link>
              )}
            </div>
          )}
        </>
      )}

      <div className="mt-6 space-y-4">
        {outline.map((m, i) => (
          <section key={m.id} className="card overflow-hidden">
            <h2 className="border-b border-hairline bg-sidebar px-4 py-3 font-semibold">
              <span className="label mr-2">{String(i + 1).padStart(2, "0")}</span>
              {m.title}
            </h2>
            <ul className="divide-y divide-hairline">
              {m.lessons.map((l) => (
                <li key={l.id}>
                  {access ? (
                    <Link href={`/classroom/${course.id}/${l.id}`} className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-veil">
                      <span className={l.done ? "text-accent" : "text-hollow"}>{l.done ? "●" : "○"}</span>
                      {l.title}
                    </Link>
                  ) : (
                    <span className="flex items-center gap-3 px-4 py-3 text-sm text-hollow">
                      <span>🔒</span>
                      {l.title}
                    </span>
                  )}
                </li>
              ))}
              {m.lessons.length === 0 && <li className="px-4 py-3 text-sm text-hollow">Sin lecciones todavía.</li>}
            </ul>
          </section>
        ))}
        {outline.length === 0 && <p className="text-sm text-ash">Este curso aún no tiene contenido.</p>}
      </div>
    </>
  );
}
