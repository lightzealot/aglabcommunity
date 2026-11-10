import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db, schema } from "@/db";
import { getSession } from "@/lib/session";

// Ya no hay formulario de perfil: quien llega aquí (cuentas anteriores) pasa directo a su tarjeta.
export default async function OnboardingPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!session.user.onboarded) {
    await db.update(schema.user).set({ onboarded: true, updatedAt: new Date() }).where(eq(schema.user.id, session.user.id));
  }
  redirect("/gracias");
}
