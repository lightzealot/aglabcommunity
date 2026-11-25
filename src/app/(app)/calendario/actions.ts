"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db, schema } from "@/db";
import { notify } from "@/lib/notify";
import { requireMember } from "@/lib/session";

export async function toggleRsvp(formData: FormData) {
  const { user } = await requireMember();
  const eventId = z.uuid().safeParse(formData.get("eventId"));
  if (!eventId.success) return;
  const [ev] = await db.select({ id: schema.event.id }).from(schema.event).where(eq(schema.event.id, eventId.data));
  if (!ev) return;

  const removed = await db
    .delete(schema.eventRsvp)
    .where(and(eq(schema.eventRsvp.eventId, ev.id), eq(schema.eventRsvp.userId, user.id)))
    .returning();
  if (!removed.length) {
    await db.insert(schema.eventRsvp).values({ eventId: ev.id, userId: user.id }).onConflictDoNothing();
  }
  revalidatePath("/calendario", "layout");
  revalidatePath("/");
}

export type EventCommentState = { error?: string; ok?: boolean };

/** Comenta en un evento. Avisa a quienes confirmaron asistencia y a los otros que comentaron (sin repetir ni avisarte a ti). */
export async function addEventComment(_prev: EventCommentState, formData: FormData): Promise<EventCommentState> {
  const { user } = await requireMember();
  const parsed = z
    .object({ eventId: z.uuid(), body: z.string().trim().min(1, "Escribe algo.").max(1000, "Máximo 1000 caracteres.") })
    .safeParse({ eventId: formData.get("eventId"), body: formData.get("body") });
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { eventId, body } = parsed.data;
  const [ev] = await db.select({ id: schema.event.id, title: schema.event.title }).from(schema.event).where(eq(schema.event.id, eventId));
  if (!ev) return { error: "Evento no encontrado." };

  await db.insert(schema.eventComment).values({ eventId, authorId: user.id, body });

  const [going, talking] = await Promise.all([
    db.select({ id: schema.eventRsvp.userId }).from(schema.eventRsvp).where(eq(schema.eventRsvp.eventId, eventId)),
    db.select({ id: schema.eventComment.authorId }).from(schema.eventComment).where(eq(schema.eventComment.eventId, eventId)),
  ]);
  const others = [...new Set([...going, ...talking].map((r) => r.id))].filter((id) => id !== user.id).slice(0, 200);
  await notify(others, {
    type: "event_comment",
    title: `${user.name} comentó en "${ev.title}"`,
    body: body.slice(0, 120),
    href: `/calendario/${eventId}#comentarios`,
  }).catch((e) => console.error("[evento] aviso de comentario falló", e));

  revalidatePath(`/calendario/${eventId}`);
  return { ok: true };
}

/** Borra un comentario propio (o cualquiera si eres admin). */
export async function deleteEventComment(formData: FormData) {
  const { user } = await requireMember();
  const id = z.uuid().safeParse(formData.get("id"));
  if (!id.success) return;
  const [c] = await db.select().from(schema.eventComment).where(eq(schema.eventComment.id, id.data));
  if (!c || (c.authorId !== user.id && user.role !== "admin")) return;
  await db.delete(schema.eventComment).where(eq(schema.eventComment.id, c.id));
  revalidatePath(`/calendario/${c.eventId}`);
}
