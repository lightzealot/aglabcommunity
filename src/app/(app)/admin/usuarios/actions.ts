"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, schema } from "@/db";
import { approveUser } from "@/lib/approval";
import { requireAdmin } from "@/lib/session";

type Status = "approved" | "banned" | "pending";

export async function setUserStatus(formData: FormData) {
  const admin = await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as Status;
  if (!["approved", "banned", "pending"].includes(status)) return;
  if (id === admin.user.id) return; // un admin no se cambia a sí mismo

  const [target] = await db.select().from(schema.user).where(eq(schema.user.id, id));
  if (!target) return;

  if (status === "approved") {
    await approveUser(target);
  } else {
    await db.update(schema.user).set({ status, updatedAt: new Date() }).where(eq(schema.user.id, id));
  }

  revalidatePath("/admin/usuarios");
}
