import { and, eq, gte, inArray, like, sql } from "drizzle-orm";
import { db, schema } from "@/db";

type Tx = Pick<typeof db, "select" | "insert" | "update" | "delete">;
type PointType = (typeof schema.pointEvent.$inferInsert)["type"];

export const POINTS = { post: 2, comment: 1, like: 1, lesson: 5, event: 10, streak: 1 } as const;
// Tope diario de puntos por publicar + comentar (anti-spam).
export const DAILY_CAP = 10;

/** Suma puntos una sola vez por (usuario, tipo, ref). Devuelve true si los otorgó. */
export async function award(
  tx: Tx,
  userId: string,
  type: PointType,
  refId: string,
  points: number = POINTS[type],
) {
  if (type === "post" || type === "comment") {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const [{ total }] = await tx
      .select({ total: sql<number>`coalesce(sum(${schema.pointEvent.points}), 0)::int` })
      .from(schema.pointEvent)
      .where(
        and(
          eq(schema.pointEvent.userId, userId),
          inArray(schema.pointEvent.type, ["post", "comment"]),
          gte(schema.pointEvent.createdAt, startOfDay),
        ),
      );
    if (total + points > DAILY_CAP) return false;
  }
  const inserted = await tx
    .insert(schema.pointEvent)
    .values({ userId, type, refId, points })
    .onConflictDoNothing()
    .returning({ id: schema.pointEvent.id });
  if (!inserted.length) return false;
  await tx
    .update(schema.user)
    .set({ points: sql`${schema.user.points} + ${points}` })
    .where(eq(schema.user.id, userId));
  return true;
}

/** Revierte eventos de puntos (por ref exacta o por prefijo). */
export async function revoke(
  tx: Tx,
  type: PointType,
  ref: { refId?: string; prefix?: string; refIds?: string[] },
) {
  const match = ref.refId
    ? eq(schema.pointEvent.refId, ref.refId)
    : ref.prefix
      ? like(schema.pointEvent.refId, `${ref.prefix}%`)
      : inArray(schema.pointEvent.refId, ref.refIds?.length ? ref.refIds : ["-"]);
  const removed = await tx
    .delete(schema.pointEvent)
    .where(and(eq(schema.pointEvent.type, type), match))
    .returning({ userId: schema.pointEvent.userId, points: schema.pointEvent.points });
  for (const r of removed) {
    await tx
      .update(schema.user)
      .set({ points: sql`greatest(${schema.user.points} - ${r.points}, 0)` })
      .where(eq(schema.user.id, r.userId));
  }
}
