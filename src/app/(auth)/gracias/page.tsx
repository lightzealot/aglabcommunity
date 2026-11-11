import Link from "next/link";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { IntroForm } from "@/components/intro-form";
import { CardTilt } from "@/components/card-tilt";
import { MemberCard } from "@/components/member-card";
import { ShareButton } from "@/components/share-button";
import { db, schema } from "@/db";
import { cardPath } from "@/lib/card";
import { memberNumber } from "@/lib/member-number";
import { getSession } from "@/lib/session";

export const metadata = { title: "Gracias" };

export default async function GraciasPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!session.user.onboarded) redirect("/onboarding");
  if (session.user.status === "banned") redirect("/pendiente");

  const [u] = await db.select().from(schema.user).where(eq(schema.user.id, session.user.id));
  const number = await memberNumber(u.createdAt);
  const [intro] = await db
    .select({ body: schema.post.body })
    .from(schema.post)
    .where(and(eq(schema.post.authorId, u.id), eq(schema.post.kind, "intro")));
  const first = u.name.split(" ")[0];
  const approved = u.status === "approved";

  return (
    <main className="mx-auto w-full max-w-md px-4 py-10">
      <div className="mb-6 flex justify-center">
        <Logo />
      </div>
      <h1 className="display text-center text-5xl">
        Gracias, {first}<span className="text-accent">.</span>
      </h1>
      <div className="mt-8">
        <CardTilt><MemberCard name={u.name} handle={u.handle} theme={u.cardTheme} image={u.image} number={number} since={u.createdAt} /></CardTilt>
      </div>
      <div className="mt-8">
        <IntroForm initial={intro?.body ?? ""} pending={!approved} />
      </div>
      <div className="mt-6 space-y-3">
        {approved ? (
          <Link href="/" className="btn btn-primary w-full">Entrar a la comunidad</Link>
        ) : (
          <p className="text-center text-sm text-ash">Recibimos tu solicitud. Te avisaremos por correo apenas la aprobemos.</p>
        )}
        <ShareButton path={cardPath(u)} text="Mira mi tarjeta de miembro de AG LAB" className="btn btn-ghost w-full" />
        <Link href="/tarjeta" className="btn btn-ghost w-full">Personalizar mi tarjeta</Link>
      </div>
    </main>
  );
}
