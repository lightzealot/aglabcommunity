import { and, eq, sql } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LocalTime } from "@/components/local-time";
import { db, schema } from "@/db";
import { UUID_RE } from "@/lib/courses";
import { googleCalendarUrl, hasEnded } from "@/lib/events";
import { requireMember } from "@/lib/session";
import { toggleRsvp } from "../actions";

export default async function EventoPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = await requireMember();
  const { id } = await params;
  if (!UUID_RE.test(id)) notFound();

  const [ev] = await db.select().from(schema.event).where(eq(schema.event.id, id));
  if (!ev) notFound();

  const [rsvp] = await db
    .select()
    .from(schema.eventRsvp)
    .where(and(eq(schema.eventRsvp.eventId, id), eq(schema.eventRsvp.userId, user.id)));
  const [att] = await db
    .select()
    .from(schema.eventAttendance)
    .where(and(eq(schema.eventAttendance.eventId, id), eq(schema.eventAttendance.userId, user.id)));
  const [{ n }] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(schema.eventRsvp)
    .where(eq(schema.eventRsvp.eventId, id));

  const finished = hasEnded(ev);

  return (
    <>
      <Link href="/calendario" className="text-sm text-ash hover:text-ink">← Calendario</Link>
      <p className="label mt-4 !text-ash">
        <LocalTime iso={ev.startsAt.toISOString()} /> · {ev.durationMin} min
      </p>
      <h1 className="display mt-1 text-5xl">
        {ev.title}
        <span className="text-accent">.</span>
      </h1>
      {ev.description && <p className="mt-4 max-w-2xl break-words whitespace-pre-line text-ash">{ev.description}</p>}

      <div className="card mt-6 flex flex-wrap items-center gap-3 p-4">
        {att ? (
          <span className="label">✓ Asististe · +10 pts</span>
        ) : finished ? (
          <span className="text-sm text-ash">Este evento ya terminó.</span>
        ) : (
          <>
            <form action={toggleRsvp}>
              <input type="hidden" name="eventId" value={ev.id} />
              <button className={`btn ${rsvp ? "btn-ghost" : "btn-primary"}`}>
                {rsvp ? "✓ Asistiré (cancelar)" : "Confirmar asistencia"}
              </button>
            </form>
            {ev.link && (
              <a href={ev.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Unirme al evento ↗
              </a>
            )}
            <a href={googleCalendarUrl(ev)} target="_blank" rel="noopener noreferrer" className="text-sm text-accent underline">
              Añadir a Google Calendar
            </a>
          </>
        )}
        <span className="ml-auto text-xs text-hollow">{n} confirmado{n === 1 ? "" : "s"}</span>
      </div>
    </>
  );
}
