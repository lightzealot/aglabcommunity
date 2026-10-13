import { desc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { dateKey } from "@/lib/streak";

/** Feeds en español sobre IA. Para añadir otra fuente basta con sumarla aquí. */
const FEEDS = [
  { source: "Xataka", url: "https://www.xataka.com/tag/inteligencia-artificial/rss2.xml" },
  { source: "Genbeta", url: "https://www.genbeta.com/tag/inteligencia-artificial/rss2.xml" },
];

// Lo que más le sirve a la comunidad: herramientas que se pueden usar hoy y negocio, no espectáculo ni política.
/** Palabra completa (con tildes): "ley" no coincide con "leyenda" ni "api" con "capital". */
const words = (alts: string) => new RegExp(`(?<![\\p{L}\\d])(?:${alts})(?![\\p{L}\\d])`, "iu");

const BOOSTS: [RegExp, number][] = [
  [words("chatgpt|openai|claude|anthropic|gemini|copilot|deepseek|mistral|perplexity|grok|llama|notebooklm|cursor|midjourney|sora|veo"), 4],
  [words("agentes?|automatiza\\p{L}*|flujos? de trabajo|prompts?|asistentes?|workflows?|n8n|zapier"), 4],
  [words("herramientas?|app|apps|aplicaci[oó]n|plataforma|funci[oó]n|funciones|gratis|gratuit[ao]|plugin|extensi[oó]n|api"), 3],
  [words("negocios?|empresas?|pymes?|emprendedor\\p{L}*|ventas?|marketing|clientes?|productividad|trabajo|profesionales?|equipos?"), 3],
  [words("lanza|presenta|nuevo|nueva|actualizaci[oó]n|c[oó]mo (usar|crear|ahorrar)|gu[ií]a|trucos?"), 1.5],
];
const PENALTIES: [RegExp, number][] = [
  [words("ofertas?|descuentos?|cup[oó]n|cupones|chollos?|rebajas?"), -8],
  [words("pel[ií]culas?|series?|cine|actor|actriz|director|netflix|hbo|disney|m[uú]sica|cantante|videojuegos?|famos[ao]s?|celebridad\\p{L}*"), -7],
  [words("demanda|juicio|elecciones|guerra|gobierno|ley|regulaci[oó]n|trump|partido|militar"), -4],
  [words("chips?|gpu|nvidia|gigavatios?|centros? de datos|semiconductores?|bolsa|acciones|inversores?"), -3],
  [words("opini[oó]n|paradoja|filosof\\p{L}*|distop\\p{L}*|apocalipsis"), -2],
];

const MAX_AGE_H = 36;
const FALLBACK_AGE_H = 96;

type Candidate = {
  title: string;
  url: string;
  source: string;
  /** Extracto corto: solo sirve para puntuar, nunca se muestra. */
  summary: string;
  /** Texto completo de la nota: materia prima para escribir el resumen propio. */
  text: string;
  hasImage: boolean;
  publishedAt: Date;
  score: number;
};

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decode(s: string) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

const unCdata = (s: string) => s.replace(/^\s*<!\[CDATA\[/, "").replace(/\]\]>\s*$/, "");
const tag = (xml: string, name: string) => xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"))?.[1];

function plainText(html: string) {
  return decode(
    html
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
      .replace(/<\/p>|<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, ""),
  )
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
}

/** Primeros párrafos hasta ~320 caracteres, cortando en una frase o una palabra completa. */
function makeSummary(html: string) {
  const text = plainText(html).replace(/\n+/g, " ");
  if (text.length <= 320) return text;
  const cut = text.slice(0, 320);
  const sentence = cut.lastIndexOf(". ");
  if (sentence > 160) return cut.slice(0, sentence + 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

const isHttps = (u: string | undefined): u is string => !!u && /^https:\/\//i.test(u);

function parseFeed(xml: string, source: string): Candidate[] {
  const out: Candidate[] = [];
  for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)) {
    const item = m[1];
    const title = plainText(unCdata(tag(item, "title") ?? "")).trim();
    const url = decode(unCdata(tag(item, "link") ?? "")).trim();
    const published = new Date(unCdata(tag(item, "pubDate") ?? "").trim());
    const desc = unCdata(tag(item, "description") ?? "");
    if (!title || !isHttps(url) || Number.isNaN(published.getTime())) continue;

    const img = decode(desc.match(/<img[^>]+src="([^"]+)"/i)?.[1] ?? item.match(/<enclosure[^>]+url="([^"]+)"/i)?.[1] ?? "");
    out.push({
      title,
      url,
      source,
      summary: makeSummary(desc),
      text: plainText(desc).slice(0, 8000),
      hasImage: isHttps(img),
      publishedAt: published,
      score: 0,
    });
  }
  return out;
}

function score(c: Candidate, now: Date) {
  const text = `${c.title} ${c.summary}`;
  let s = 0;
  for (const [re, w] of BOOSTS) if (re.test(c.title)) s += w * 1.5;
  for (const [re, w] of BOOSTS) if (re.test(c.summary)) s += w * 0.5;
  for (const [re, w] of PENALTIES) {
    if (re.test(c.title)) s += w * 1.5;
    else if (re.test(text)) s += w;
  }
  if (c.hasImage) s += 1;
  if (c.summary.length >= 160) s += 1;
  // Más fresca, mejor: hasta +3 si salió en las últimas horas.
  const ageH = (now.getTime() - c.publishedAt.getTime()) / 3_600_000;
  s += Math.max(0, 3 - ageH / 12);
  return s;
}

export async function loadCandidates(now: Date): Promise<Candidate[]> {
  const results = await Promise.all(
    FEEDS.map(async (f) => {
      try {
        const res = await fetch(f.url, {
          headers: { "user-agent": "Mozilla/5.0 (compatible; AGLabBot/1.0)", accept: "application/rss+xml, application/xml" },
          signal: AbortSignal.timeout(15_000),
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return parseFeed(await res.text(), f.source);
      } catch (e) {
        console.error("[news] feed falló", f.source, e);
        return [];
      }
    }),
  );
  return results.flat().map((c) => ({ ...c, score: score(c, now) }));
}

const APIFY_ACTOR = "tidytools~web-page-summarizer";

/** Una pasada por el resumidor de Apify (IA, sin clave de modelo). Devuelve el texto o null. */
async function apifySummarize(token: string, text: string, style: "paragraph" | "one-line", maxWords: number) {
  const res = await fetch(`https://api.apify.com/v2/acts/${APIFY_ACTOR}/run-sync-get-dataset-items`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({
      texts: [text],
      style,
      maxWords,
      outputLanguage: "Spanish",
      focus: "qué pasó, por qué importa y qué puede hacer un profesional o dueño de negocio con esto",
    }),
    signal: AbortSignal.timeout(120_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
  const items = (await res.json()) as { success?: boolean; summary?: string }[];
  return items[0]?.success && items[0].summary ? items[0].summary.trim() : null;
}

/**
 * Escribe el titular y el resumen con IA (actor de Apify), no con copia de la nota.
 * Devuelve null si no hay token o el resultado no sirve: nunca se publica texto copiado.
 */
async function writeOwnSummary(c: Candidate): Promise<{ title: string; summary: string } | null> {
  const token = process.env.APIFY_TOKEN;
  if (!token) {
    console.warn("[news] falta APIFY_TOKEN: no se publica sin resumen propio");
    return null;
  }
  const source = `${c.title}\n\n${c.text}`;
  try {
    const [summary, title] = await Promise.all([
      apifySummarize(token, source, "paragraph", 260),
      apifySummarize(token, source, "one-line", 14),
    ]);
    if (!summary || !title) throw new Error("el resumidor no devolvió resultado");
    const cleanTitle = title.replace(/^["“«]|["”»]$/g, "").replace(/\.$/, "").trim();
    if (cleanTitle.length < 10 || summary.length < 300) throw new Error("resultado demasiado corto");
    if (cleanTitle.toLowerCase() === c.title.toLowerCase()) throw new Error("el titular es igual al original");
    return { title: cleanTitle.slice(0, 140), summary };
  } catch (e) {
    console.error("[news] no se pudo escribir el resumen", e);
    return null;
  }
}

/**
 * Elige la noticia destacada de hoy (si todavía no hay una), escribe el resumen propio y lo guarda.
 * Es idempotente: `day` es único, así que dos réplicas no la duplican.
 * Devuelve true si creó una noticia nueva.
 */
export async function ensureDailyNews(now = new Date()) {
  const day = dateKey(now);
  const [existing] = await db.select({ id: schema.news.id }).from(schema.news).where(eq(schema.news.day, day));
  if (existing) return false;

  const used = new Set((await db.select({ url: schema.news.url }).from(schema.news)).map((r) => r.url));
  const all = (await loadCandidates(now)).filter((c) => !used.has(c.url) && c.publishedAt <= new Date(now.getTime() + 3_600_000));
  const within = (h: number) => all.filter((c) => now.getTime() - c.publishedAt.getTime() <= h * 3_600_000);
  const pool = within(MAX_AGE_H).length ? within(MAX_AGE_H) : within(FALLBACK_AGE_H);
  if (!pool.length) {
    console.warn("[news] sin candidatos para", day);
    return false;
  }

  const best = pool.sort((a, b) => b.score - a.score)[0];
  const own = await writeOwnSummary(best);
  if (!own) return false;

  // La fuente y el enlace original solo se guardan para no repetir noticias; no se muestran.
  const inserted = await db
    .insert(schema.news)
    .values({
      day,
      title: own.title,
      summary: own.summary,
      url: best.url,
      source: best.source,
      imageUrl: null,
      publishedAt: best.publishedAt,
    })
    .onConflictDoNothing()
    .returning({ id: schema.news.id });
  if (inserted.length) console.log(`[news] ${day}: publicada (${best.source})`);
  return inserted.length > 0;
}

export async function listNews(limit = 31) {
  return db.select().from(schema.news).orderBy(desc(schema.news.day)).limit(limit);
}
