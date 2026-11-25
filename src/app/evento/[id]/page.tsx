import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { InviteCookie } from "@/components/invite-cookie";
import { LocalTime } from "@/components/local-time";
import { db, schema } from "@/db";
import { UUID_RE } from "@/lib/courses";
import { hasEnded } from "@/lib/events";
import { getViewer } from "@/lib/resources";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ ref?: string }> };

// Página de invitación: es para quien recibe el enlace, no para buscadores.
export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function InvitacionEvento({ params, searchParams }: Props) {
  const { id } = await params;
  const { ref } = await searchParams;
  if (!UUID_RE.test(id)) notFound();
  const [ev] = await db.select().from(schema.event).where(eq(schema.event.id, id));
  if (!ev) notFound();

  const viewer = await getViewer();
  if (viewer.kind === "member") redirect(`/calendario/${id}`);

  const [inviter] = ref
    ? await db.select({ name: schema.user.name }).from(schema.user).where(eq(schema.user.id, ref))
    : [];
  const finished = hasEnded(ev);
  const first = inviter?.name?.split(" ")[0];
  const join = `/registro?evento=${id}${ref ? `&ref=${encodeURIComponent(ref)}` : ""}`;

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <InviteCookie eventId={id} refId={ref} />
      <p className="label">{first ? `${first} te invita a AG Lab` : "Te invitan a AG Lab"}</p>
      <h1 className="display mt-2 text-5xl">
        {ev.title}
        <span className="text-accent">.</span>
      </h1>
      <p className="label mt-3 !text-ash">
        <LocalTime iso={ev.startsAt.toISOString()} /> · {ev.durationMin} min
      </p>
      {ev.description && <p className="mt-4 break-words whitespace-pre-line text-ash">{ev.description}</p>}

      <section className="card mt-8 p-6">
        <h2 className="font-semibold">Únete gratis y participa</h2>
        <p className="mt-1 text-sm text-ash">
          {finished
            ? "Este evento ya terminó, pero en la comunidad hay más: guías, cursos y eventos en vivo."
            : "Al crear tu cuenta te dejamos confirmada tu asistencia y te avisamos antes de que empiece."}
        </p>
        <ul className="mt-3 space-y-1.5 text-sm">
          {[
            "Eventos en vivo con la comunidad",
            "Descargas en todos los recursos",
            "Cursos gratis y comunidad en español",
            "Tarjeta de miembro, puntos y ranking",
          ].map((x) => (
            <li key={x} className="flex gap-2">
              <span className="text-accent" aria-hidden>✓</span>
              {x}
            </li>
          ))}
        </ul>
        <Link href={join} className="btn btn-primary mt-5 w-full">
          Unirme y confirmar mi lugar
        </Link>
        <p className="mt-3 text-center text-sm text-ash">
          ¿Ya tienes cuenta? <Link href={`/login?next=/calendario/${id}`} className="font-semibold text-accent">Entrar</Link>
        </p>
      </section>
    </main>
  );
}
