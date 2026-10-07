"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db, schema } from "@/db";
import { BUSINESS_TYPES, TEAM_SIZES } from "@/lib/onboarding";
import { getSession } from "@/lib/session";

const schemaForm = z.object({
  name: z.string().trim().min(2, "Dinos cómo te llamamos."),
  boards: z.array(z.string()).min(1, "Elige al menos un tema."),
  level: z.enum(["principiante", "intermedio", "avanzado"], "Elige tu nivel."),
  businessType: z.enum(BUSINESS_TYPES, "Elige tu sector."),
  teamSize: z.enum(TEAM_SIZES, "Elige el tamaño de tu equipo."),
  phone: z.string().trim().max(30).optional(),
  intro: z.string().trim().min(20, "Tu presentación debe tener al menos 20 caracteres.").max(2000),
});

export type OnboardingState = { error?: string };

export async function completeOnboarding(
  _prev: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.user.onboarded) redirect("/");

  const parsed = schemaForm.safeParse({
    name: formData.get("name"),
    boards: formData.getAll("boards"),
    level: formData.get("level"),
    businessType: formData.get("businessType"),
    teamSize: formData.get("teamSize"),
    phone: formData.get("phone") || undefined,
    intro: formData.get("intro"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const d = parsed.data;

  const validBoards = await db.select({ id: schema.board.id }).from(schema.board);
  const ids = new Set(validBoards.map((b) => b.id));
  const chosen = d.boards.filter((b) => ids.has(b));
  if (!chosen.length) return { error: "Elige al menos un tema." };

  const userId = session.user.id;
  await db.transaction(async (tx) => {
    await tx
      .update(schema.user)
      .set({
        name: d.name,
        level: d.level,
        businessType: d.businessType,
        teamSize: d.teamSize,
        phone: d.phone ?? null,
        onboarded: true,
        updatedAt: new Date(),
      })
      .where(eq(schema.user.id, userId));
    await tx.insert(schema.userBoard).values(chosen.map((boardId) => ({ userId, boardId })));
    // Queda pendiente hasta que el admin apruebe la cuenta.
    await tx.insert(schema.post).values({
      authorId: userId,
      boardId: "general",
      kind: "intro",
      status: session.user.status === "approved" ? "published" : "pending",
      body: d.intro,
    });
  });

  redirect(session.user.status === "approved" ? "/" : "/pendiente");
}
