"use server";

import { revalidatePath } from "next/cache";
import { ensureDailyNews } from "@/lib/news";
import * as news from "@/lib/news";
import { requireAdmin } from "@/lib/session";

export type NewsState = { ok?: boolean; message?: string };

/** Publica la noticia de hoy ahora (una sola ejecución de Apify) y dice qué pasó. */
export async function publishTodayNews(): Promise<NewsState> {
  await requireAdmin();
  const created = await ensureDailyNews(new Date(), true);
  revalidatePath("/noticias");
  revalidatePath("/admin/noticias");
  if (created) return { ok: true, message: "Noticia de hoy publicada." };
  return { ok: false, message: news.lastNewsProblem || "Hoy ya hay noticia o no se pudo publicar (revisa los registros)." };
}
