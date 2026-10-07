import Link from "next/link";
import { listCourses } from "@/lib/courses";
import { requireAdmin } from "@/lib/session";
import { createCourse } from "./actions";

export const metadata = { title: "Cursos" };

export default async function AdminCursosPage() {
  const { user } = await requireAdmin();
  const courses = await listCourses(user);

  return (
    <>
      <p className="label mb-2">Admin</p>
      <h1 className="display text-5xl">
        Cursos<span className="text-accent">.</span>
      </h1>

      <form action={createCourse} className="card mt-6 flex gap-2 p-4">
        <input name="title" required minLength={2} placeholder="Título del nuevo curso" className="input flex-1" />
        <button className="btn btn-primary">Crear curso</button>
      </form>

      <div className="card mt-4 divide-y divide-hairline">
        {courses.map((c) => (
          <Link key={c.id} href={`/admin/cursos/${c.id}`} className="flex items-center gap-3 p-4 hover:bg-veil">
            <span className="flex-1 font-semibold">{c.title}</span>
            <span className="text-xs text-ash">{c.total} lecciones</span>
            {c.isPaid && <span className="label">De pago</span>}
            <span className={`label ${c.published ? "" : "!text-hollow"}`}>{c.published ? "Publicado" : "Borrador"}</span>
          </Link>
        ))}
        {courses.length === 0 && <p className="p-6 text-center text-sm text-ash">Aún no has creado cursos.</p>}
      </div>
    </>
  );
}
