"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, schema } from "@/db";
import { approveUser } from "@/lib/approval";
import { requireAdmin } from "@/lib/session";
import { setRequireApproval, setSetting } from "@/lib/settings";
import { saveImage } from "@/lib/uploads";

export async function saveApprovalSetting(formData: FormData) {
  await requireAdmin();
  // El formulario envía el valor al que se quiere cambiar.
  await setRequireApproval(formData.get("require") === "true");
  revalidatePath("/admin/configuracion");
}

/** Aprueba de golpe a quienes están pendientes (que ya completaron el onboarding o no). */
export async function approveAllPending() {
  await requireAdmin();
  const pending = await db
    .select({ id: schema.user.id, email: schema.user.email, status: schema.user.status })
    .from(schema.user)
    .where(eq(schema.user.status, "pending"));
  for (const u of pending) await approveUser(u);
  revalidatePath("/admin/configuracion");
  revalidatePath("/admin/usuarios");
}

export type CommunityState = { error?: string; ok?: boolean };

export async function saveCommunity(_prev: CommunityState, formData: FormData): Promise<CommunityState> {
  await requireAdmin();
  const description = String(formData.get("description") ?? "").trim();
  if (description.length > 1500) return { error: "La descripción admite máx. 1500 caracteres." };

  const cover = formData.get("cover");
  if (cover instanceof File && cover.size > 0) {
    try {
      await setSetting("cover_url", await saveImage(cover));
    } catch (e) {
      return { error: e instanceof Error ? e.message : "No pudimos subir la portada." };
    }
  } else if (formData.get("removeCover") === "on") {
    await setSetting("cover_url", null);
  }
  await setSetting("description", description || null);
  revalidatePath("/", "layout");
  return { ok: true };
}
