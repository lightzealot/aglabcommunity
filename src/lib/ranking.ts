import { sql } from "drizzle-orm";
import { db } from "@/db";
import { dateKey, TZ } from "@/lib/streak";

export type Period = 7 | 30 | 90;
export const PERIODS: Period[] = [7, 30, 90];

type Daily = Map<string, { name: string; image: string | null; perDay: Map<string, number> }>;

function addDays(key: string, n: number) {
  const d = new Date(`${key}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Puntos por usuario y día (solo miembros aprobados, no el admin). */
async function loadDaily(): Promise<Daily> {
  const { rows } = await db.execute<{
    user_id: string;
    name: string;
    image: string | null;
    day: string;
    pts: number;
  }>(sql`
    select e.user_id, u.name, u.image,
           ((e.created_at at time zone 'UTC') at time zone ${TZ})::date::text as day,
           sum(e.points)::int as pts
    from point_event e
    join "user" u on u.id = e.user_id
    where u.status = 'approved' and u.role = 'member'
    group by 1, 2, 3, 4
  `);
  const byUser: Daily = new Map();
  for (const r of rows) {
    const u = byUser.get(r.user_id) ?? { name: r.name, image: r.image, perDay: new Map() };
    u.perDay.set(r.day, (u.perDay.get(r.day) ?? 0) + Number(r.pts));
    byUser.set(r.user_id, u);
  }
  return byUser;
}

const byPoints = (a: { points: number; name: string }, b: { points: number; name: string }) =>
  b.points - a.points || a.name.localeCompare(b.name, "es");

export type Entry = { id: string; name: string; image: string | null; points: number };

/** Tablas de clasificación: 7 días, 30 días y de todos los tiempos. */
export async function getLeaderboards(limit = 10) {
  const today = dateKey();
  const since = { d7: addDays(today, -6), d30: addDays(today, -29) };
  const byUser = await loadDaily();
  const build = (from?: string): Entry[] =>
    [...byUser.entries()]
      .map(([id, u]) => {
        let points = 0;
        for (const [day, pts] of u.perDay) if (!from || day >= from) points += pts;
        return { id, name: u.name, image: u.image, points };
      })
      .filter((e) => e.points > 0)
      .sort(byPoints)
      .slice(0, limit);
  return { d7: build(since.d7), d30: build(since.d30), all: build() };
}

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

/** Datos para la gráfica de puntos acumulados y el ticker semanal. */
export async function getRanking(period: Period) {
  const today = dateKey();
  const days = Array.from({ length: period }, (_, i) => addDays(today, i - (period - 1)));
  const weekStart = addDays(today, -6);
  const byUser = await loadDaily();

  const all = [...byUser.entries()].map(([id, u]) => {
    let total = 0;
    let before = 0;
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
    move: prevRank.has(r.id) ? prevRank.get(r.id)! - (i + 1) : 0,
  }));
  return { days, board };
}
