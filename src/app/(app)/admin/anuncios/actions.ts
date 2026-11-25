"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db, schema } from "@/db";
import { emailLayout, sendMail } from "@/lib/mail";
import { isInternalPath, notify } from "@/lib/notify";
import { requireAdmin } from "@/lib/session";

export type AnnounceState = { error?: string; ok?: boolean; count?: number };

const announceSchema = z.object({
  title: z.string().trim().min(1, "Escribe un título.").max(120, "Máximo 120 caracteres."),
  body: z.string().trim().max(1000, "Máximo 1000 caracteres.").optional(),
  href: z.string().trim().optional(),
});

/** Aviso del administrador: llega como notificación a todos los miembros aprobados. */
export async function sendAnnouncement(_prev: AnnounceState, formData: FormData): Promise<AnnounceState> {
  const admin = await requireAdmin();
  const parsed = announceSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body") || undefined,
    href: formData.get("href") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { title, body, href } = parsed.data;
  if (href && !isInternalPath(href)) return { error: "El enlace debe empezar con / (una página de la comunidad)." };

  const members = await db
    .select({ id: schema.user.id, email: schema.user.email, wants: schema.user.emailNotifications })
    .from(schema.user)
    .where(eq(schema.user.status, "approved"));
  const recipients = members.filter((m) => m.id !== admin.user.id);

  await notify(
    recipients.map((m) => m.id),
    { type: "announcement", title, body, href },
  );

  if (formData.get("email") === "on") {
    const base = process.env.BETTER_AUTH_URL ?? "";
    for (const m of recipients.filter((r) => r.wants)) {
      await sendMail({
        to: m.email,
        subject: title,
        text: `${title}\n${body ?? ""}\n${base}${href ?? ""}`,
        html: emailLayout(title, body ?? "", { label: "Abrir en la comunidad", url: `${base}${href ?? "/"}` }),
      }).catch((e) => console.error("[anuncio] correo falló", m.email, e));
    }
  }

  revalidatePath("/", "layout");
  return { ok: true, count: recipients.length };
}
