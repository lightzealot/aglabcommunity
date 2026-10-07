"use server";

import { and, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db, schema } from "@/db";
import { notify } from "@/lib/notify";
import { award, revoke } from "@/lib/points";
import { requireAdmin } from "@/lib/session";

export type EventState = { error?: string; ok?: boolean };

const refresh = () => {
  revalidatePath("/calendario", "layout");
  revalidatePath("/admin/eventos", "layout");
  revalidatePath("/");
};

const eventForm = z.object({
  title: z.string().trim().min(2, "El título es muy corto.").max(120),
  description: z.string().trim().max(3000, "Descripción demasiado larga."),
  startsAt: z.coerce.date({ error: "Elige fecha y hora." }),
  durationMin: z.coerce.number().int().min(5, "Mínimo 5 minutos.").max(600),
  link: z
    .string()
    .trim()
    .max(500)
    .optional()
    .refine((v) => !v || /^https?:\/\//i.test(v), "El enlace debe empezar con https://"),
});

export async function saveEvent(_prev: EventState, formData: FormData): Promise<EventState> {
  await requireAdmin();
  const parsed = eventForm.safeParse({
    title: formData.get("title"),
    description: formData.get("description") ?? "",
    startsAt: formData.get("startsAt"),
    durationMin: formData.get("durationMin") || 60,
    link: formData.get("link") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const data = { ...parsed.data, link: parsed.data.link ?? null };

  const id = z.uuid().safeParse(formData.get("id"));
  if (id.success) {
    // Si cambia la fecha, el recordatorio debe poder enviarse de nuevo.
    await db
      .update(schema.event)
      .set({ ...data, reminderSentAt: null })
      .where(eq(schema.event.id, id.data));
    refresh();
    return { ok: true };
  }

  const [created] = await db.insert(schema.event).values(data).returning({ id: schema.event.id });
  const members = await db
    .select({ id: schema.user.id })
    .from(schema.user)
    .where(eq(schema.user.status, "approved"));
  await notify(members.map((m) => m.id), {
    type: "event_new",
    title: `Nuevo evento: ${data.title}`,
    body: "Confirma tu asistencia en el calendario.",
    href: `/calendario/${created.id}`,
  });
  refresh();
  redirect(`/admin/eventos/${created.id}`);
}

export async function deleteEvent(formData: FormData) {
  await requireAdmin();
  const id = z.uuid().safeParse(formData.get("id"));
  if (!id.success) return;
  await db.transaction(async (tx) => {
    await revoke(tx, "event", { prefix: `${id.data}:` });
    await tx.delete(schema.event).where(eq(schema.event.id, id.data));
  });
  refresh();
  redirect("/admin/eventos");
}

/** Marca la asistencia: suma +10 a los nuevos y revierte a los que se desmarcan. */
export async function saveAttendance(formData: FormData) {
  await requireAdmin();
  const eventId = z.uuid().safeParse(formData.get("eventId"));
  if (!eventId.success) return;
  const [ev] = await db.select().from(schema.event).where(eq(schema.event.id, eventId.data));
  if (!ev) return;

  const members = await db
    .select({ id: schema.user.id })
    .from(schema.user)
    .where(eq(schema.user.status, "approved"));
  const valid = new Set(members.map((m) => m.id));
  const wanted = new Set(formData.getAll("userIds").map(String).filter((u) => valid.has(u)));

  const current = await db
    .select({ userId: schema.eventAttendance.userId })
    .from(schema.eventAttendance)
    .where(eq(schema.eventAttendance.eventId, ev.id));
  const had = new Set(current.map((c) => c.userId));
  const toAdd = [...wanted].filter((u) => !had.has(u));
  const toRemove = [...had].filter((u) => !wanted.has(u));

  await db.transaction(async (tx) => {
    for (const userId of toAdd) {
      await tx.insert(schema.eventAttendance).values({ eventId: ev.id, userId }).onConflictDoNothing();
      await award(tx, userId, "event", `${ev.id}:${userId}`);
    }
    if (toRemove.length) {
      await tx
        .delete(schema.eventAttendance)
        .where(and(eq(schema.eventAttendance.eventId, ev.id), inArray(schema.eventAttendance.userId, toRemove)));
      for (const userId of toRemove) await revoke(tx, "event", { refId: `${ev.id}:${userId}` });
    }
    await notify(
      toAdd,
      {
        type: "attendance",
        title: `Asistencia registrada: ${ev.title}`,
        body: "+10 puntos. ¡Gracias por venir!",
        href: `/calendario/${ev.id}`,
      },
      tx,
    );
  });
  refresh();
}
