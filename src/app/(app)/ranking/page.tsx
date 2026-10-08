import { eq } from "drizzle-orm";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { LockIcon } from "@/components/icons";
import { PointsChart, SERIES_COLORS } from "@/components/points-chart";
import { Rank } from "@/components/top-ranking-card";
import { db, schema } from "@/db";
import { levelOf, LEVEL_THRESHOLDS, MAX_LEVEL, pointsToNext } from "@/lib/levels";
import { getLeaderboards, getRanking, PERIODS, type Entry, type Period } from "@/lib/ranking";
import { requireMember } from "@/lib/session";

export const metadata = { title: "Clasificación" };

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

function Board({ title, entries, me }: { title: string; entries: Entry[]; me: string }) {
  return (
    <section className="card p-4">
      <h2 className="font-semibold">{title}</h2>
      <ul className="mt-3 divide-y divide-hairline border-t border-hairline">
        {entries.map((e, i) => (
          <li key={e.id} className={`flex items-center gap-3 py-2.5 ${e.id === me ? "-mx-2 rounded bg-accent-soft/50 px-2" : ""}`}>
            <Rank n={i + 1} />
            <Avatar name={e.name} image={e.image} size={32} />
            <Link href={`/u/${e.id}`} className="flex-1 truncate text-sm font-semibold hover:text-accent">
              {e.name}
            </Link>
            <span className="text-sm font-semibold text-accent">{e.points}</span>
          </li>
        ))}
        {entries.length === 0 && <li className="py-4 text-sm text-ash">Aún no hay actividad</li>}
      </ul>
    </section>
  );
}

export default async function RankingPage({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  const { user } = await requireMember();
  const { p } = await searchParams;
  const period = (PERIODS.find((x) => String(x) === p) ?? 30) as Period;

  const [{ days, board }, boards, everyone] = await Promise.all([
    getRanking(period),
    getLeaderboards(10),
    db.select({ points: schema.user.points }).from(schema.user).where(eq(schema.user.status, "approved")),
  ]);

  const level = levelOf(user.points);
  const toNext = pointsToNext(user.points);
  const counts = Array.from({ length: MAX_LEVEL }, () => 0);
  for (const m of everyone) counts[levelOf(m.points) - 1]++;
  const pct = (i: number) => (everyone.length ? Math.round((counts[i] / everyone.length) * 100) : 0);

  const levelItem = (n: number) => {
    const reached = n <= level;
    return (
      <li key={n} className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
            n === level ? "bg-accent text-white" : reached ? "bg-accent-soft text-accent" : "bg-veil text-hollow"
          }`}
        >
          {reached ? n : <LockIcon size={16} />}
        </span>
        <span>
          <span className="block text-sm font-semibold">Nivel {n}</span>
          <span className="block text-xs text-hollow">{pct(n - 1)}% de los miembros</span>
        </span>
      </li>
    );
  };

  const top = board.slice(0, 5);

  return (
    <div className="space-y-6">
      <section className="card p-6 sm:p-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="flex shrink-0 flex-col items-center text-center">
            <Avatar name={user.name} image={user.image ?? null} points={user.points} size={132} />
            <h1 className="display mt-4 text-4xl">{user.name}</h1>
            <p className="mt-1 text-sm font-semibold text-accent">Nivel {level}</p>
            <p className="text-xs text-hollow">
              {toNext === null ? "Nivel máximo alcanzado" : `${toNext} punto${toNext === 1 ? "" : "s"} para subir de nivel`}
            </p>
            <p className="mt-1 text-xs text-hollow">{user.points} punto{user.points === 1 ? "" : "s"} en total</p>
          </div>
          <ul className="grid flex-1 grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {Array.from({ length: MAX_LEVEL }, (_, i) => i + 1).map(levelItem)}
          </ul>
        </div>
        <p className="mt-6 border-t border-hairline pt-4 text-xs text-hollow">
          Sumas puntos al publicar (+2), comentar (+1), recibir me gusta (+1), completar lecciones (+5), asistir a eventos (+10) y entrando cada día
          (+1). Nivel 2 desde {LEVEL_THRESHOLDS[1]} puntos.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <Board title="Clasificación (7 días)" entries={boards.d7} me={user.id} />
        <Board title="Clasificación (30 días)" entries={boards.d30} me={user.id} />
        <Board title="Clasificación (todos los tiempos)" entries={boards.all} me={user.id} />
      </div>

      {board.length > 0 && (
        <>
          <div className="card flex gap-5 overflow-x-auto px-4 py-3 text-sm whitespace-nowrap">
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

          <section className="card p-4 sm:p-6">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <div>
                <h2 className="text-lg font-semibold">Evolución de puntos</h2>
                <p className="text-sm text-ash">Los 5 primeros. Cada línea es una persona.</p>
              </div>
              <nav className="ml-auto flex gap-1.5" aria-label="Periodo">
                {PERIODS.map((x) => (
                  <Link
                    key={x}
                    href={x === 30 ? "/ranking" : `/ranking?p=${x}`}
                    className={`rounded-full border px-3 py-1 text-sm ${
                      x === period ? "border-ink bg-ink text-white" : "border-hairline text-ash hover:text-ink"
                    }`}
                  >
                    {x} días
                  </Link>
                ))}
              </nav>
            </div>
            <PointsChart days={days} series={top} />
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
        </>
      )}
    </div>
  );
}
