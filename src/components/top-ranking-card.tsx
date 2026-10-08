import Link from "next/link";
import { Avatar } from "@/components/avatar";
import type { Entry } from "@/lib/ranking";

export const MEDAL = ["#f4c95d", "#b8bec7", "#c68a5b"];

export function Rank({ n }: { n: number }) {
  return n <= 3 ? (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
      style={{ background: MEDAL[n - 1] }}
    >
      {n}
    </span>
  ) : (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center text-sm font-semibold text-hollow">{n}</span>
  );
}

/** Mini tabla del lateral: los 3 primeros de los últimos 30 días. */
export function TopRankingCard({ entries }: { entries: Entry[] }) {
  return (
    <section className="card p-4">
      <h2 className="font-semibold">Clasificación (30 días)</h2>
      <ul className="mt-3 space-y-3">
        {entries.slice(0, 3).map((e, i) => (
          <li key={e.id} className="flex items-center gap-3">
            <Rank n={i + 1} />
            <Avatar name={e.name} image={e.image} size={32} />
            <Link href={`/u/${e.id}`} className="flex-1 truncate text-sm font-semibold hover:text-accent">
              {e.name}
            </Link>
            <span className="text-sm font-semibold text-accent">+{e.points}</span>
          </li>
        ))}
        {entries.length === 0 && <li className="text-sm text-ash">Aún no hay actividad.</li>}
      </ul>
      <Link href="/ranking" className="mt-4 block border-t border-hairline pt-3 text-center text-sm font-semibold text-accent">
        Ver todas las clasificaciones
      </Link>
    </section>
  );
}
