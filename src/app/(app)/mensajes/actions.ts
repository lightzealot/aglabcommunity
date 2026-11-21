"use server";

import { and, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db, schema } from "@/db";
import { requireMember } from "@/lib/session";

export type ChatState = { error?: string; ok?: boolean };

const sendSchema = z.object({
  to: z.string().min(1),
  body: z.string().trim().min(1, "Escribe un mensaje.").max(2000, "Máximo 2000 caracteres."),
});

export async function sendMessage(_prev: ChatState, formData: FormData): Promise<ChatState> {
  const { user } = await requireMember();
  const parsed = sendSchema.safeParse({ to: formData.get("to"), body: formData.get("body") });
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  if (parsed.data.to === user.id) return { error: "No puedes escribirte a ti mismo." };

  const [to] = await db
    .select({ id: schema.user.id })
    .from(schema.user)
    .where(and(eq(schema.user.id, parsed.data.to), eq(schema.user.status, "approved")));
  if (!to) return { error: "Esa persona no está disponible." };

  await db.insert(schema.chatMessage).values({ senderId: user.id, recipientId: to.id, body: parsed.data.body });
  revalidatePath("/mensajes");
  return { ok: true };
}

/** Marca como leídos los mensajes que esa persona me envió. */
export async function markThreadRead(otherId: string) {
  const { user } = await requireMember();
  await db
    .update(schema.chatMessage)
    .set({ readAt: new Date() })
    .where(
      and(
        eq(schema.chatMessage.recipientId, user.id),
        eq(schema.chatMessage.senderId, otherId),
        isNull(schema.chatMessage.readAt),
      ),
    );
}
