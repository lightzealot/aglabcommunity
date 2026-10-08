import Link from "next/link";
import { Logo } from "@/components/logo";
import type { Viewer } from "@/lib/resources";

/** Marco para visitantes (y para quien tiene cuenta pero aún no entra a la comunidad). */
export function PublicShell({ viewer, children }: { viewer: Viewer; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-hairline bg-paper">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link href="/recursos" className="flex shrink-0 items-center gap-2">
            <Logo size={34} withName={false} />
            <span className="display text-2xl">
              AG Lab<span className="text-accent">.</span>
            </span>
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            {viewer.kind === "visitor" && (
              <>
                <Link href="/login" className="btn !px-3 !py-2 text-ash hover:text-ink">
                  Entrar
                </Link>
                <Link href="/registro" className="btn btn-primary !py-2">
                  Crear cuenta gratis
                </Link>
              </>
            )}
            {viewer.kind === "lead" && (
              <Link href={viewer.user.onboarded ? "/pendiente" : "/onboarding"} className="btn btn-primary !py-2">
                {viewer.user.onboarded ? "Mi solicitud" : "Completar mi perfil"}
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
      <footer className="border-t border-hairline py-6 text-center text-xs text-hollow">
        AG Lab · La comunidad de Andrés Gómez · comunidad.andresgomez.store
      </footer>
    </div>
  );
}
