import { readFile } from "node:fs/promises";
import path from "node:path";
import { and, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { getSession } from "@/lib/session";
import { TYPE_BY_EXT, uploadDir } from "@/lib/uploads";

export async function GET(_req: Request, ctx: { params: Promise<{ file: string }> }) {
  const { file } = await ctx.params;
  const m = /^[0-9a-f-]{36}\.(jpg|png|webp|gif)$/.exec(file);
  if (!m) return new Response("No encontrado", { status: 404 });

  // Las portadas de recursos y cursos publicados son públicas (se ven en páginas abiertas a visitantes).
  const url = `/api/uploads/${file}`;
  const [coverOfResource] = await db
    .select({ id: schema.resource.id })
    .from(schema.resource)
    .where(and(eq(schema.resource.coverUrl, url), eq(schema.resource.published, true)))
    .limit(1);
  const [coverOfCourse] = coverOfResource
    ? []
    : await db
        .select({ id: schema.course.id })
        .from(schema.course)
        .where(and(eq(schema.course.coverUrl, url), eq(schema.course.published, true)))
        .limit(1);
  const publicCover = coverOfResource ?? coverOfCourse;

  if (!publicCover) {
    const session = await getSession();
    if (!session || session.user.status !== "approved") {
      return new Response("No autorizado", { status: 401 });
    }
  }
  try {
    const data = await readFile(path.join(/*turbopackIgnore: true*/ uploadDir(), file));
    return new Response(data, {
      headers: {
        "Content-Type": TYPE_BY_EXT[m[1]],
        "Cache-Control": publicCover ? "public, max-age=86400" : "private, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("No encontrado", { status: 404 });
  }
}
