import { getResourceBySlug } from "@/lib/resources";
import { getResourceTr, langOf } from "@/lib/resource-i18n";
import { LEVEL_LABEL } from "@/components/level-badge";
import { levelOf } from "@/lib/resource-constants";
import { abs, FEED_CACHE, FOUNDER, SITE_NAME } from "@/lib/site";

/** Versión en Markdown limpio de un recurso (para agentes de IA): /recursos/<slug>/md?lang=en|pt */
export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = await getResourceBySlug(slug);
  if (!r) return new Response("No encontrado", { status: 404 });
  const asked = langOf(new URL(req.url).searchParams.get("lang") ?? undefined);
  const tr = getResourceTr(slug, asked);
  const lang = tr ? asked : "es";
  const c = tr ? { ...r, ...tr } : r;
  const page = abs(`/recursos/${slug}${lang === "es" ? "" : `?lang=${lang}`}`);
  const head = [
    `# ${c.title}`,
    c.summary ? `> ${c.summary}` : "",
    `- Autor: ${FOUNDER} · ${SITE_NAME}`,
    `- Nivel: ${LEVEL_LABEL[lang][levelOf(r.level)]}`,
    `- Idioma: ${lang}`,
    `- Fecha: ${r.createdAt.toISOString().slice(0, 10)}`,
    `- Página: ${page}`,
  ]
    .filter(Boolean)
    .join("\n");
  return new Response(`${head}\n\n${c.body}\n`, {
    headers: { "content-type": "text/markdown; charset=utf-8", "cache-control": FEED_CACHE, "content-language": lang },
  });
}
