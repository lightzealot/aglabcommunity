import { and, eq } from "drizzle-orm";
import { AnnounceForm } from "./form";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/session";
import { sql } from "drizzle-orm";

export const metadata = { title: "Avisos a la comunidad" };

export default async function AnunciosPage() {
  await requireAdmin();
  const [{ n }] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(schema.user)
    .where(and(eq(schema.user.status, "approved")));

  return (
    <>
      <p className="label mb-2">Administración</p>
      <h1 className="display text-5xl">
        Avisos<span className="text-accent">.</span>
      </h1>
      <p className="mt-2 text-sm text-ash">
        Lo que escribas aquí le llega como notificación a los {n} miembros (aparece en la campanita). Úsalo para
        novedades, eventos o recursos nuevos.
      </p>
      <AnnounceForm />
    </>
  );
}
