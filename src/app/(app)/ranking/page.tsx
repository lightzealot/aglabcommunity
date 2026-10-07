import Link from "next/link";
import { PointsChart, SERIES_COLORS } from "@/components/points-chart";
import { getRanking, PERIODS, type Period } from "@/lib/ranking";
import { requireMember } from "@/lib/session";

export const metadata = { title: "Ranking" };

const UP = "#2f9e44";
const DOWN = "#e03131";

function Move({ move }: { move: number }) {
  if (move === 0) return <span className="text-hollow">▬</span>;
  return (
    <span style={{ color: move > 0 ? UP : DOWN }} className="font-semibold">
      {move > 0 ? "▲" : "▼"} {Math.abs(move)}
    </span>
  );
}

export default async function RankingPage({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  const { user } = await requireMember();
  const { p } = await searchParams;
  const period = (PERIODS.find((x) => String(x) === p) ?? 30) as Period;

  const { days, board } = await getRanking(period);
  const top = board.slice(0, 5);
  const rows = board.slice(0, 20);
  const me = board.find((r) => r.id === user.id);

  return (
    <>
      <p className="label mb-2">Gamificación</p>
      <h1 className="display text-5xl">
        Ranking<span className="text-accent">.</span>
      </h1>
      <p className="mt-2 text-sm text-ash">
        {me ? `Vas en el puesto ${me.rank} con ${me.total} punto${me.total === 1 ? "" : "s"}.` : "Participa para entrar al ranking: publica, comenta, completa lecciones y asiste a eventos."}
      </p>

      {board.length === 0 ? (
        <p className="card mt-6 p-8 text-center text-sm text-ash">Todavía no hay puntos. ¡Sé el primero en aparecer aquí!</p>
      ) : (
        <>
          {/* Ticker: quién subió o bajó en la última semana */}
          <div className="card mt-6 flex gap-5 overflow-x-auto px-4 py-3 text-sm whitespace-nowrap">
            <span className="label shrink-0 !text-ash">Esta semana</span>
            {board.slice(0, 10).map((r) => (
              <span key={r.id} className="flex shrink-0 items-center gap-1.5">
                <span className="text-hollow">#{r.rank}</span>
                <span className="font-semibold">{r.name.split(" ")[0]}</span>
                <Move move={r.move} />
                <span className="text-ash">{r.week > 0 ? `+${r.week} pts` : "0 pts"}</span>
              </span>
            ))}
          </div>

          <section className="card mt-4 p-4 sm:p-6">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <div>
                <h2 className="text-lg font-semibold">Puntos acumulados</h2>
                <p className="text-sm text-ash">Los 5 primeros del ranking. Cada línea es una persona.</p>
              </div>
              <nav className="ml-auto flex gap-1.5" aria-label="Periodo">
                {PERIODS.map((x) => (
                  <Link
                    key={x}
                    href={x === 30 ? "/ranking" : `/ranking?p=${x}`}
                    className={`rounded-full border px-3 py-1 text-sm ${
                      x === period ? "border-accent bg-accent text-white" : "border-hairline text-ash hover:text-ink"
                    }`}
                  >
                    {x} días
                  </Link>
                ))}
              </nav>
            </div>
            <PointsChart days={days} series={top} />

            {/* Leyenda con lo ganado en el periodo */}
            <ul className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
              {top.map((r, i) => (
                <li key={r.id} className="flex items-center gap-2">
                  <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: SERIES_COLORS[i % SERIES_COLORS.length] }} />
                  <span className="flex-1 truncate font-semibold">{r.name}</span>
                  <span className="text-ash">{r.total} pts</span>
                  <span className="w-16 text-right font-semibold" style={{ color: r.gained > 0 ? UP : "var(--hollow)" }}>
                    {r.gained > 0 ? `+${r.gained}` : "0"}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-hollow">Lo verde es lo que ganó cada persona en los últimos {period} días.</p>
          </section>

          <section className="card mt-4 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-sidebar text-left">
                <tr className="label !text-ash">
                  <th className="px-4 py-2.5 font-normal">#</th>
                  <th className="px-2 py-2.5 font-normal">Miembro</th>
                  <th className="px-2 py-2.5 text-right font-normal">Puntos</th>
                  <th className="px-4 py-2.5 text-right font-normal">Semana</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {rows.map((r) => (
                  <tr key={r.id} className={r.id === user.id ? "bg-accent-soft/50" : ""}>
                    <td className="px-4 py-2.5 font-semibold">{r.rank}</td>
                    <td className="px-2 py-2.5">
                      <Link href={`/u/${r.id}`} className="font-semibold hover:text-accent">{r.name}</Link>
                    </td>
                    <td className="px-2 py-2.5 text-right font-semibold">{r.total}</td>
                    <td className="px-4 py-2.5 text-right">
                      <Move move={r.move} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </>
  );
}
