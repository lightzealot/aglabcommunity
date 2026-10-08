import { and, asc, eq, sql } from "drizzle-orm";
import { db, schema } from "@/db";
import { SLUG_RE, slugify } from "@/lib/resource-constants";

type Viewer = { id: string; role: string };

/** Admin ve todo; los cursos gratis son para todos; los de pago requieren acceso asignado. */
export async function hasCourseAccess(viewer: Viewer, course: { id: string; isPaid: boolean }) {
  if (viewer.role === "admin" || !course.isPaid) return true;
  const [row] = await db
    .select({ u: schema.courseAccess.userId })
    .from(schema.courseAccess)
    .where(and(eq(schema.courseAccess.userId, viewer.id), eq(schema.courseAccess.courseId, course.id)));
  return !!row;
}

/** Cursos visibles para el usuario, con avance y si tiene acceso. */
export async function listCourses(viewer: Viewer) {
  const { course, courseModule, lesson, lessonProgress, courseAccess } = schema;
  const rows = await db
    .select({
      id: course.id,
      title: course.title,
      description: course.description,
      coverUrl: course.coverUrl,
      isPaid: course.isPaid,
      published: course.published,
      total: sql<number>`(select count(*)::int from ${lesson} l join ${courseModule} m on m.id = l.module_id where m.course_id = "course"."id")`,
      done: sql<number>`(select count(*)::int from ${lessonProgress} lp join ${lesson} l on l.id = lp.lesson_id join ${courseModule} m on m.id = l.module_id where m.course_id = "course"."id" and lp.user_id = ${viewer.id})`,
      granted: sql<boolean>`exists(select 1 from ${courseAccess} ca where ca.course_id = "course"."id" and ca.user_id = ${viewer.id})`,
    })
    .from(course)
    .where(viewer.role === "admin" ? undefined : eq(course.published, true))
    .orderBy(asc(course.position), asc(course.createdAt));
  return rows.map((r) => ({
    ...r,
    hasAccess: viewer.role === "admin" || !r.isPaid || r.granted,
  }));
}

/** Módulos y lecciones de un curso en orden, con las completadas por el usuario. */
export async function courseOutline(courseId: string, userId: string) {
  const { courseModule, lesson, lessonProgress } = schema;
  const modules = await db
    .select()
    .from(courseModule)
    .where(eq(courseModule.courseId, courseId))
    .orderBy(asc(courseModule.position), asc(courseModule.title));
  const lessons = await db
    .select({
      id: lesson.id,
      moduleId: lesson.moduleId,
      title: lesson.title,
      position: lesson.position,
      done: sql<boolean>`exists(select 1 from ${lessonProgress} lp where lp.lesson_id = ${lesson.id} and lp.user_id = ${userId})`,
    })
    .from(lesson)
    .innerJoin(courseModule, eq(courseModule.id, lesson.moduleId))
    .where(eq(courseModule.courseId, courseId))
    .orderBy(asc(lesson.position), asc(lesson.title));

  const outline = modules.map((m) => ({
    ...m,
    lessons: lessons.filter((l) => l.moduleId === m.id),
  }));
  const flat = outline.flatMap((m) => m.lessons);
  return { outline, flat, total: flat.length, done: flat.filter((l) => l.done).length };
}

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Slug libre para un curso nuevo: parte del título y añade -2, -3… si ya existe. */
export async function uniqueCourseSlug(title: string) {
  const base = slugify(title) || "curso";
  for (let n = 1; ; n++) {
    const slug = n === 1 ? base : `${base}-${n}`;
    const [hit] = await db.select({ id: schema.course.id }).from(schema.course).where(eq(schema.course.slug, slug));
    if (!hit) return slug;
  }
}

/** Curso publicado con su temario (sin el contenido de las lecciones), para la vista previa pública. */
export async function getCoursePreview(slug: string, includeDrafts = false) {
  if (!SLUG_RE.test(slug)) return null;
  const [course] = await db
    .select()
    .from(schema.course)
    .where(and(eq(schema.course.slug, slug), includeDrafts ? undefined : eq(schema.course.published, true)));
  if (!course) return null;
  const modules = await db
    .select()
    .from(schema.courseModule)
    .where(eq(schema.courseModule.courseId, course.id))
    .orderBy(asc(schema.courseModule.position), asc(schema.courseModule.title));
  const lessons = await db
    .select({ id: schema.lesson.id, moduleId: schema.lesson.moduleId, title: schema.lesson.title })
    .from(schema.lesson)
    .innerJoin(schema.courseModule, eq(schema.courseModule.id, schema.lesson.moduleId))
    .where(eq(schema.courseModule.courseId, course.id))
    .orderBy(asc(schema.lesson.position), asc(schema.lesson.title));
  const outline = modules.map((m) => ({ ...m, lessons: lessons.filter((l) => l.moduleId === m.id) }));
  return { course, outline, total: lessons.length };
}
