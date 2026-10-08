import { and, eq, isNull, sql } from "drizzle-orm";
import Link from "next/link";
import { BellIcon, SearchIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { NavTabs } from "@/components/nav-tabs";
import { UserMenu } from "@/components/user-menu";
import { db, schema } from "@/db";
import { touchPresence } from "@/lib/community";
import { touchStreak } from "@/lib/streak";

export type ShellUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  points: number;
  role: string;
};

/** Cabecera (búsqueda, campanita, menú y pestañas) + contenido, para miembros aprobados. */
export async function AppShell({ user, children }: { user: ShellUser; children: React.ReactNode }) {
  await touchStreak(user.id);

  await touchPresence(user.id);

  const [{ unread }] = await db
    .select({ unread: sql<number>`count(*)::int` })
    .from(schema.notification)
    .where(and(eq(schema.notification.userId, user.id), isNull(schema.notification.readAt)));

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-hairline bg-paper">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Logo size={34} withName={false} />
            <span className="display hidden text-2xl sm:inline">
              AG Lab<span className="text-accent">.</span>
            </span>
          </Link>

          <form action="/buscar" className="relative mx-auto min-w-0 max-w-xl flex-1">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-hollow" />
            <input
              name="q"
              type="search"
              placeholder="Buscar"
              className="input !rounded-lg !border-transparent !bg-veil !py-2 !pl-10"
              aria-label="Buscar en la comunidad"
            />
          </form>

          <Link
            href="/notificaciones"
            className="relative shrink-0 rounded-full p-2 text-ash hover:bg-veil hover:text-ink"
            aria-label={unread > 0 ? `${unread} notificaciones sin leer` : "Notificaciones"}
          >
            <BellIcon size={22} />
            {unread > 0 && (
              <span className="absolute top-0 right-0 min-w-5 rounded-full bg-red-500 px-1 text-center text-[11px] font-semibold text-white">
                {unread > 99 ? "99+" : unread}
              </span>
            )}
          </Link>

          <UserMenu
            user={{
              name: user.name,
              email: user.email,
              image: user.image ?? null,
              points: user.points,
              role: user.role,
            }}
          />
        </div>
        <NavTabs />
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
