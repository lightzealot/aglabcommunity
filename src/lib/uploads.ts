import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

/** Carpeta de subidas (se calcula al usarla, no al importar el módulo). */
export function uploadDir() {
  return path.resolve(/*turbopackIgnore: true*/ process.env.UPLOAD_DIR ?? "./uploads");
}
const MAX_BYTES = 5 * 1024 * 1024;
export const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};
export const TYPE_BY_EXT = Object.fromEntries(
  Object.entries(EXT_BY_TYPE).map(([t, e]) => [e, t]),
);

/** Guarda una imagen validada y devuelve su URL pública (protegida por sesión). */
export async function saveImage(file: File): Promise<string> {
  const ext = EXT_BY_TYPE[file.type];
  if (!ext) throw new Error("La imagen debe ser JPG, PNG, WebP o GIF.");
  if (file.size > MAX_BYTES) throw new Error("La imagen no puede pasar de 5 MB.");
  const dir = uploadDir();
  await mkdir(dir, { recursive: true });
  const name = `${randomUUID()}.${ext}`;
  await writeFile(path.join(/*turbopackIgnore: true*/ dir, name), Buffer.from(await file.arrayBuffer()));
  return `/api/uploads/${name}`;
}
