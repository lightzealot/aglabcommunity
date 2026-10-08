import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { ProfileForm } from "@/components/profile-form";
import { requireMember } from "@/lib/session";

export const metadata = { title: "Mi perfil" };

export default async function PerfilPage() {
  const { user } = await requireMember();
  const [{ bio, emailNotifications, streak }] = await db
    .select({
      bio: schema.user.bio,
      emailNotifications: schema.user.emailNotifications,
      streak: schema.user.streak,
    })
    .from(schema.user)
    .where(eq(schema.user.id, user.id));
  return (
    <>
      <p className="label mb-2">Cuenta</p>
      <h1 className="display text-5xl">
        Mi perfil<span className="text-accent">.</span>
      </h1>
      <p className="mt-2 mb-6 text-sm text-ash">{user.email} · {user.points} puntos · 🔥 racha de {streak} día{streak === 1 ? "" : "s"}</p>
      <ProfileForm name={user.name} bio={bio ?? ""} emailNotifications={emailNotifications} image={user.image ?? null} />
    </>
  );
}
