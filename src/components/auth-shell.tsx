import { Logo } from "@/components/logo";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="card p-8">
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
