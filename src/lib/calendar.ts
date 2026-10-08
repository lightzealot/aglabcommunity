import { and, asc, gte, lt } from "drizzle-orm";
import { db, schema } from "@/db";
import { dateKey, TZ } from "@/lib/streak";

export const tzCity = TZ.split("/").pop()!.replace(/_/g, " ");

/** "2pm", "2:30pm": hora corta en la zona horaria de la comunidad. */
export function clock(d: Date) {
  return new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit", hour12: true })
    .format(d)
    .replace(":00", "")
    .replace(/\s/g, "")
    .toLowerCase();
}

const addDays = (key: string, n: number) => {
  const d = new Date(`${key}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

/** Mes "YYYY-MM" (el actual si el parámetro no es válido). */
export function parseMonth(m: string | undefined) {
  const ok = m && /^\d{4}-(0[1-9]|1[0-2])$/.test(m);
  return ok ? m : dateKey().slice(0, 7);
}

export function shiftMonth(m: string, delta: number) {
  const [y, mo] = m.split("-").map(Number);
  const d = new Date(Date.UTC(y, mo - 1 + delta, 1));
  return d.toISOString().slice(0, 7);
}

export type CalEvent = { id: string; title: string; startsAt: Date };

/** Semanas (lunes a domingo) que cubren el mes, con los eventos de cada día. */
export async function monthGrid(month: string) {
  const first = `${month}-01`;
  const firstDow = (new Date(`${first}T00:00:00Z`).getUTCDay() + 6) % 7; // lunes = 0
  const gridStart = addDays(first, -firstDow);
  const lastOfMonth = addDays(shiftMonth(month, 1) + "-01", -1);
  const lastDow = (new Date(`${lastOfMonth}T00:00:00Z`).getUTCDay() + 6) % 7;
  const gridEnd = addDays(lastOfMonth, 6 - lastDow);
  const total = Math.round((Date.parse(gridEnd) - Date.parse(gridStart)) / 86_400_000) + 1;

  // Margen de un día a cada lado para cubrir diferencias de zona horaria.
  const from = new Date(`${addDays(gridStart, -1)}T00:00:00Z`);
  const to = new Date(`${addDays(gridEnd, 2)}T00:00:00Z`);
  const events = await db
    .select({ id: schema.event.id, title: schema.event.title, startsAt: schema.event.startsAt })
    .from(schema.event)
    .where(and(gte(schema.event.startsAt, from), lt(schema.event.startsAt, to)))
    .orderBy(asc(schema.event.startsAt));

  const byDay = new Map<string, CalEvent[]>();
  for (const e of events) {
    const k = dateKey(e.startsAt);
    byDay.set(k, [...(byDay.get(k) ?? []), e]);
  }
  const days = Array.from({ length: total }, (_, i) => {
    const key = addDays(gridStart, i);
    return { key, day: Number(key.slice(8)), inMonth: key.startsWith(month), events: byDay.get(key) ?? [] };
  });
  const weeks: (typeof days)[] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
}
