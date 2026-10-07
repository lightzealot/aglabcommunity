import { asc, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { toggleLesson } from "@/app/(app)/classroom/actions";
import { db, schema } from "@/db";
import { courseOutline, hasCourseAccess, UUID_RE } from "@/lib/courses";
import { requireMember } from "@/lib/session";
import { toEmbedUrl } from "@/lib/video";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { user } = await requireMember();
  const { courseId, lessonId } = await params;
  if (!UUID_RE.test(courseId) || !UUID_RE.test(lessonId)) notFound();

  const [course] = await db.select().from(schema.course).where(eq(schema.course.id, courseId));
  if (!course || (!course.published && user.role !== "admin")) notFound();
  if (!(await hasCourseAccess(user, course))) redirect(`/classroom/${course.id}`);

  const { outline, flat } = await courseOutline(course.id, user.id);
  const idx = flat.findIndex((l) => l.id === lessonId);
  if (idx < 0) notFound();
  const current = flat[idx];

  const [lesson] = await db.select().from(schema.lesson).where(eq(schema.lesson.id, lessonId));
  const files = await db
    .select()
    .from(schema.lessonFile)
    .where(eq(schema.lessonFile.lessonId, lessonId))
    .orderBy(asc(schema.lessonFile.createdAt));
  const embed = toEmbedUrl(lesson.videoUrl);
  const prev = flat[idx - 1];
  const next = flat[idx + 1];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_16rem]">
      <div className="min-w-0">
        <Link href={`/classroom/${course.id}`} className="text-sm text-ash hover:text-ink">← {course.title}</Link>
        <h1 className="display mt-3 text-4xl">{lesson.title}<span className="text-accent">.</span></h1>

        {embed && (
          <div className="mt-5 aspect-video overflow-hidden rounded border border-hairline bg-black">
            <iframe
              src={embed}
              title={lesson.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        )}

        {lesson.body && <p className="mt-5 text-[0.9375rem] break-words whitespace-pre-line">{lesson.body}</p>}

        {(lesson.resources.length > 0 || files.length > 0) && (
          <div className="card mt-6 p-4">
            <p className="label mb-2">Recursos</p>
            <ul className="space-y-1 text-sm">
              {files.map((f) => (
                <li key={f.id}>
                  <a href={`/api/files/${f.id}`} className="text-accent underline">⬇ {f.name}</a>
                  <span className="ml-2 text-xs text-hollow">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                </li>
              ))}
              {lesson.resources.map((r) => (
                <li key={r.url}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-accent underline">{r.label}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <form action={toggleLesson}>
            <input type="hidden" name="lessonId" value={lesson.id} />
            <button className={`btn ${current.done ? "btn-ghost" : "btn-primary"}`}>
              {current.done ? "✓ Completada (deshacer)" : "Marcar como completada · +5 pts"}
            </button>
          </form>
          <div className="ml-auto flex gap-2">
            {prev && <Link href={`/classroom/${course.id}/${prev.id}`} className="btn btn-ghost">← Anterior</Link>}
            {next && <Link href={`/classroom/${course.id}/${next.id}`} className="btn btn-ghost">Siguiente →</Link>}
          </div>
        </div>
      </div>

      <aside className="space-y-4 text-sm">
        {outline.map((m) => (
          <div key={m.id}>
            <p className="label mb-1">{m.title}</p>
            <ul>
              {m.lessons.map((l) => (
                <li key={l.id}>
                  <Link
                    href={`/classroom/${course.id}/${l.id}`}
                    className={`flex gap-2 rounded px-2 py-1.5 hover:bg-veil ${l.id === lessonId ? "bg-accent-soft font-semibold" : ""}`}
                  >
                    <span className={l.done ? "text-accent" : "text-hollow"}>{l.done ? "●" : "○"}</span>
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
    </div>
  );
}
