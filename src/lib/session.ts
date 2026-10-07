import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/** Exige sesión de usuario aprobado. */
export async function requireMember() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!session.user.onboarded) redirect("/onboarding");
  if (session.user.status !== "approved") redirect("/pendiente");
  return session;
}

export async function requireAdmin() {
  const session = await requireMember();
  if (session.user.role !== "admin") redirect("/");
  return session;
}
