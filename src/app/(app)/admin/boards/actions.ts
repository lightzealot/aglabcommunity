"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/session";

export type BoardState = { error?: string; ok?: boolean };

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const boardForm = z.object({
  name: z.string().trim().min(2, "El nombre es muy corto.").max(40),
  description: z.string().trim().max(160).default(""),
  position: z.coerce.number().int().min(0).max(999).default(0),
});

export async function saveBoard(_prev: BoardState, formData: FormData): Promise<BoardState> {
  await requireAdmin();
  const parsed = boardForm.safeParse({
    name: formData.get("name"),
    description: formData.get("description") ?? "",
    position: formData.get("position") || 0,
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const existingId = String(formData.get("id") || "");
  if (existingId) {
    await db.update(schema.board).set(parsed.data).where(eq(schema.board.id, existingId));
  } else {
    const id = slugify(parsed.data.name);
    if (!id) return { error: "Nombre no válido." };
    const [dup] = await db.select().from(schema.board).where(eq(schema.board.id, id));
    if (dup) return { error: "Ya existe un board con ese nombre." };
    await db.insert(schema.board).values({ id, ...parsed.data });
  }
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteBoard(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  if (id === "general") return; // el board por defecto no se borra
  const [used] = await db
    .select({ id: schema.post.id })
    .from(schema.post)
    .where(eq(schema.post.boardId, id))
    .limit(1);
  if (used) return; // con publicaciones no se puede borrar
  await db.delete(schema.board).where(eq(schema.board.id, id));
  revalidatePath("/", "layout");
}
