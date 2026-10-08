import { and, desc, eq, gt, sql } from "drizzle-orm";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { CommunityCard } from "@/components/community-card";
import { CopyInvite } from "@/components/copy-invite";
import { CalendarIcon, ClockIcon } from "@/components/icons";
import { db, schema } from "@/db";
import { getCommunity, onlineSince } from "@/lib/community";
import { requireMember } from "@/lib/session";
import { timeShort } from "@/lib/time";

export const metadata = { title: "Miembros" };

export default async function MiembrosPage({ searchParams }: { searchParams: Promise<{ f?: string }> }) {
  const { user: me } = await requireMember();
  const { f } = await searchParams;
  const filter = f === "admins" || f === "online" ? f : "all";

  const { user } = schema;
  const since = onlineSince();
  const community = await getCommunity();

  const where = and(
    eq(user.status, "approved"),
    filter === "admins" ? eq(user.role, "admin") : undefined,
    filter === "online" ? gt(user.lastSeenAt, since) : undefined,
  );
  const members = await db
    .select({
      id: user.id,
      name: user.name,
      image: user.image,
      bio: user.bio,
      points: user.points,
      role: user.role,
      createdAt: user.createdAt,
      lastSeenAt: user.lastSeenAt,
    })
    .from(user)
    .where(where)
    .orderBy(desc(sql`${user.lastSeenAt} is not null`), desc(user.lastSeenAt), user.name)
    .limit(200);

  const pill = (id: string, label: string, n: number) => (
    <Link
      key={id}
      href={id === "all" ? "/miembros" : `/miembros?f=${id}`}
      className={`rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap ${
        filter === id ? "border-ink bg-ink text-white" : "border-hairline bg-paper text-ash hover:border-ink hover:text-ink"
      }`}
    >
      {label} {n}
    </Link>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="min-w-0">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {pill("all", "Miembros", community.members)}
          {pill("admins", "Administradores", community.admins)}
          {pill("online", "En línea", community.online)}
          <div className="ml-auto">
            <CopyInvite />
          </div>
        </div>

        <div className="card divide-y divide-hairline">
          {members.map((m) => {
            const online = !!m.lastSeenAt && m.lastSeenAt > since;
            return (
              <div key={m.id} className="flex gap-4 p-4">
                <Link href={`/u/${m.id}`}>
                  <Avatar name={m.name} image={m.image} points={m.points} size={52} />
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2">
                    <Link href={`/u/${m.id}`} className="font-semibold hover:text-accent">
                      {m.name}
                    </Link>
                    {m.role === "admin" && <span className="label">Admin</span>}
                    {m.id === me.id && <span className="label !text-hollow">Tú</span>}
                  </p>
                  {m.bio && <p className="mt-0.5 line-clamp-2 text-sm text-ash">{m.bio}</p>}
                  <div className="mt-2 space-y-1 text-xs text-hollow">
                    <p className="flex items-center gap-1.5">
                      {online ? (
                        <>
                          <span className="h-2 w-2 rounded-full bg-[#2f9e44]" /> En línea ahora
                        </>
                      ) : m.lastSeenAt ? (
                        <>
                          <ClockIcon size={14} /> Activo hace {timeShort(m.lastSeenAt)}
                        </>
                      ) : (
                        <>
                          <ClockIcon size={14} /> Aún no ha entrado
                        </>
                      )}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <CalendarIcon size={14} /> Se unió el{" "}
                      {new Intl.DateTimeFormat("es", { month: "short", day: "numeric", year: "numeric" }).format(m.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {members.length === 0 && <p className="p-8 text-center text-sm text-ash">No hay miembros con ese filtro.</p>}
        </div>
      </div>

      <aside className="lg:sticky lg:top-32 lg:self-start">
        <CommunityCard c={community} isAdmin={me.role === "admin"} />
      </aside>
    </div>
  );
}
