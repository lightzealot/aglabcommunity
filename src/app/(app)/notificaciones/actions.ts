"use server";

import { and, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, schema } from "@/db";
import { requireMember } from "@/lib/session";

export async function markAllRead() {
  const { user } = await requireMember();
  await db
    .update(schema.notification)
    .set({ readAt: new Date() })
    .where(and(eq(schema.notification.userId, user.id), isNull(schema.notification.readAt)));
  revalidatePath("/", "layout");
}
