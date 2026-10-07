import { readFile } from "node:fs/promises";
import path from "node:path";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { hasCourseAccess, UUID_RE } from "@/lib/courses";
import { filesDir } from "@/lib/files";
import { getSession } from "@/lib/session";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.user.status !== "approved") {
    return new Response("No autorizado", { status: 401 });
  }
  const { id } = await ctx.params;
  if (!UUID_RE.test(id)) return new Response("No encontrado", { status: 404 });

  const [row] = await db
    .select({ file: schema.lessonFile, course: schema.course })
    .from(schema.lessonFile)
    .innerJoin(schema.lesson, eq(schema.lesson.id, schema.lessonFile.lessonId))
    .innerJoin(schema.courseModule, eq(schema.courseModule.id, schema.lesson.moduleId))
    .innerJoin(schema.course, eq(schema.course.id, schema.courseModule.courseId))
    .where(eq(schema.lessonFile.id, id));
  if (!row) return new Response("No encontrado", { status: 404 });

  const { user } = session;
  if (!row.course.published && user.role !== "admin") return new Response("No encontrado", { status: 404 });
  if (!(await hasCourseAccess(user, row.course))) return new Response("Sin acceso a este curso", { status: 403 });

  try {
    const data = await readFile(path.join(/*turbopackIgnore: true*/ filesDir(), row.file.storedName));
    return new Response(data, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(row.file.name)}`,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new Response("No encontrado", { status: 404 });
  }
}
