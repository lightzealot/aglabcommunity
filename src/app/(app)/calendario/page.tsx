import Link from "next/link";
import { LocalTime } from "@/components/local-time";
import { listEvents } from "@/lib/events";
import { requireMember } from "@/lib/session";

export const metadata = { title: "Calendario" };

export default async function CalendarioPage() {
  const { user } = await requireMember();
  const [upcoming, past] = await Promise.all([listEvents(user.id, "upcoming"), listEvents(user.id, "past", 10)]);

  const card = (e: (typeof upcoming)[number], isPast = false) => (
    <Link key={e.id} href={`/calendario/${e.id}`} className="card flex items-center gap-4 p-4 transition hover:border-accent">
      <div className="min-w-0 flex-1">
        <p className="label !text-ash">
          <LocalTime iso={e.startsAt.toISOString()} />
        </p>
        <h2 className="mt-0.5 text-lg font-semibold">{e.title}</h2>
        <p className="text-xs text-hollow">
          {e.durationMin} min · {e.rsvps} confirmado{e.rsvps === 1 ? "" : "s"}
        </p>
      </div>
      {isPast
        ? e.attended && <span className="label">✓ Asististe</span>
        : e.going && <span className="label">Confirmado</span>}
    </Link>
  );

  return (
    <>
      <p className="label mb-2">En vivo</p>
      <h1 className="display text-5xl">
        Calendario<span className="text-accent">.</span>
      </h1>

      <div className="mt-6 space-y-3">
        {upcoming.map((e) => card(e))}
        {upcoming.length === 0 && (
          <p className="card p-8 text-center text-sm text-ash">No hay eventos programados por ahora.</p>
        )}
      </div>

      {past.length > 0 && (
        <>
          <h2 className="display mt-10 mb-3 text-3xl">Anteriores<span className="text-accent">.</span></h2>
          <div className="space-y-3">{past.map((e) => card(e, true))}</div>
        </>
      )}
    </>
  );
}
