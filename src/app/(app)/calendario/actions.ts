"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db, schema } from "@/db";
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
