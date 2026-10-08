import Link from "next/link";
import { ArrowRightIcon, CalendarIcon, CommentIcon, FileIcon, UserIcon } from "@/components/icons";
import { LocalTime } from "@/components/local-time";
import { SHOW_MEMBERS_FROM, type LandingData } from "@/lib/landing";
import type { Viewer } from "@/lib/resources";

const STEPS = [
  { icon: UserIcon, title: "Te presentas", text: "Cuentas quién eres y en qué andas. Alguien de la comunidad te contesta." },
  { icon: CommentIcon, title: "Preguntas o compartes", text: "Lo que te trabó, o lo que te salió, en el board que toca." },
  { icon: FileIcon, title: "Te llevas las guías", text: "Recursos, plantillas y cursos para aplicar la IA en tu trabajo." },
];

function SectionHead({ n, label, title, href, cta }: { n: string; label: string; title: string; href?: string; cta?: string }) {
  return (
    <div className="mb-6 flex flex-wrap items-end gap-3">
      <div>
        <p className="label">
          {n} · {label}
        </p>
        <h2 className="display mt-1 text-4xl sm:text-5xl">{title}</h2>
      </div>
      {href && cta && (
        <Link href={href} className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
          {cta} <ArrowRightIcon size={16} />
        </Link>
      )}
    </div>
  );
}

