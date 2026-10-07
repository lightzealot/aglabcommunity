import { sql } from "drizzle-orm";
import { db } from "@/db";
import { dateKey, TZ } from "@/lib/streak";

export type Period = 7 | 30 | 90;
export const PERIODS: Period[] = [7, 30, 90];

export type Row = {
  id: string;
  name: string;
  total: number;
  /** Puntos ganados en el periodo elegido. */
  gained: number;
  rank: number;
  /** Puestos que subió (+) o bajó (-) frente a hace 7 días. */
  move: number;
  /** Puntos ganados en los últimos 7 días. */
  week: number;
  /** Acumulado al cierre de cada día del periodo. */
  values: number[];
};

function addDays(key: string, n: number) {
  const d = new Date(`${key}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export async function getRanking(period: Period) {
  const today = dateKey();
  const days = Array.from({ length: period }, (_, i) => addDays(today, i - (period - 1)));
  const weekStart = addDays(today, -6);

  const { rows } = await db.execute<{ user_id: string; name: string; day: string; pts: number }>(sql`
    select e.user_id, u.name,
           ((e.created_at at time zone 'UTC') at time zone ${TZ})::date::text as day,
           sum(e.points)::int as pts
    from point_event e
    join "user" u on u.id = e.user_id
    where u.status = 'approved' and u.role = 'member'
    group by 1, 2, 3
  `);

  const byUser = new Map<string, { name: string; perDay: Map<string, number> }>();
  for (const r of rows) {
    const u = byUser.get(r.user_id) ?? { name: r.name, perDay: new Map() };
    u.perDay.set(r.day, (u.perDay.get(r.day) ?? 0) + Number(r.pts));
    byUser.set(r.user_id, u);
  }

  const all = [...byUser.entries()].map(([id, u]) => {
    let total = 0;
    let before = 0; // acumulado antes de empezar el periodo
    let week = 0;
    for (const [day, pts] of u.perDay) {
      total += pts;
      if (day < days[0]) before += pts;
      if (day >= weekStart) week += pts;
    }
    const values: number[] = [];
    let acc = before;
    for (const d of days) {
      acc += u.perDay.get(d) ?? 0;
      values.push(acc);
    }
    return { id, name: u.name, total, gained: total - before, week, values };
  });

  const order = (a: { total: number; name: string }, b: { total: number; name: string }) =>
    b.total - a.total || a.name.localeCompare(b.name, "es");
  const now = all.filter((r) => r.total > 0).sort(order);
  const prevRank = new Map(
    all
      .map((r) => ({ ...r, total: r.total - r.week }))
      .filter((r) => r.total > 0)
      .sort(order)
      .map((r, i) => [r.id, i + 1] as const),
  );

  const board: Row[] = now.map((r, i) => ({
    ...r,
    rank: i + 1,
    // Quien no estaba en el ranking hace una semana cuenta como "nuevo" (sin movimiento).
    move: prevRank.has(r.id) ? prevRank.get(r.id)! - (i + 1) : 0,
  }));

  return { days, board };
}
