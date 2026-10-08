import Link from "next/link";
import { LockIcon } from "@/components/icons";
import { listCourses } from "@/lib/courses";
import { requireMember } from "@/lib/session";

export const metadata = { title: "Cursos" };

export default async function ClassroomPage() {
  const { user } = await requireMember();
  const courses = await listCourses(user);

  return (
    <>
      {courses.length === 0 ? (
        <p className="card p-10 text-center text-sm text-ash">Pronto habrá cursos disponibles.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => {
            const pct = c.total ? Math.round((c.done / c.total) * 100) : 0;
            return (
              <Link
                key={c.id}
                href={`/classroom/${c.id}`}
                className="card group flex flex-col overflow-hidden transition hover:shadow-md"
              >
                <div className="relative aspect-[16/9] bg-accent-soft">
                  {c.coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.coverUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="display text-6xl text-accent">{c.title.slice(0, 1)}</span>
                    </div>
                  )}
                  {c.isPaid && !c.hasAccess && (
                    <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">
                      <LockIcon size={13} /> De pago
                    </span>
                  )}
                  {!c.published && (
                    <span className="absolute top-2 left-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-ash">
                      Borrador
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h2 className="text-lg leading-snug font-bold uppercase group-hover:text-accent">{c.title}</h2>
                  <p className="mt-1 line-clamp-2 min-h-10 text-sm text-ash">{c.description}</p>
                  <div className="mt-auto pt-4">
                    <div className="relative h-5 overflow-hidden rounded-full bg-veil">
                      <div className="h-full bg-accent/25" style={{ width: `${c.hasAccess ? pct : 0}%` }} />
                      <span className="absolute inset-0 flex items-center pl-2.5 text-[11px] font-semibold text-ash">
                        {c.hasAccess ? `${pct}%` : "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
