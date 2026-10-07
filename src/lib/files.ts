import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { inArray } from "drizzle-orm";
import { db, schema } from "@/db";
import { uploadDir } from "@/lib/uploads";

export const MAX_FILE_BYTES = 25 * 1024 * 1024;
// Lista cerrada de extensiones. Se descargan siempre como adjunto (nunca se renderizan).
export const ALLOWED_EXT = [
  "pdf", "zip", "json", "csv", "txt", "md",
  "doc", "docx", "xls", "xlsx", "ppt", "pptx",
  "png", "jpg", "jpeg", "webp", "gif",
] as const;

export const filesDir = () => path.join(/*turbopackIgnore: true*/ uploadDir(), "files");

export async function saveLessonFile(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!(ALLOWED_EXT as readonly string[]).includes(ext)) {
    throw new Error(`Tipo de archivo no permitido. Usa: ${ALLOWED_EXT.join(", ")}.`);
  }
  if (file.size > MAX_FILE_BYTES) throw new Error("El archivo no puede pasar de 25 MB.");
  const dir = filesDir();
  await mkdir(dir, { recursive: true });
  const storedName = `${randomUUID()}.${ext}`;
  await writeFile(path.join(/*turbopackIgnore: true*/ dir, storedName), Buffer.from(await file.arrayBuffer()));
  return {
    name: file.name.replace(/[\r\n"\\/]/g, "_").slice(0, 150),
    storedName,
    size: file.size,
  };
}

/** Borra del disco los archivos de las lecciones dadas (llamar antes de borrar las filas). */
export async function removeFilesOfLessons(lessonIds: string[]) {
  if (!lessonIds.length) return;
  const rows = await db
    .select({ storedName: schema.lessonFile.storedName })
    .from(schema.lessonFile)
    .where(inArray(schema.lessonFile.lessonId, lessonIds));
  await Promise.all(
    rows.map((r) =>
      unlink(path.join(/*turbopackIgnore: true*/ filesDir(), r.storedName)).catch(() => undefined),
    ),
  );
}