/** Página de inicio pública: lo que ve un visitante antes de registrarse. */
export function Landing({ data, viewer }: { data: LandingData; viewer: Viewer }) {
  const { counts, boards, resources, courses, events } = data;
  const cta =
    viewer.kind === "lead"
      ? { href: viewer.user.onboarded ? "/pendiente" : "/onboarding", label: viewer.user.onboarded ? "Ver mi solicitud" : "Completar mi perfil" }
      : { href: "/registro", label: "Crear cuenta gratis" };

  const stats = [
    { n: counts.resources, label: "Recursos para llevarte" },
    { n: counts.courses, label: "Cursos gratis" },
    { n: counts.lessons, label: "Lecciones" },
    ...(counts.members >= SHOW_MEMBERS_FROM
      ? [
          { n: counts.members, label: "Miembros" },
          ...(counts.newThisWeek > 0 ? [{ n: counts.newThisWeek, label: "Nuevos esta semana" }] : []),
        ]
      : []),
  ].filter((s) => s.n > 0);

  let section = 0;
  const num = () => String(++section).padStart(2, "0");

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[1.15fr_0.85fr] lg:pt-10">
        <div>
          <p className="label">Comunidad gratis · en español</p>
          <h1 className="display mt-3 text-6xl sm:text-7xl lg:text-[5.5rem]">
            Aquí se aplica la IA a tu negocio<span className="text-accent">.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ash">
            Automatización, agentes de IA y procesos para empresas de servicios. Preguntas lo que te trabó, ves cómo lo
            resuelven otros y te llevas guías, plantillas y cursos.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={cta.href} className="btn btn-primary !px-5 !py-3">
              {cta.label} <ArrowRightIcon size={16} />
            </Link>
            <Link href="/recursos" className="btn btn-ghost !border-hairline !px-5 !py-3 !text-ink">
              Ver los recursos
            </Link>
          </div>
        </div>

        <div className="card p-5 shadow-sm sm:p-6">
          <p className="label !text-ash">Cómo funciona · 3 pasos</p>
          <ol className="mt-4">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <div className="flex gap-3">
                  <span className="mt-1 font-mono text-[11px] text-hollow">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-hairline bg-accent-soft text-accent">
                    <s.icon size={22} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold">{s.title}</p>
                    <p className="text-sm text-ash">{s.text}</p>
                  </div>
                </div>
                {i < STEPS.length - 1 && <div className="my-1.5 ml-[3.4rem] h-3 w-px bg-hairline" aria-hidden />}
              </li>
            ))}
          </ol>
          <p className="mt-4 border-t border-hairline pt-3 font-mono text-[11px] tracking-wide text-accent uppercase">
            ✓ Gratis · sin tarjeta
          </p>
        </div>
      </section>

      {/* Cifras */}
      {stats.length > 0 && (
        <section
          className="grid divide-x divide-hairline rounded-lg border border-hairline bg-accent-soft/40 py-5 text-center"
          style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
        >
          {stats.map((s) => (
            <div key={s.label} className="px-2">
              <p className="display text-4xl sm:text-5xl">{s.n.toLocaleString("es")}</p>
              <p className="mt-1 text-[11px] font-semibold tracking-wide text-ash uppercase sm:text-xs">{s.label}</p>
            </div>
          ))}
        </section>
      )}

      {/* Boards */}
      {boards.length > 0 && (
        <section>
          <SectionHead n={num()} label="Los boards" title="Un board para cada tema" href="/registro" cta="Entrar a la comunidad" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {boards.map((b) => (
              <div key={b.id} className="card p-5">
                <h3 className="font-semibold">{b.name}</h3>
                <p className="mt-1 text-sm text-ash">{b.description}</p>
                {b.threads > 0 && (
                  <p className="mt-3 font-mono text-[11px] tracking-wide text-accent uppercase">
                    {b.threads} {b.threads === 1 ? "hilo" : "hilos"}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recursos */}
      {resources.length > 0 && (
        <section>
          <SectionHead
            n={num()}
            label="Guías y plantillas"
            title="Lo que prometo aquí, lo tienes aquí"
            href="/recursos"
            cta={`Ver los ${counts.resources} recursos`}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <Link
                key={r.slug}
                href={`/recursos/${r.slug}`}
                className="card group flex flex-col overflow-hidden transition hover:shadow-md"
              >
                <div className="aspect-[16/9] bg-accent-soft">
                  {r.coverUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.coverUrl} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-lg leading-snug font-bold group-hover:text-accent">{r.title}</h3>
                  <p className="mt-1 line-clamp-3 text-sm text-ash">{r.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Cursos */}
      {courses.length > 0 && (
        <section>
          <SectionHead n={num()} label="Cursos" title="Cursos gratis dentro de la comunidad" href="/registro" cta="Crear cuenta para empezar" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <Link key={c.id} href="/registro" className="card group flex flex-col overflow-hidden transition hover:shadow-md">
                <div className="aspect-[16/9] bg-accent-soft">
                  {c.coverUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.coverUrl} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg leading-snug font-bold uppercase group-hover:text-accent">{c.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-ash">{c.description.split("\n")[0]}</p>
                  <p className="mt-3 text-xs font-semibold text-accent">Gratis · crea tu cuenta para empezar</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Eventos */}
      {events.length > 0 && (
        <section>
          <SectionHead n={num()} label="En vivo" title="Próximos eventos" />
          <div className="card divide-y divide-hairline">
            {events.map((e) => (
              <div key={e.id} className="flex flex-wrap items-center gap-3 p-4">
                <CalendarIcon className="text-accent" />
                <span className="min-w-0 flex-1 font-semibold">{e.title}</span>
                <span className="text-sm text-ash">
                  <LocalTime iso={e.startsAt.toISOString()} />
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-hollow">El enlace para entrar lo ven los miembros.</p>
        </section>
      )}

      {/* Cierre */}
      <section className="card border-accent bg-accent-soft/40 p-8 text-center sm:p-12">
        <p className="label">Tu turno</p>
        <h2 className="display mx-auto mt-2 max-w-2xl text-5xl sm:text-6xl">
          Preséntate y pregunta lo que te trabó<span className="text-accent">.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ash">
          La cuenta es gratis. Con ella publicas en los boards, respondes, haces los cursos y descargas los archivos de
          cada guía.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href={cta.href} className="btn btn-primary !px-5 !py-3">
            {cta.label}
          </Link>
          {viewer.kind === "visitor" && (
            <Link href="/login" className="btn btn-ghost !border-hairline !px-5 !py-3 !text-ink">
              Entrar
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
