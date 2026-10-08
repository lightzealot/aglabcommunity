"use server";

import { unlink } from "node:fs/promises";
import path from "node:path";
import { and, eq, inArray, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db, schema } from "@/db";
import { uniqueCourseSlug } from "@/lib/courses";
import { filesDir, removeFilesOfLessons, saveLessonFile } from "@/lib/files";
import { revoke } from "@/lib/points";
import { requireAdmin } from "@/lib/session";
import { saveImage } from "@/lib/uploads";
import { toEmbedUrl } from "@/lib/video";

export type CourseState = { error?: string; ok?: boolean };

const refresh = () => {
  revalidatePath("/classroom", "layout");
  revalidatePath("/admin/cursos", "layout");
};

const uuid = (v: FormDataEntryValue | null) => z.uuid().safeParse(v);

/** Quita los puntos otorgados por lecciones que van a desaparecer. */
async function revokeLessonPoints(lessonIds: string[]) {
  if (!lessonIds.length) return;
  await db.transaction(async (tx) => {
    for (const id of lessonIds) await revoke(tx, "lesson", { prefix: `${id}:` });
  });
}

export async function createCourse(formData: FormData) {
  await requireAdmin();
  const title = z.string().trim().min(2).max(100).safeParse(formData.get("title"));
  if (!title.success) return;
  const [{ max }] = await db
    .select({ max: sql<number>`coalesce(max(${schema.course.position}), 0)::int` })
    .from(schema.course);
  const [c] = await db
    .insert(schema.course)
    .values({ title: title.data, slug: await uniqueCourseSlug(title.data), position: max + 1 })
    .returning({ id: schema.course.id });
  refresh();
  redirect(`/admin/cursos/${c.id}`);
}

