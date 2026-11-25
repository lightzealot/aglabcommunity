"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db, schema } from "@/db";
import { bulkHeaders, emailLayout, sendMail } from "@/lib/mail";
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
    // En segundo plano y de a uno, con pausa: no bloquea al admin y evita topes del servidor de correo.
    const wanting = recipients.filter((r) => r.wants);
    void (async () => {
      for (const m of wanting) {
        await sendMail({
          to: m.email,
          subject: title,
          text: `${title}\n${body ?? ""}\n${base}${href ?? ""}\n\nPara dejar de recibir estos correos: ${base}/perfil`,
          html: emailLayout(title, body ?? "", { label: "Abrir en la comunidad", url: `${base}${href ?? "/"}` }).replace(
            "AG Lab · comunidad.andresgomez.store",
            `AG Lab · <a href="${base}/perfil" style="color:#8f8f8f">Dejar de recibir estos correos</a>`,
          ),
          headers: bulkHeaders(),
        }).catch((e) => console.error("[anuncio] correo falló", m.email, e));
        await new Promise((r) => setTimeout(r, 1500));
      }
    })();
  }

  revalidatePath("/", "layout");
  return { ok: true, count: recipients.length };
}
