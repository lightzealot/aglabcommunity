"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, schema } from "@/db";
import { emailLayout, sendMail } from "@/lib/mail";
import { notify } from "@/lib/notify";
import { requireAdmin } from "@/lib/session";

type Status = "approved" | "banned" | "pending";

export async function setUserStatus(formData: FormData) {
  const admin = await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as Status;
  if (!["approved", "banned", "pending"].includes(status)) return;
  if (id === admin.user.id) return; // un admin no se cambia a sí mismo

  const [target] = await db.select().from(schema.user).where(eq(schema.user.id, id));
  if (!target) return;

  await db.update(schema.user).set({ status, updatedAt: new Date() }).where(eq(schema.user.id, id));

  if (status === "approved") {
    // Publica la presentación guardada durante el onboarding.
    await db
      .update(schema.post)
      .set({ status: "published", createdAt: new Date() })
      .where(
        and(
          eq(schema.post.authorId, id),
          eq(schema.post.kind, "intro"),
          eq(schema.post.status, "pending"),
        ),
      );
  }

  if (status === "approved" && target.status === "pending") {
    await notify(id, {
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

  revalidatePath("/admin/usuarios");
}
