import { asc, eq, sql } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db, schema } from "@/db";
import { UUID_RE } from "@/lib/courses";
import { requireAdmin } from "@/lib/session";
import { deleteEvent, saveAttendance } from "../actions";
import { EventForm } from "../form";

export default async function AdminEventoPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!UUID_RE.test(id)) notFound();

  const [ev] = await db.select().from(schema.event).where(eq(schema.event.id, id));
  if (!ev) notFound();

  const members = await db
    .select({
      id: schema.user.id,
      name: schema.user.name,
      email: schema.user.email,
      rsvp: sql<boolean>`exists(select 1 from event_rsvp r where r.event_id = ${id} and r.user_id = "user"."id")`,
      attended: sql<boolean>`exists(select 1 from event_attendance a where a.event_id = ${id} and a.user_id = "user"."id")`,
    })
    .from(schema.user)
    .where(eq(schema.user.status, "approved"))
    .orderBy(asc(schema.user.name));
  // Primero quienes confirmaron, luego el resto.
  members.sort((a, b) => Number(b.rsvp) - Number(a.rsvp));

  return (
    <>
      <Link href="/admin/eventos" className="text-sm text-ash hover:text-ink">← Eventos</Link>
      <h1 className="display mt-3 mb-6 text-5xl">
        {ev.title}
        <span className="text-accent">.</span>
      </h1>
      <EventForm
        ev={{
          id: ev.id,
          title: ev.title,
          description: ev.description,
          startsAtIso: ev.startsAt.toISOString(),
          durationMin: ev.durationMin,
          link: ev.link ?? "",
        }}
      />

      <h2 className="display mt-10 mb-1 text-3xl">Asistencia<span className="text-accent">.</span></h2>
      <p className="mb-3 text-sm text-ash">
        Marca quién asistió y guarda: cada asistente recibe +10 puntos y una notificación. Si desmarcas a alguien, se le quitan.
      </p>
      <form action={saveAttendance} className="card">
        <input type="hidden" name="eventId" value={ev.id} />
        <ul className="divide-y divide-hairline">
          {members.map((m) => (
            <li key={m.id}>
              <label className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm hover:bg-veil">
                <input type="checkbox" name="userIds" value={m.id} defaultChecked={m.attended} className="accent-[#1961d5]" />
                <span className="flex-1">{m.name} <span className="text-ash">· {m.email}</span></span>
                {m.rsvp && <span className="label">Confirmó</span>}
              </label>
            </li>
          ))}
          {members.length === 0 && <li className="p-6 text-center text-sm text-ash">No hay miembros aprobados.</li>}
        </ul>
        <div className="border-t border-hairline p-3">
          <button className="btn btn-primary !py-2">Guardar asistencia</button>
        </div>
      </form>

      <form action={deleteEvent} className="mt-10">
        <input type="hidden" name="id" value={ev.id} />
        <button className="btn btn-ghost !border-red-300 !text-red-600">Eliminar evento</button>
      </form>
    </>
  );
}
