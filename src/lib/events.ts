import { asc, desc, gt, lte, sql } from "drizzle-orm";
import { db, schema } from "@/db";

export async function listEvents(userId: string, scope: "upcoming" | "past", limit = 30) {
  const { event } = schema;
  const now = new Date();
  // Un evento sigue "próximo" hasta que termina.
  const endsAt = sql`${event.startsAt} + (${event.durationMin} * interval '1 minute')`;
  return db
    .select({
      id: event.id,
      title: event.title,
      description: event.description,
      startsAt: event.startsAt,
      durationMin: event.durationMin,
      rsvps: sql<number>`(select count(*)::int from event_rsvp r where r.event_id = "event"."id")`,
      going: sql<boolean>`exists(select 1 from event_rsvp r where r.event_id = "event"."id" and r.user_id = ${userId})`,
      attended: sql<boolean>`exists(select 1 from event_attendance a where a.event_id = "event"."id" and a.user_id = ${userId})`,
    })
    .from(event)
    .where(scope === "upcoming" ? gt(endsAt, now) : lte(endsAt, now))
    .orderBy(scope === "upcoming" ? asc(event.startsAt) : desc(event.startsAt))
    .limit(limit);
}

export function googleCalendarUrl(ev: {
  title: string;
  description: string;
  startsAt: Date;
  durationMin: number;
  link: string | null;
}) {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const end = new Date(ev.startsAt.getTime() + ev.durationMin * 60_000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.title,
    dates: `${fmt(ev.startsAt)}/${fmt(end)}`,
    details: [ev.description, ev.link].filter(Boolean).join("\n\n"),
  });
  if (ev.link) params.set("location", ev.link);
  return `https://calendar.google.com/calendar/render?${params}`;
}

export function hasEnded(ev: { startsAt: Date; durationMin: number }) {
  return ev.startsAt.getTime() + ev.durationMin * 60_000 < Date.now();
}
