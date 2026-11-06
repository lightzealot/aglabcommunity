import { and, count, lte } from "drizzle-orm";
import { db, schema } from "@/db";

/** Número de miembro: cuántas cuentas se crearon hasta la tuya (la tuya incluida). */
export async function memberNumber(createdAt: Date) {
  const [row] = await db
    .select({ n: count() })
    .from(schema.user)
    .where(and(lte(schema.user.createdAt, createdAt)));
  return row?.n ?? 1;
}
