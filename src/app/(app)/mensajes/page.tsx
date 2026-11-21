import Link from "next/link";
import { and, eq, ne } from "drizzle-orm";
import { Avatar } from "@/components/avatar";
import { db, schema } from "@/db";
import { listConversations } from "@/lib/chat";
import { requireMember } from "@/lib/session";
import { timeShort } from "@/lib/time";

export const metadata = { title: "Mensajes" };

export default async function MensajesPage() {
  const { user: me } = await requireMember();
  const convs = await listConversations(me.id);
  // Quien aún no tiene conversaciones puede empezar con los administradores.
  const admins =
    me.role === "admin"
      ? []
      : await db
          .select({ id: schema.user.id, name: schema.user.name, image: schema.user.image })
          .from(schema.user)
          .where(and(eq(schema.user.role, "admin"), eq(schema.user.status, "approved"), ne(schema.user.id, me.id)));

  return (
    <>
      <p className="label mb-2">Chat interno</p>
      <h1 className="display text-5xl">
        Mensajes<span className="text-accent">.</span>
      </h1>
      <p className="mt-2 text-sm text-ash">
        Conversaciones privadas con otros miembros. Para escribirle a alguien, entra a su perfil desde{" "}
        <Link href="/miembros" className="font-semibold text-accent">Miembros</Link>.
      </p>

      <div className="card mt-6 divide-y divide-hairline">
        {convs.map((c) => (
          <Link
            key={c.otherId}
            href={`/mensajes/${c.otherId}`}
            className={`flex items-center gap-3 p-4 transition-colors hover:bg-veil ${c.unread ? "bg-accent-soft/40" : ""}`}
          >
            <Avatar name={c.name} image={c.image} size={46} />
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="truncate font-semibold">{c.name}</span>
                {c.role === "admin" && <span className="label">Admin</span>}
              </span>
              <span className={`block truncate text-sm ${c.unread ? "font-semibold text-ink" : "text-ash"}`}>
                {c.lastMine ? "Tú: " : ""}
                {c.last}
              </span>
            </span>
            <span className="flex shrink-0 flex-col items-end gap-1">
              <span className="text-xs text-hollow">{timeShort(c.lastAt)}</span>
              {c.unread > 0 && (
                <span className="min-w-5 rounded-full bg-accent px-1.5 text-center text-[11px] font-semibold text-white">
                  {c.unread}
                </span>
              )}
            </span>
          </Link>
        ))}
        {convs.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-sm text-ash">Aún no tienes conversaciones.</p>
            {admins.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {admins.map((a) => (
                  <Link key={a.id} href={`/mensajes/${a.id}`} className="btn btn-primary !rounded-full !py-2">
                    Escribirle a {a.name.split(" ")[0]}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