export async function saveCourse(_prev: CourseState, formData: FormData): Promise<CourseState> {
  await requireAdmin();
  const id = uuid(formData.get("id"));
  const parsed = z
    .object({
      title: z.string().trim().min(2, "El título es muy corto.").max(100),
      description: z.string().trim().max(2000, "Descripción demasiado larga (máx. 2000)."),
      position: z.coerce.number().int().min(0).max(999),
    })
    .safeParse({
      title: formData.get("title"),
      description: formData.get("description") ?? "",
      position: formData.get("position") || 0,
    });
  if (!id.success || !parsed.success) return { error: parsed.success ? "Curso no válido." : parsed.error.issues[0].message };

  const patch: Partial<typeof schema.course.$inferInsert> = {
    ...parsed.data,
    isPaid: formData.get("isPaid") === "on",
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

  await db.update(schema.course).set(patch).where(eq(schema.course.id, id.data));
  refresh();
  return { ok: true };
}

export async function deleteCourse(formData: FormData) {
  await requireAdmin();
  const id = uuid(formData.get("id"));
  if (!id.success) return;
  const lessons = await db
    .select({ id: schema.lesson.id })
    .from(schema.lesson)
    .innerJoin(schema.courseModule, eq(schema.courseModule.id, schema.lesson.moduleId))
    .where(eq(schema.courseModule.courseId, id.data));
  await revokeLessonPoints(lessons.map((l) => l.id));
  await removeFilesOfLessons(lessons.map((l) => l.id));
  await db.delete(schema.course).where(eq(schema.course.id, id.data));
  refresh();
  redirect("/admin/cursos");
}

export async function addModule(formData: FormData) {
  await requireAdmin();
  const courseId = uuid(formData.get("courseId"));
  const title = z.string().trim().min(1).max(100).safeParse(formData.get("title"));
  if (!courseId.success || !title.success) return;
  const [{ max }] = await db
    .select({ max: sql<number>`coalesce(max(${schema.courseModule.position}), 0)::int` })
    .from(schema.courseModule)
    .where(eq(schema.courseModule.courseId, courseId.data));
  await db.insert(schema.courseModule).values({ courseId: courseId.data, title: title.data, position: max + 1 });
  refresh();
}

export async function saveModule(formData: FormData) {
  await requireAdmin();
  const id = uuid(formData.get("id"));
  const parsed = z
    .object({ title: z.string().trim().min(1).max(100), position: z.coerce.number().int().min(0).max(999) })
    .safeParse({ title: formData.get("title"), position: formData.get("position") || 0 });
  if (!id.success || !parsed.success) return;
  await db.update(schema.courseModule).set(parsed.data).where(eq(schema.courseModule.id, id.data));
  refresh();
}

export async function deleteModule(formData: FormData) {
  await requireAdmin();
  const id = uuid(formData.get("id"));
  if (!id.success) return;
  const lessons = await db
    .select({ id: schema.lesson.id })
    .from(schema.lesson)
    .where(eq(schema.lesson.moduleId, id.data));
  await revokeLessonPoints(lessons.map((l) => l.id));
  await removeFilesOfLessons(lessons.map((l) => l.id));
  await db.delete(schema.courseModule).where(eq(schema.courseModule.id, id.data));
  refresh();
}

export async function addLesson(formData: FormData) {
  await requireAdmin();
  const moduleId = uuid(formData.get("moduleId"));
  const title = z.string().trim().min(1).max(120).safeParse(formData.get("title"));
  if (!moduleId.success || !title.success) return;
  const [m] = await db
    .select({ courseId: schema.courseModule.courseId })
    .from(schema.courseModule)
    .where(eq(schema.courseModule.id, moduleId.data));
  if (!m) return;
  const [{ max }] = await db
    .select({ max: sql<number>`coalesce(max(${schema.lesson.position}), 0)::int` })
    .from(schema.lesson)
    .where(eq(schema.lesson.moduleId, moduleId.data));
  const [l] = await db
    .insert(schema.lesson)
    .values({ moduleId: moduleId.data, title: title.data, position: max + 1 })
    .returning({ id: schema.lesson.id });
  refresh();
  redirect(`/admin/cursos/${m.courseId}/leccion/${l.id}`);
}

function parseResources(raw: string): schema.LessonResource[] | string {
  const out: schema.LessonResource[] = [];
  for (const line of raw.split("\n").map((l) => l.trim()).filter(Boolean)) {
    const [label, ...rest] = line.split("|");
    const url = rest.join("|").trim();
    if (!label.trim() || !url) return `Formato inválido: "${line}". Usa: Etiqueta | https://enlace`;
    try {
      const u = new URL(url);
      if (u.protocol !== "https:" && u.protocol !== "http:") throw new Error();
    } catch {
      return `El enlace no es válido: "${url}"`;
    }
    out.push({ label: label.trim().slice(0, 80), url });
  }
  return out.slice(0, 20);
}

export async function saveLesson(_prev: CourseState, formData: FormData): Promise<CourseState> {
  await requireAdmin();
  const id = uuid(formData.get("id"));
  const parsed = z
    .object({
      title: z.string().trim().min(1, "Falta el título.").max(120),
      videoUrl: z.string().trim().max(300).optional(),
      body: z.string().trim().max(20000, "Texto demasiado largo."),
      position: z.coerce.number().int().min(0).max(999),
    })
    .safeParse({
      title: formData.get("title"),
      videoUrl: formData.get("videoUrl") || undefined,
      body: formData.get("body") ?? "",
      position: formData.get("position") || 0,
    });
  if (!id.success || !parsed.success) return { error: parsed.success ? "Lección no válida." : parsed.error.issues[0].message };

  if (parsed.data.videoUrl && !toEmbedUrl(parsed.data.videoUrl)) {
    return { error: "El video debe ser un enlace de YouTube, Vimeo o Loom." };
  }
  const resources = parseResources(String(formData.get("resources") ?? ""));
  if (typeof resources === "string") return { error: resources };

  await db
    .update(schema.lesson)
    .set({ ...parsed.data, videoUrl: parsed.data.videoUrl ?? null, resources })
    .where(eq(schema.lesson.id, id.data));
  refresh();
  return { ok: true };
}

export async function deleteLesson(formData: FormData) {
  await requireAdmin();
  const id = uuid(formData.get("id"));
  if (!id.success) return;
  const [row] = await db
    .select({ courseId: schema.courseModule.courseId })
    .from(schema.lesson)
    .innerJoin(schema.courseModule, eq(schema.courseModule.id, schema.lesson.moduleId))
    .where(eq(schema.lesson.id, id.data));
  await revokeLessonPoints([id.data]);
  await removeFilesOfLessons([id.data]);
  await db.delete(schema.lesson).where(eq(schema.lesson.id, id.data));
  refresh();
  redirect(row ? `/admin/cursos/${row.courseId}` : "/admin/cursos");
}

export async function grantAccess(formData: FormData) {
  await requireAdmin();
  const courseId = uuid(formData.get("courseId"));
  const userId = z.string().min(1).safeParse(formData.get("userId"));
  if (!courseId.success || !userId.success) return;
  const [u] = await db.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.id, userId.data));
  if (!u) return;
  await db
    .insert(schema.courseAccess)
    .values({ courseId: courseId.data, userId: u.id })
    .onConflictDoNothing();
  refresh();
}

export async function revokeAccess(formData: FormData) {
  await requireAdmin();
  const courseId = uuid(formData.get("courseId"));
  const userId = z.string().min(1).safeParse(formData.get("userId"));
  if (!courseId.success || !userId.success) return;
  await db
    .delete(schema.courseAccess)
    .where(and(eq(schema.courseAccess.courseId, courseId.data), inArray(schema.courseAccess.userId, [userId.data])));
  refresh();
}

export async function addLessonFile(_prev: CourseState, formData: FormData): Promise<CourseState> {
  await requireAdmin();
  const lessonId = uuid(formData.get("lessonId"));
  const file = formData.get("file");
  if (!lessonId.success) return { error: "Lección no válida." };
  if (!(file instanceof File) || file.size === 0) return { error: "Elige un archivo." };

  const [count] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(schema.lessonFile)
    .where(eq(schema.lessonFile.lessonId, lessonId.data));
  if (count.n >= 20) return { error: "Máximo 20 archivos por lección." };

  try {
    const saved = await saveLessonFile(file);
    await db.insert(schema.lessonFile).values({ lessonId: lessonId.data, ...saved });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "No pudimos subir el archivo." };
  }
  refresh();
  return { ok: true };
}

export async function deleteLessonFile(formData: FormData) {
  await requireAdmin();
  const id = uuid(formData.get("id"));
  if (!id.success) return;
  const [f] = await db.delete(schema.lessonFile).where(eq(schema.lessonFile.id, id.data)).returning();
  if (f) await unlink(path.join(/*turbopackIgnore: true*/ filesDir(), f.storedName)).catch(() => undefined);
  refresh();
}
