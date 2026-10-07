import Link from "next/link";
import { listCourses } from "@/lib/courses";
import { requireMember } from "@/lib/session";

export const metadata = { title: "Classroom" };

export default async function ClassroomPage() {
  const { user } = await requireMember();
  const courses = await listCourses(user);

  return (
    <>
      <p className="label mb-2">Aprende</p>
      <h1 className="display text-5xl">
        Classroom<span className="text-accent">.</span>
      </h1>

      {courses.length === 0 ? (
        <p className="card mt-6 p-8 text-center text-sm text-ash">Pronto habrá cursos disponibles.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {courses.map((c) => {
            const pct = c.total ? Math.round((c.done / c.total) * 100) : 0;
            return (
              <Link key={c.id} href={`/classroom/${c.id}`} className="card block overflow-hidden transition hover:border-accent">
                {c.coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.coverUrl} alt="" className="h-40 w-full object-cover" />
                ) : (
                  <div className="flex h-40 items-center justify-center bg-accent-soft">
                    <span className="display text-5xl text-accent">{c.title.slice(0, 1)}</span>
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <h2 className="flex-1 text-lg font-semibold">{c.title}</h2>
                    {!c.published && <span className="label !text-ash">Borrador</span>}
                    {c.isPaid && <span className="label">{c.hasAccess ? "De pago · activo" : "🔒 De pago"}</span>}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-ash">{c.description}</p>
                  {c.hasAccess && c.total > 0 && (
                    <div className="mt-3">
                      <div className="h-1.5 overflow-hidden rounded bg-veil">
                        <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="mt-1 text-xs text-hollow">
                        {c.done}/{c.total} lecciones · {pct}%
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
