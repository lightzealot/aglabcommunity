import { asc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { db, schema } from "@/db";
import { getSession } from "@/lib/session";
import { OnboardingForm } from "./form";

export const metadata = { title: "Bienvenido" };

export default async function OnboardingPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.user.onboarded) redirect("/");

  const boards = await db.select().from(schema.board).orderBy(asc(schema.board.position));

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12">
      <div className="mb-8">
        <Logo />
      </div>
      <h1 className="display text-6xl">
        Cuéntanos de ti<span className="text-accent">.</span>
      </h1>
      <p className="mt-3 mb-10 text-ash">
        Unas preguntas rápidas y una presentación. Con esto revisamos tu solicitud y personalizamos tu feed.
      </p>
      <OnboardingForm boards={boards} defaultName={session.user.name} />
    </main>
  );
}
