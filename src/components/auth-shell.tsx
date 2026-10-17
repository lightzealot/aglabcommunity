import Link from "next/link";
import { Figure, type FigureName } from "@/components/figure";
import { Logo } from "@/components/logo";

export function AuthShell({
  title,
  subtitle,
  figure = "hub",
  children,
}: {
  title: string;
  subtitle?: string;
  figure?: FigureName;
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/" aria-label="Ir al inicio">
            <Logo />
          </Link>
        </div>
        <div className="card p-8">
          <div className="mb-4 hidden sm:block">
            <Figure name={figure} width={150} play />
          </div>
          <p className="label mb-2">Comunidad</p>
          <h1 className="display text-5xl">
            {title}
            <span className="text-accent">.</span>
          </h1>
          {subtitle && <p className="mt-3 text-sm text-ash">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </main>
  );
}
