"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Avatar } from "@/components/avatar";
import { authClient } from "@/lib/auth-client";

type U = { name: string; email: string; image: string | null; points: number; role: string };

const ADMIN_LINKS = [
  { href: "/admin/usuarios", label: "Usuarios" },
  { href: "/admin/cursos", label: "Cursos" },
  { href: "/admin/eventos", label: "Eventos" },
  { href: "/admin/boards", label: "Boards" },
  { href: "/admin/configuracion", label: "Configuración" },
];

export function UserMenu({ user }: { user: U }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Se cierra al navegar y al hacer clic fuera.
  useEffect(() => {
    ref.current?.removeAttribute("open");
  }, [pathname]);
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) ref.current.removeAttribute("open");
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const item = "block rounded px-3 py-2 text-sm hover:bg-veil";

  return (
    <details ref={ref} className="relative">
      <summary className="flex cursor-pointer list-none items-center rounded-full [&::-webkit-details-marker]:hidden" aria-label="Menú de usuario">
        <Avatar name={user.name} image={user.image} points={user.points} size={36} />
      </summary>
      <div className="card absolute right-0 z-40 mt-2 w-64 p-2 shadow-lg">
        <div className="border-b border-hairline px-3 pt-2 pb-3">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs text-ash">{user.email}</p>
          <p className="mt-1 text-xs text-hollow">{user.points} puntos</p>
        </div>
        <div className="py-1">
          <Link href="/perfil" className={item}>Mi perfil</Link>
          <Link href="/notificaciones" className={item}>Notificaciones</Link>
        </div>
        {user.role === "admin" && (
          <div className="border-t border-hairline py-1">
            <p className="label px-3 py-1">Administración</p>
            {ADMIN_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={item}>{l.label}</Link>
            ))}
          </div>
        )}
        <div className="border-t border-hairline pt-1">
          <button
            className={`${item} w-full text-left`}
            onClick={async () => {
              await authClient.signOut();
              router.replace("/login");
              router.refresh();
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </details>
  );
}
