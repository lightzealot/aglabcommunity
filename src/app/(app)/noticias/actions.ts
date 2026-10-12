"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/session";

/** Quita una noticia; si era la de hoy, el siguiente ciclo de tareas elige otra. */
export async function removeNews(formData: FormData) {
  await requireAdmin();
  const id = z.uuid().safeParse(formData.get("id"));
  if (!id.success) return;
  await db.delete(schema.news).where(eq(schema.news.id, id.data));
  revalidatePath("/noticias");
}
