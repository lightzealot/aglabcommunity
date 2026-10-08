import { readFile } from "node:fs/promises";
import path from "node:path";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { UUID_RE } from "@/lib/courses";
import { filesDir } from "@/lib/files";
import { getSession } from "@/lib/session";

// Descarga de archivos de recursos: exige tener cuenta (aunque aún no esté aprobada en la comunidad).
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.user.status === "banned") {
    return new Response("Crea una cuenta gratis para descargar este archivo.", { status: 401 });
  }
  const { id } = await ctx.params;
  if (!UUID_RE.test(id)) return new Response("No encontrado", { status: 404 });

  const [row] = await db
    .select({ file: schema.resourceFile, published: schema.resource.published })
    .from(schema.resourceFile)
    .innerJoin(schema.resource, eq(schema.resource.id, schema.resourceFile.resourceId))
    .where(eq(schema.resourceFile.id, id));
  if (!row || (!row.published && session.user.role !== "admin")) {
    return new Response("No encontrado", { status: 404 });
  }

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
