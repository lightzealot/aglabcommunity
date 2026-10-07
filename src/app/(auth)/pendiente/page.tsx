import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth-shell";
import { SignOutButton } from "@/components/sign-out-button";
import { getSession } from "@/lib/session";

export const metadata = { title: "Solicitud en revisión" };

export default async function PendientePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!session.user.onboarded) redirect("/onboarding");
  if (session.user.status === "approved") redirect("/");
  const banned = session.user.status === "banned";

  return (
    <AuthShell
      title={banned ? "Sin acceso" : "En revisión"}
      subtitle={
        banned
          ? "Tu cuenta no tiene acceso a la comunidad. Escríbenos a hello@andresgomez.store si crees que es un error."
          : `Hola ${session.user.name}, recibimos tu solicitud. Te avisaremos por correo apenas la aprobemos.`
      }
    >
      <SignOutButton className="btn btn-ghost w-full" />
    </AuthShell>
  );
}
