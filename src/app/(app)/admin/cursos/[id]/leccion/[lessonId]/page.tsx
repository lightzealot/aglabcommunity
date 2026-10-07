import { asc, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db, schema } from "@/db";
import { UUID_RE } from "@/lib/courses";
import { requireAdmin } from "@/lib/session";
import { deleteLesson, deleteLessonFile } from "../../../actions";
import { FileUploader, LessonForm } from "../../../forms";

export default async function AdminLeccionPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) {
  await requireAdmin();
  const { id, lessonId } = await params;
  if (!UUID_RE.test(id) || !UUID_RE.test(lessonId)) notFound();

  const [lesson] = await db.select().from(schema.lesson).where(eq(schema.lesson.id, lessonId));
  if (!lesson) notFound();
  const files = await db
    .select()
    .from(schema.lessonFile)
    .where(eq(schema.lessonFile.lessonId, lessonId))
    .orderBy(asc(schema.lessonFile.createdAt));

  return (
    <>
      <Link href={`/admin/cursos/${id}`} className="text-sm text-ash hover:text-ink">← Volver al curso</Link>
      <h1 className="display mt-3 mb-6 text-5xl">
        Lección<span className="text-accent">.</span>
      </h1>
      <LessonForm lesson={lesson} />

      <h2 className="display mt-8 mb-3 text-3xl">Archivos<span className="text-accent">.</span></h2>
      <div className="card p-4">
        <ul className="mb-4 divide-y divide-hairline">
          {files.map((f) => (
            <li key={f.id} className="flex items-center gap-3 py-2 text-sm">
              <a href={`/api/files/${f.id}`} className="flex-1 text-accent underline">{f.name}</a>
              <span className="text-xs text-hollow">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
              <form action={deleteLessonFile}>
                <input type="hidden" name="id" value={f.id} />
                <button className="btn btn-ghost !py-1">Quitar</button>
              </form>
            </li>
          ))}
          {files.length === 0 && <li className="py-2 text-sm text-ash">Aún no hay archivos.</li>}
        </ul>
        <FileUploader lessonId={lesson.id} />
        <p className="mt-2 text-xs text-hollow">PDF, ZIP, JSON (workflows de n8n), Office, CSV, TXT, MD o imágenes. Máx. 25 MB.</p>
      </div>
      <form action={deleteLesson} className="mt-8">
        <input type="hidden" name="id" value={lesson.id} />
        <button className="btn btn-ghost !border-red-300 !text-red-600">Eliminar lección</button>
      </form>
    </>
  );
}
