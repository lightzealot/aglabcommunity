"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db, schema } from "@/db";
import { getSession } from "@/lib/session";

export type IntroState = { error?: string; ok?: boolean };

/** Las palabras de bienvenida a la comunidad: se publican como el hilo de presentación (uno por persona). */
export async function saveIntro(_prev: IntroState, fd: FormData): Promise<IntroState> {
  const session = await getSession();
  if (!session) redirect("/login");
  const body = String(fd.get("intro") ?? "").trim();
  if (body.length < 3) return { error: "Escribe al menos unas palabras." };
  if (body.length > 500) return { error: "Máximo 500 caracteres." };

  const userId = session.user.id;
  const [existing] = await db
    .select({ id: schema.post.id })
    .from(schema.post)
    .where(and(eq(schema.post.authorId, userId), eq(schema.post.kind, "intro")));
  if (existing) {
    await db.update(schema.post).set({ body }).where(eq(schema.post.id, existing.id));
  } else {
    await db.insert(schema.post).values({
      authorId: userId,
      boardId: "general",
      kind: "intro",
      status: session.user.status === "approved" ? "published" : "pending",
      body,
    });
  }
  revalidatePath("/", "layout");
  return { ok: true };
}
