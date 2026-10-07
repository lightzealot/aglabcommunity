import { db, schema } from "@/db";

type Tx = Pick<typeof db, "insert">;

/** Crea notificaciones in-app. `href` debe ser una ruta interna (empieza con "/"). */
export async function notify(
  userIds: string | string[],
  n: { type: string; title: string; body?: string; href?: string },
  tx: Tx = db,
) {
  const ids = [...new Set(Array.isArray(userIds) ? userIds : [userIds])];
  if (!ids.length) return;
  await tx.insert(schema.notification).values(
    ids.map((userId) => ({
      userId,
      type: n.type,
      title: n.title.slice(0, 200),
      body: (n.body ?? "").slice(0, 300),
      href: n.href ?? null,
    })),
  );
}

export const isInternalPath = (p: string | null | undefined): p is string =>
  !!p && p.startsWith("/") && !p.startsWith("//");
