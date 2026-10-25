import { and, eq, isNull, ne, or } from "drizzle-orm";
import { db, schema } from "@/db";
import { award } from "@/lib/points";

export const TZ = process.env.APP_TIMEZONE ?? "America/Bogota";

/** Fecha local (YYYY-MM-DD) en la zona horaria de la comunidad. */
export function dateKey(d = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(d);
}

function previousDay(key: string) {
  const d = new Date(`${key}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

/**
 * Devuelve también cuántos días llevaba sin entrar (solo en la primera visita del día).
 * Registra actividad del día: +1 punto por día activo y +5 de bonus cada 7 días seguidos.
 * Es barato: si ya se registró hoy, no escribe nada.
 */
export async function touchStreak(userId: string) {
  const out = { streak: 0, daysAway: 0 };
  const today = dateKey();
  const [u] = await db
    .select({ streak: schema.user.streak, last: schema.user.lastActiveDate })
    .from(schema.user)
    .where(eq(schema.user.id, userId));
  if (!u) return out;
  if (u.last === today) return { ...out, streak: u.streak };
  if (u.last) out.daysAway = Math.round((Date.parse(`${today}T00:00:00Z`) - Date.parse(`${u.last}T00:00:00Z`)) / 86_400_000);

  const streak = u.last === previousDay(today) ? u.streak + 1 : 1;
  await db.transaction(async (tx) => {
    // El UPDATE condicional evita doble premio si dos pestañas entran a la vez.
    const won = await tx
      .update(schema.user)
      .set({ streak, lastActiveDate: today })
      .where(
        and(
          eq(schema.user.id, userId),
          or(isNull(schema.user.lastActiveDate), ne(schema.user.lastActiveDate, today)),
        ),
      )
      .returning({ id: schema.user.id });
    if (!won.length) return;
    await award(tx, userId, "streak", `d:${today}`);
    if (streak % 7 === 0) await award(tx, userId, "streak", `b:${today}`, 5);
  });
  return { ...out, streak };
}
