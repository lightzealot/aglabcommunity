"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db, schema } from "@/db";
import { getSession } from "@/lib/session";
import { saveImage } from "@/lib/uploads";

const schemaForm = z.object({
  name: z.string().trim().min(2, "Dinos cómo te llamamos.").max(60),
});

export type OnboardingState = { error?: string };

export async function completeOnboarding(
  _prev: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.user.onboarded) redirect("/");

  const parsed = schemaForm.safeParse({ name: formData.get("name") });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  let image: string | undefined;
  const avatar = formData.get("avatar");
  if (avatar instanceof File && avatar.size > 0) {
    try {
      image = await saveImage(avatar);
    } catch (e) {
      return { error: e instanceof Error ? e.message : "No pudimos subir la foto." };
    }
  }

  await db
    .update(schema.user)
    .set({
      name: parsed.data.name,
      ...(image ? { image } : {}),
      onboarded: true,
      updatedAt: new Date(),
    })
    .where(eq(schema.user.id, session.user.id));

  redirect("/gracias");
}
