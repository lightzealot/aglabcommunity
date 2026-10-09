"use server";

import { unlink } from "node:fs/promises";
import path from "node:path";
import { and, eq, ne, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db, schema } from "@/db";
import { filesDir, saveLessonFile } from "@/lib/files";
import { SLUG_RE, slugify } from "@/lib/resource-constants";
import { requireAdmin } from "@/lib/session";
import { saveImage } from "@/lib/uploads";

export type ResourceState = { error?: string; ok?: boolean };

const refresh = () => {
  revalidatePath("/recursos", "layout");
  revalidatePath("/admin/recursos", "layout");
  revalidatePath("/sitemap.xml");
};
const uuid = (v: FormDataEntryValue | null) => z.uuid().safeParse(v);

async function uniqueSlug(base: string, exceptId?: string) {
  let slug = base || "recurso";
  for (let i = 2; ; i++) {
    const [dup] = await db
      .select({ id: schema.resource.id })
      .from(schema.resource)
      .where(and(eq(schema.resource.slug, slug), exceptId ? ne(schema.resource.id, exceptId) : undefined));
    if (!dup) return slug;
    slug = `${base}-${i}`;
  }
}

export async function createResource(formData: FormData) {
  await requireAdmin();
  const title = z.string().trim().min(2).max(120).safeParse(formData.get("title"));
  if (!title.success) return;
  // El recurso nuevo va de primero: pasa a la posición 0 y los demás bajan un puesto.
  await db.update(schema.resource).set({ position: sql`${schema.resource.position} + 1` });
  const [r] = await db
    .insert(schema.resource)
    .values({ title: title.data, slug: await uniqueSlug(slugify(title.data)), position: 0 })
    .returning({ id: schema.resource.id });
  refresh();
  redirect(`/admin/recursos/${r.id}`);
}

export async function saveResource(_prev: ResourceState, formData: FormData): Promise<ResourceState> {
  await requireAdmin();
  const id = uuid(formData.get("id"));
  const parsed = z
    .object({
      title: z.string().trim().min(2, "El título es muy corto.").max(120),
      slug: z.string().trim().regex(SLUG_RE, "El enlace solo admite minúsculas, números y guiones.").max(80),
      summary: z.string().trim().max(300, "El resumen admite máx. 300 caracteres."),
      body: z.string().trim().max(30000, "El texto es demasiado largo."),
      position: z.coerce.number().int().min(0).max(999),
    })
    .safeParse({
      title: formData.get("title"),
      slug: formData.get("slug"),
      summary: formData.get("summary") ?? "",
      body: formData.get("body") ?? "",
      position: formData.get("position") || 0,
    });
  if (!id.success || !parsed.success) {
    return { error: parsed.success ? "Recurso no válido." : parsed.error.issues[0].message };
  }
  const [dup] = await db
    .select({ id: schema.resource.id })
    .from(schema.resource)
    .where(and(eq(schema.resource.slug, parsed.data.slug), ne(schema.resource.id, id.data)));
  if (dup) return { error: "Ya existe otro recurso con ese enlace." };

  const patch: Partial<typeof schema.resource.$inferInsert> = {
    ...parsed.data,
    published: formData.get("published") === "on",
  };
  const cover = formData.get("cover");
  if (cover instanceof File && cover.size > 0) {
    try {
      patch.coverUrl = await saveImage(cover);
    } catch (e) {
      return { error: e instanceof Error ? e.message : "No pudimos subir la portada." };
    }
  } else if (formData.get("removeCover") === "on") {
    patch.coverUrl = null;
  }

  await db.update(schema.resource).set(patch).where(eq(schema.resource.id, id.data));
  refresh();
  return { ok: true };
}

export async function deleteResource(formData: FormData) {
  await requireAdmin();
  const id = uuid(formData.get("id"));
  if (!id.success) return;
  const files = await db
    .select({ storedName: schema.resourceFile.storedName })
    .from(schema.resourceFile)
    .where(eq(schema.resourceFile.resourceId, id.data));
  await Promise.all(
    files.map((f) => unlink(path.join(/*turbopackIgnore: true*/ filesDir(), f.storedName)).catch(() => undefined)),
  );
  await db.delete(schema.resource).where(eq(schema.resource.id, id.data));
  refresh();
  redirect("/admin/recursos");
}

export async function addResourceFile(_prev: ResourceState, formData: FormData): Promise<ResourceState> {
  await requireAdmin();
  const resourceId = uuid(formData.get("resourceId"));
  const file = formData.get("file");
  if (!resourceId.success) return { error: "Recurso no válido." };
  if (!(file instanceof File) || file.size === 0) return { error: "Elige un archivo." };

  const [count] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(schema.resourceFile)
    .where(eq(schema.resourceFile.resourceId, resourceId.data));
  if (count.n >= 20) return { error: "Máximo 20 archivos por recurso." };

  try {
    const saved = await saveLessonFile(file);
    await db.insert(schema.resourceFile).values({ resourceId: resourceId.data, ...saved });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "No pudimos subir el archivo." };
  }
  refresh();
  return { ok: true };
}

export async function deleteResourceFile(formData: FormData) {
  await requireAdmin();
  const id = uuid(formData.get("id"));
  if (!id.success) return;
  const [f] = await db.delete(schema.resourceFile).where(eq(schema.resourceFile.id, id.data)).returning();
  if (f) await unlink(path.join(/*turbopackIgnore: true*/ filesDir(), f.storedName)).catch(() => undefined);
  refresh();
}
