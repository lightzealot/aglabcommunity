import { and, eq, sql } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InviteShare } from "@/components/invite-share";
import { Avatar } from "@/components/avatar";
import { EventCommentForm } from "@/components/event-comment-form";
import { timeAgo } from "@/lib/time";
import { LocalTime } from "@/components/local-time";
import { db, schema } from "@/db";
import { UUID_RE } from "@/lib/courses";
import { googleCalendarUrl, hasEnded } from "@/lib/events";
import { requireMember } from "@/lib/session";
import { deleteEventComment, toggleRsvp } from "../actions";

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
  const comments = await db
    .select({
      id: schema.eventComment.id,
      body: schema.eventComment.body,
      createdAt: schema.eventComment.createdAt,
      authorId: schema.eventComment.authorId,
      name: schema.user.name,
      image: schema.user.image,
    })
    .from(schema.eventComment)
    .innerJoin(schema.user, eq(schema.user.id, schema.eventComment.authorId))
    .where(eq(schema.eventComment.eventId, id))
    .orderBy(schema.eventComment.createdAt);

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

      {!finished && (
        <div className="card mt-4 flex flex-wrap items-center gap-3 p-4">
          <div className="min-w-0 flex-1 text-sm">
            <p className="font-semibold">Trae a alguien contigo</p>
            <p className="text-ash">
              Comparte la invitación: quien la reciba ve el evento, se une gratis a la comunidad y queda con su lugar confirmado.
            </p>
          </div>
          <InviteShare
            path={`/evento/${ev.id}?ref=${encodeURIComponent(user.id)}`}
            text={`Te invito a "${ev.title}" en AG Lab, la comunidad de IA en español. Únete gratis:`}
          />
        </div>
      )}

      <section id="comentarios" className="mt-8">
        <h2 className="font-semibold">Comentarios · {comments.length}</h2>
        <div className="card mt-3 p-4">
          <EventCommentForm eventId={ev.id} />
        </div>
        <ul className="mt-4 space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-3">
              <Link href={`/u/${c.authorId}`} className="shrink-0">
                <Avatar name={c.name} image={c.image} size={36} />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  <Link href={`/u/${c.authorId}`} className="font-semibold hover:text-accent">{c.name}</Link>
                  <span className="ml-2 text-xs text-hollow">{timeAgo(c.createdAt)}</span>
                </p>
                <p className="mt-0.5 break-words whitespace-pre-line text-sm">{c.body}</p>
                {(c.authorId === user.id || user.role === "admin") && (
                  <form action={deleteEventComment} className="mt-1">
                    <input type="hidden" name="id" value={c.id} />
                    <button className="text-xs text-hollow hover:text-red-600">Borrar</button>
                  </form>
                )}
              </div>
            </li>
          ))}
          {comments.length === 0 && <li className="text-sm text-ash">Sé el primero en comentar.</li>}
        </ul>
      </section>
    </>
  );
}
