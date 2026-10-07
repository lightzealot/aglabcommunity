import { desc } from "drizzle-orm";
import Link from "next/link";
import { LocalTime } from "@/components/local-time";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/session";

export const metadata = { title: "Eventos" };

export default async function AdminEventosPage() {
  await requireAdmin();
  const events = await db.select().from(schema.event).orderBy(desc(schema.event.startsAt));

  return (
    <>
      <p className="label mb-2">Admin</p>
      <div className="flex flex-wrap items-end gap-4">
        <h1 className="display text-5xl">
          Eventos<span className="text-accent">.</span>
        </h1>
        <Link href="/admin/eventos/nuevo" className="btn btn-primary ml-auto">Nuevo evento</Link>
      </div>

      <div className="card mt-6 divide-y divide-hairline">
        {events.map((e) => (
          <Link key={e.id} href={`/admin/eventos/${e.id}`} className="flex items-center gap-3 p-4 hover:bg-veil">
            <span className="flex-1 font-semibold">{e.title}</span>
            <span className="text-sm text-ash">
              <LocalTime iso={e.startsAt.toISOString()} options={{ day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }} />
            </span>
          </Link>
        ))}
        {events.length === 0 && <p className="p-8 text-center text-sm text-ash">Aún no hay eventos.</p>}
      </div>
    </>
  );
}
