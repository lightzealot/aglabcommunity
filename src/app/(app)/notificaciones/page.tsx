import { desc, eq } from "drizzle-orm";
import Link from "next/link";
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
  const unread = items.filter((n) => !n.readAt).length;

  return (
    <>
      <p className="label mb-2">Actividad</p>
      <div className="flex flex-wrap items-end gap-4">
        <h1 className="display text-5xl">
          Notificaciones<span className="text-accent">.</span>
        </h1>
        {unread > 0 && (
          <form action={markAllRead} className="ml-auto">
            <button className="btn btn-ghost !py-1.5">Marcar todo como leído</button>
          </form>
        )}
      </div>

      <div className="card mt-6 divide-y divide-hairline">
        {items.map((n) => (
          <Link
            key={n.id}
            href={`/notificaciones/leer/${n.id}`}
            className={`flex gap-3 p-4 hover:bg-veil ${n.readAt ? "" : "bg-accent-soft/40"}`}
          >
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.readAt ? "bg-transparent" : "bg-accent"}`} />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">{n.title}</span>
              {n.body && <span className="block truncate text-sm text-ash">{n.body}</span>}
            </span>
            <span className="shrink-0 text-xs text-hollow">{timeAgo(n.createdAt)}</span>
          </Link>
        ))}
        {items.length === 0 && <p className="p-8 text-center text-sm text-ash">No tienes notificaciones.</p>}
      </div>
    </>
  );
}
