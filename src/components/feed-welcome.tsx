import Link from "next/link";
import { LEVEL_THRESHOLDS, levelOf, pointsToNext } from "@/lib/levels";

/** Saludo con el nivel y la barra de progreso hacia el siguiente. */
export function FeedWelcome({ name, points, online }: { name: string; points: number; online: number }) {
  const level = levelOf(points);
  const left = pointsToNext(points);
  const from = LEVEL_THRESHOLDS[level - 1];
  const to = left === null ? points : LEVEL_THRESHOLDS[level];
  const pct = left === null ? 100 : Math.max(4, Math.round(((points - from) / (to - from)) * 100));

  return (
    <section className="card feed-in relative overflow-hidden p-4 sm:p-5">
      <div
        className="pointer-events-none absolute -top-16 -right-10 h-44 w-44 rounded-full bg-accent opacity-15 blur-3xl"
        aria-hidden
      />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label">Tu comunidad</p>
          <h1 className="display mt-1 text-4xl sm:text-5xl">
            Hola, {name.split(" ")[0]}
            <span className="text-accent">.</span>
          </h1>
        </div>
        {online > 0 && (
          <p className="flex items-center gap-2 text-sm text-ash">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            {online} en línea ahora
          </p>
        )}
      </div>

      <Link href="/ranking" className="group mt-4 block">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-semibold">
            Nivel {level} · <span className="text-accent">{points} pts</span>
          </span>
          <span className="text-xs text-ash group-hover:text-ink">
            {left === null ? "Nivel máximo" : `Te faltan ${left} para el nivel ${level + 1}`}
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-veil">
          <div className="level-bar h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
        </div>
      </Link>
      <p className="mt-2 text-xs text-hollow">Publicar suma 2 puntos, comentar 1, cada me gusta que recibes 1 y cada lección 5.</p>
    </section>
  );
}
