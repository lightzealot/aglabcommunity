import Link from "next/link";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { ShareButton } from "@/components/share-button";
import { db, schema } from "@/db";
import { cardPath } from "@/lib/card";
import { memberNumber } from "@/lib/member-number";
import { getSession } from "@/lib/session";
import { CardForm } from "./form";

export const metadata = { title: "Personalizar mi tarjeta" };

export default async function TarjetaPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!session.user.onboarded) redirect("/onboarding");
  const [u] = await db.select().from(schema.user).where(eq(schema.user.id, session.user.id));
  const number = await memberNumber(u.createdAt);
  const back = "/gracias";

  return (
    <main className="mx-auto w-full max-w-md px-4 py-10">
      <div className="mb-6 flex justify-center"><Logo /></div>
      <h1 className="display text-center text-4xl">Personalizar mi tarjeta<span className="text-accent">.</span></h1>
      <p className="mt-3 mb-8 text-center text-sm text-ash">Lo que cambies se ve en tu tarjeta al momento. Todo es opcional.</p>
      <CardForm
        name={u.name}
        handle={u.handle ?? ""}
        theme={u.cardTheme}
        country={u.country ?? ""}
        bio={u.bio ?? ""}
        socials={u.socials ?? {}}
        image={u.image}
        number={number}
        since={u.createdAt.toISOString()}
      />
      <div className="mt-6 space-y-3">
        <ShareButton path={cardPath(u)} text="Mira mi tarjeta de miembro de AG LAB" className="btn btn-ghost w-full" />
        <Link href={back} className="block text-center text-sm text-ash underline">Volver</Link>
      </div>
    </main>
  );
}
