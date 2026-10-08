import { and, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { emailLayout, sendMail } from "@/lib/mail";
import { notify } from "@/lib/notify";

/** Aprueba a un usuario: publica su presentación, le avisa en la app y por correo. */
export async function approveUser(target: { id: string; email: string; status: string }) {
  await db
    .update(schema.user)
    .set({ status: "approved", updatedAt: new Date() })
    .where(eq(schema.user.id, target.id));

  // Publica la presentación guardada durante el onboarding.
  await db
    .update(schema.post)
    .set({ status: "published", createdAt: new Date() })
    .where(
      and(
        eq(schema.post.authorId, target.id),
        eq(schema.post.kind, "intro"),
        eq(schema.post.status, "pending"),
      ),
    );

  if (target.status !== "pending") return;
  await notify(target.id, {
    type: "welcome",
    title: "¡Bienvenido a AG Lab!",
    body: "Tu cuenta fue aprobada. Tu presentación ya está en el feed.",
    href: "/",
  });
  const url = process.env.BETTER_AUTH_URL ?? "";
  sendMail({
    to: target.email,
    subject: "Ya tienes acceso a AG Lab",
    text: `Tu solicitud fue aprobada. Entra aquí: ${url}`,
    html: emailLayout("Ya tienes acceso", "Tu solicitud fue aprobada. Te esperamos dentro.", {
      label: "Entrar a AG Lab",
      url,
    }),
  }).catch((e) => console.error("[mail] aviso de aprobación falló", e));
}
