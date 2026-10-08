import { and, asc, eq, isNull, lt, or, sql } from "drizzle-orm";
import { db, schema } from "@/db";
import { getSetting } from "@/lib/settings";

export const ONLINE_WINDOW_MIN = 5;

export const onlineSince = () => new Date(Date.now() - ONLINE_WINDOW_MIN * 60_000);

/** Datos de la tarjeta lateral y de "Acerca de". */
export async function getCommunity() {
  const [description, coverUrl] = await Promise.all([getSetting("description"), getSetting("cover_url")]);
  const { user } = schema;
  const [stats] = await db
    .select({
      members: sql<number>`count(*) filter (where ${user.status} = 'approved')::int`,
      online: sql<number>`count(*) filter (where ${user.status} = 'approved' and ${user.lastSeenAt} > ${onlineSince().toISOString()}::timestamp)::int`,
      admins: sql<number>`count(*) filter (where ${user.status} = 'approved' and ${user.role} = 'admin')::int`,
    })
    .from(user);
  const admins = await db
    .select({ id: user.id, name: user.name, image: user.image, points: user.points })
    .from(user)
    .where(and(eq(user.status, "approved"), eq(user.role, "admin")))
    .orderBy(asc(user.createdAt))
    .limit(8);
  return {
    name: "AG Lab",
    description:
      description ?? "La comunidad de Andrés Gómez para implementar IA y automatización en tu negocio.",
    coverUrl,
    ...stats,
    adminList: admins,
  };
}


/** Marca al usuario como activo; escribe como máximo una vez cada 2 minutos. */
export async function touchPresence(userId: string) {
  await db
    .update(schema.user)
    .set({ lastSeenAt: new Date() })
    .where(
      and(
        eq(schema.user.id, userId),
        or(isNull(schema.user.lastSeenAt), lt(schema.user.lastSeenAt, new Date(Date.now() - 2 * 60_000))),
      ),
    );
}
