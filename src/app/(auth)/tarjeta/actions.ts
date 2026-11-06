"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db, schema } from "@/db";
import { HANDLE_RE, SOCIALS, cleanSocial } from "@/lib/card";
import { getSession } from "@/lib/session";
import { saveImage } from "@/lib/uploads";

export type CardState = { error?: string; ok?: boolean };

const form = z.object({
  name: z.string().trim().min(2, "Dinos cómo te llamamos.").max(60),
  handle: z.string().trim().toLowerCase().optional(),
  theme: z.enum(["dark", "light"]),
  country: z.string().trim().max(40).optional(),
  bio: z.string().trim().max(120, "La bio admite máx. 120 caracteres.").optional(),
});

export async function updateCard(_prev: CardState, fd: FormData): Promise<CardState> {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!session.user.onboarded) redirect("/onboarding");

  const p = form.safeParse({
    name: fd.get("name"),
    handle: (fd.get("handle") as string) || undefined,
    theme: fd.get("theme") === "light" ? "light" : "dark",
    country: (fd.get("country") as string) || undefined,
    bio: (fd.get("bio") as string) || undefined,
  });
  if (!p.success) return { error: p.error.issues[0].message };
  const d = p.data;

  const handle = d.handle?.replace(/^@/, "") || null;
  if (handle && !HANDLE_RE.test(handle)) {
    return { error: "Tu @ debe tener de 3 a 20 letras minúsculas, números, punto o guion bajo." };
  }
  if (handle) {
    const [taken] = await db.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.handle, handle));
    if (taken && taken.id !== session.user.id) return { error: `@${handle} ya está en uso.` };
  }

  const socials: Record<string, string> = {};
  for (const s of SOCIALS) {
    const v = cleanSocial(String(fd.get(`social_${s.id}`) ?? ""));
    if (v) socials[s.id] = v;
  }
  if (Object.keys(socials).length > 3) return { error: "Elige hasta 3 redes." };

  let image: string | undefined;
  const avatar = fd.get("avatar");
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
      name: d.name,
      handle,
      cardTheme: d.theme,
      country: d.country ?? null,
      bio: d.bio ?? null,
      socials: Object.keys(socials).length ? socials : null,
      ...(image ? { image } : {}),
      updatedAt: new Date(),
    })
    .where(eq(schema.user.id, session.user.id));
  return { ok: true };
}
