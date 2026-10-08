import Link from "next/link";
import { Logo } from "@/components/logo";
import { SignOutButton } from "@/components/sign-out-button";
import { and, eq, isNull, sql } from "drizzle-orm";
import { db, schema } from "@/db";
import { requireMember } from "@/lib/session";
import { touchStreak } from "@/lib/streak";

const NAV = [
  { href: "/", label: "Feed", ready: true },
  { href: "/classroom", label: "Classroom", ready: true },
  { href: "/calendario", label: "Calendario", ready: true },
  { href: "/ranking", label: "Ranking", ready: true },
  { href: "/perfil", label: "Mi perfil", ready: true },
];

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireMember();
  await touchStreak(user.id);
  const [{ unread }] = await db
    .select({ unread: sql<number>`count(*)::int` })
    .from(schema.notification)
    .where(and(eq(schema.notification.userId, user.id), isNull(schema.notification.readAt)));

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-hairline bg-sidebar p-5 md:flex">
        <Link href="/" className="mb-8">
          <Logo />
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((item) =>
            item.ready ? (
              <Link key={item.href} href={item.href} className="rounded px-3 py-2 text-sm font-semibold hover:bg-veil">
                {item.label}
              </Link>
            ) : (
              <span key={item.href} className="flex items-center justify-between rounded px-3 py-2 text-sm text-hollow">
                {item.label}
                <span className="label !text-hollow">Pronto</span>
              </span>
            ),
          )}
          <Link href="/notificaciones" className="flex items-center justify-between rounded px-3 py-2 text-sm font-semibold hover:bg-veil">
            Notificaciones
            {unread > 0 && (
              <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-white">{unread > 99 ? "99+" : unread}</span>
            )}
          </Link>
          {user.role === "admin" && (
            <>
              <p className="label mt-6 mb-1 px-3">Admin</p>
              <Link href="/admin/usuarios" className="rounded px-3 py-2 text-sm font-semibold hover:bg-veil">
                Usuarios
              </Link>
              <Link href="/admin/cursos" className="rounded px-3 py-2 text-sm font-semibold hover:bg-veil">
                Cursos
              </Link>
              <Link href="/admin/eventos" className="rounded px-3 py-2 text-sm font-semibold hover:bg-veil">
                Eventos
              </Link>
              <Link href="/admin/boards" className="rounded px-3 py-2 text-sm font-semibold hover:bg-veil">
                Boards
              </Link>
              <Link href="/admin/configuracion" className="rounded px-3 py-2 text-sm font-semibold hover:bg-veil">
                Configuración
              </Link>
            </>
          )}
        </nav>
        <div className="border-t border-hairline pt-4">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="mb-3 truncate text-xs text-ash">{user.email}</p>
          <SignOutButton className="btn btn-ghost w-full !py-2" />
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-hairline bg-paper px-5 py-3 md:hidden">
          <Logo size={28} />
          <Link href="/notificaciones" className="text-sm font-semibold">
            🔔{unread > 0 ? ` ${unread}` : ""}
          </Link>
          <SignOutButton className="text-sm text-ash" />
        </header>
        <main className="mx-auto max-w-4xl p-5 md:p-10">{children}</main>
      </div>
    </div>
  );
}
