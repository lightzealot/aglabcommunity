import { asc, eq, gt, sql } from "drizzle-orm";
import { db, schema } from "@/db";

/** Mínimo de miembros para mostrar la cifra en público (con pocos, resta más de lo que suma). */
export const SHOW_MEMBERS_FROM = 25;

/** Datos de la página de inicio pública. Solo expone información que ya es pública o agregada. */
export async function getLandingData() {
  const weekAgo = new Date(Date.now() - 7 * 86_400_000);
  const now = new Date();
  const { user, resource, course, lesson, courseModule, board, post, event } = schema;

  const [[counts], boards, resources, courses, events] = await Promise.all([
    db
      .select({
        members: sql<number>`(select count(*)::int from ${user} where ${user.status} = 'approved')`,
        newThisWeek: sql<number>`(select count(*)::int from ${user} where ${user.status} = 'approved' and ${user.createdAt} >= ${weekAgo.toISOString()}::timestamp)`,
        resources: sql<number>`(select count(*)::int from ${resource} where ${resource.published})`,
        courses: sql<number>`(select count(*)::int from ${course} where ${course.published})`,
        lessons: sql<number>`(select count(*)::int from ${lesson} l join ${courseModule} m on m.id = l.module_id join ${course} c on c.id = m.course_id where c.published)`,
      })
      .from(sql`(select 1) as one`),
    db
      .select({
        id: board.id,
        name: board.name,
        description: board.description,
        threads: sql<number>`(select count(*)::int from ${post} p where p.board_id = "board"."id" and p.status = 'published' and p.kind = 'post')`,
      })
      .from(board)
      .orderBy(asc(board.position)),
    db
      .select({
        slug: resource.slug,
        title: resource.title,
        summary: resource.summary,
        coverUrl: resource.coverUrl,
      })
      .from(resource)
      .where(eq(resource.published, true))
      .orderBy(asc(resource.position), asc(resource.createdAt))
      .limit(3),
    db
      .select({ id: course.id, title: course.title, description: course.description, coverUrl: course.coverUrl })
      .from(course)
      .where(eq(course.published, true))
      .orderBy(asc(course.position), asc(course.createdAt))
      .limit(3),
    // Solo título y fecha: nunca el enlace de la sesión.
    db
      .select({ id: event.id, title: event.title, startsAt: event.startsAt })
      .from(event)
      .where(gt(event.startsAt, now))
      .orderBy(asc(event.startsAt))
      .limit(3),
  ]);

  return { counts, boards, resources, courses, events };
}

export type LandingData = Awaited<ReturnType<typeof getLandingData>>;
