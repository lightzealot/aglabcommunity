import Link from "next/link";
import { ChevronIcon, GridIcon, ListIcon } from "@/components/icons";
import { LocalTime } from "@/components/local-time";
import { clock, monthGrid, parseMonth, shiftMonth, tzCity } from "@/lib/calendar";
import { listEvents } from "@/lib/events";
import { requireMember } from "@/lib/session";
import { dateKey } from "@/lib/streak";

export const metadata = { title: "Calendario" };

const DOW = ["lun.", "mar.", "mié.", "jue.", "vie.", "sáb.", "dom."];

export default async function CalendarioPage({
  searchParams,
}: {
  searchParams: Promise<{ m?: string; view?: string }>;
}) {
  const { user } = await requireMember();
  const sp = await searchParams;
  const view = sp.view === "list" ? "list" : "month";
  const month = parseMonth(sp.m);
  const today = dateKey();
  const thisMonth = today.slice(0, 7);

  const [upcoming, past, weeks] = await Promise.all([
    listEvents(user.id, "upcoming"),
    listEvents(user.id, "past", 10),
    view === "month" ? monthGrid(month) : Promise.resolve([]),
  ]);

  const monthLabel = new Intl.DateTimeFormat("es", { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${month}-01T12:00:00Z`),
  );
  const nowLabel = clock(new Date());
  const q = (m: string, v = view) => `/calendario?${new URLSearchParams({ ...(m !== thisMonth ? { m } : {}), ...(v === "list" ? { view: "list" } : {}) })}`;

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
      {isPast ? e.attended && <span className="label">✓ Asististe</span> : e.going && <span className="label">Confirmado</span>}
    </Link>
  );

  const list = (
    <div className="space-y-6">
      <div className="space-y-3">
        {upcoming.map((e) => card(e))}
        {upcoming.length === 0 && <p className="card p-8 text-center text-sm text-ash">No hay eventos programados por ahora.</p>}
      </div>
      {past.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-ash">Anteriores</h2>
          <div className="space-y-3">{past.map((e) => card(e, true))}</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl">
      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-hairline p-3">
          {view === "month" ? (
            <>
              <Link href={q(thisMonth)} className="rounded-full border border-hairline px-4 py-1.5 text-sm hover:border-ink">
                Hoy
              </Link>
              <div className="mx-auto flex items-center gap-3">
                <Link href={q(shiftMonth(month, -1))} className="rounded-full p-1.5 text-ash hover:bg-veil" aria-label="Mes anterior">
                  <ChevronIcon dir="left" />
                </Link>
                <div className="text-center">
                  <p className="text-sm font-semibold first-letter:uppercase">{monthLabel}</p>
                  <p className="text-xs text-hollow">
                    {nowLabel} hora de {tzCity}
                  </p>
                </div>
                <Link href={q(shiftMonth(month, 1))} className="rounded-full p-1.5 text-ash hover:bg-veil" aria-label="Mes siguiente">
                  <ChevronIcon dir="right" />
                </Link>
              </div>
            </>
          ) : (
            <p className="mx-auto text-sm font-semibold">Próximos eventos</p>
          )}
          <div className="flex overflow-hidden rounded-lg border border-hairline">
            <Link href={q(month, "list")} aria-label="Vista de lista" className={`p-2 ${view === "list" ? "bg-veil text-ink" : "text-hollow hover:text-ink"}`}>
              <ListIcon />
            </Link>
            <Link href={q(month, "month")} aria-label="Vista de mes" className={`p-2 ${view === "month" ? "bg-veil text-ink" : "text-hollow hover:text-ink"}`}>
              <GridIcon />
            </Link>
          </div>
        </div>

        {view === "month" ? (
          <>
            {/* En pantallas pequeñas la cuadrícula no cabe: se muestra la lista */}
            <div className="hidden md:block">
              <div className="grid grid-cols-7 border-b border-hairline text-center text-xs font-semibold text-ash">
                {DOW.map((d) => (
                  <div key={d} className="py-2">{d}</div>
                ))}
              </div>
              {weeks.map((w, i) => (
                <div key={i} className="grid grid-cols-7 border-b border-hairline last:border-b-0">
                  {w.map((d) => (
                    <div key={d.key} className="min-h-24 border-r border-hairline p-1.5 last:border-r-0">
                      <p className={`mb-1 text-xs ${d.inMonth ? "text-ash" : "text-hollow/60"}`}>
                        {d.key === today ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent font-semibold text-white">
                            {d.day}
                          </span>
                        ) : (
                          d.day
                        )}
                      </p>
                      <div className="space-y-0.5">
                        {d.events.map((e) => (
                          <Link
                            key={e.id}
                            href={`/calendario/${e.id}`}
                            className={`block truncate text-[11px] leading-tight font-semibold text-accent hover:underline ${d.inMonth ? "" : "opacity-50"} ${d.key < today ? "opacity-60" : ""}`}
                            title={e.title}
                          >
                            {clock(e.startsAt)} - {e.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="p-3 md:hidden">{list}</div>
          </>
        ) : (
          <div className="p-3 sm:p-4">{list}</div>
        )}
      </div>
    </div>
  );
}
