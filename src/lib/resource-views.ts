import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { sql } from "drizzle-orm";
import { db, schema } from "@/db";
import { dateKey } from "@/lib/streak";

const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|curl|wget|python|headless|lighthouse/i;

/** Cuenta una visita por persona y día (los robots y las recargas no suman). */
export async function recordResourceView(resourceId: string, memberId?: string) {
  try {
    const h = await headers();
    const ua = h.get("user-agent") ?? "";
    if (!ua || BOT.test(ua)) return;
    let viewer = memberId;
    if (!viewer) {
      const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "";
      const salt = process.env.BETTER_AUTH_SECRET ?? "views";
      viewer = createHash("sha256").update(`${salt}|${ip}|${ua}`).digest("hex").slice(0, 24);
    }
    await db
      .insert(schema.resourceView)
      .values({ resourceId, viewer, kind: memberId ? "member" : "visitor", day: dateKey() })
      .onConflictDoNothing();
  } catch (e) {
    console.error("[views] no se pudo registrar", e);
  }
}

/** Personas distintas que han visto cada recurso. */
export async function viewCounts() {
  const rows = await db
    .select({
      resourceId: schema.resourceView.resourceId,
      people: sql<number>`count(distinct ${schema.resourceView.viewer})::int`,
    })
    .from(schema.resourceView)
    .groupBy(schema.resourceView.resourceId);
  return new Map(rows.map((r) => [r.resourceId, r.people]));
}

export async function viewStats() {
  const rows = await db.execute<{ id: string; total: number; members: number; today: number; week: number }>(sql`
    select resource_id as id,
      count(distinct viewer)::int as total,
      count(distinct viewer) filter (where kind = 'member')::int as members,
      count(*) filter (where day = ${dateKey()})::int as today,
      count(*) filter (where day >= ${dateKey(new Date(Date.now() - 6 * 86_400_000))})::int as week
    from resource_view group by resource_id
  `);
  return new Map(rows.rows.map((r) => [r.id, r]));
}

export const fmtViews = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n));
