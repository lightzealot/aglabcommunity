"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, schema } from "@/db";
import { approveUser } from "@/lib/approval";
import { requireAdmin } from "@/lib/session";
import { setRequireApproval } from "@/lib/settings";

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
