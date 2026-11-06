import Link from "next/link";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth-shell";
import { Logo } from "@/components/logo";
import { MemberCard } from "@/components/member-card";
import { ShareButton } from "@/components/share-button";
import { SignOutButton } from "@/components/sign-out-button";
import { db, schema } from "@/db";
import { cardPath } from "@/lib/card";
import { memberNumber } from "@/lib/member-number";
import { getSession } from "@/lib/session";

export const metadata = { title: "Solicitud en revisión" };

export default async function PendientePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!session.user.onboarded) redirect("/onboarding");
  if (session.user.status === "approved") redirect("/");

  if (session.user.status === "banned") {
    return (
      <AuthShell
        figure="padlock"
        title="Sin acceso"
        subtitle="Tu cuenta no tiene acceso a la comunidad. Escríbenos a hello@andresgomez.store si crees que es un error."
      >
        <SignOutButton className="btn btn-ghost w-full" />
      </AuthShell>
    );
  }

  const [u] = await db.select().from(schema.user).where(eq(schema.user.id, session.user.id));
  const number = await memberNumber(u.createdAt);
  const first = u.name.split(" ")[0];

  return (
    <main className="mx-auto w-full max-w-md px-4 py-10">
      <div className="mb-6 flex justify-center">
        <Link href="/" aria-label="Ir al inicio">
          <Logo />
        </Link>
      </div>
      <h1 className="display text-center text-5xl">
        Gracias, {first}<span className="text-accent">.</span>
      </h1>
      <div className="mt-8">
        <MemberCard
          name={u.name}
          handle={u.handle}
          theme={u.cardTheme}
          image={u.image}
          number={number}
          since={u.createdAt}
        />
      </div>
      <div className="mt-8 space-y-3">
        <ShareButton path={cardPath(u)} text="Mira mi tarjeta de miembro de AG LAB" className="btn btn-primary w-full" />
        <Link href="/tarjeta" className="btn btn-ghost w-full">Personalizar mi tarjeta</Link>
      </div>
      <p className="mt-6 text-center text-sm text-ash">
        Recibimos tu solicitud. Te avisaremos por correo apenas la aprobemos.
      </p>
      <div className="mt-4">
        <SignOutButton className="btn btn-ghost w-full" />
      </div>
    </main>
  );
}
