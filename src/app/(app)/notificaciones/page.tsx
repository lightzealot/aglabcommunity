import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { AutoArchive } from "@/components/auto-archive";
import { db, schema } from "@/db";
import { requireMember } from "@/lib/session";
import { timeAgo } from "@/lib/time";
import { markAllRead } from "./actions";

export const metadata = { title: "Notificaciones" };

export default async function NotificacionesPage() {
  const { user } = await requireMember();
  const items = await db
    .select()
    .from(schema.notification)
    .where(eq(schema.notification.userId, user.id))
    .orderBy(desc(schema.notification.createdAt))
    .limit(50);
  const fresh = items.filter((n) => !n.readAt);
  const archived = items.filter((n) => n.readAt);
  const unread = fresh.length;

  const row = (n: (typeof items)[number]) => (
    <Link
      key={n.id}
      href={`/notificaciones/leer/${n.id}`}
      className={`flex gap-3 p-4 transition-colors hover:bg-veil ${n.readAt ? "" : "bg-accent-soft/40"}`}
    >
      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.readAt ? "bg-transparent" : "bg-accent"}`} />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-sm font-semibold">
          {n.type === "announcement" && <span className="label !text-[10px]">Aviso</span>}
          {n.title}
        </span>
        {n.body && <span className="block truncate text-sm text-ash">{n.body}</span>}
      </span>
      <span className="shrink-0 text-xs text-hollow">{timeAgo(n.createdAt)}</span>
    </Link>
  );

  return (
    <>
      <AutoArchive active={unread > 0} />
      <p className="label mb-2">Actividad</p>
      <div className="flex flex-wrap items-end gap-4">
        <h1 className="display text-5xl">
          Notificaciones<span className="text-accent">.</span>
        </h1>
        {unread > 0 && (
          <form action={markAllRead} className="ml-auto">
            <button className="btn btn-ghost !py-1.5">Archivar todas</button>
          </form>
        )}
      </div>
      <p className="mt-2 text-sm text-ash">Cuando las ves, pasan solas a archivadas.</p>

      <h2 className="label mt-6 mb-2 !text-ash">Nuevas · {unread}</h2>
      <div className="card divide-y divide-hairline">
        {fresh.map(row)}
        {fresh.length === 0 && <p className="p-8 text-center text-sm text-ash">Estás al día. No hay notificaciones nuevas.</p>}
      </div>

      {archived.length > 0 && (
        <details className="mt-6" open={fresh.length === 0}>
          <summary className="label mb-2 cursor-pointer !text-ash">Archivadas · {archived.length}</summary>
          <div className="card divide-y divide-hairline opacity-80">{archived.map(row)}</div>
        </details>
      )}
    </>
  );
}
