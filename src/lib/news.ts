import { desc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { dateKey } from "@/lib/streak";

/** Feeds en español sobre IA. Para añadir otra fuente basta con sumarla aquí. */
const FEEDS = [
  { source: "Xataka", url: "https://www.xataka.com/tag/inteligencia-artificial/rss2.xml" },
  { source: "Genbeta", url: "https://www.genbeta.com/tag/inteligencia-artificial/rss2.xml" },
];

// Lo que más le sirve a la comunidad: herramientas y uso práctico, no solo hardware o política.
const BOOSTS: [RegExp, number][] = [
  [/\b(chatgpt|openai|claude|anthropic|gemini|copilot|deepseek|mistral|perplexity|grok|llama)\b/i, 4],
  [/\b(agentes?|automatiza\w*|flujos? de trabajo|prompts?|asistentes?)\b/i, 3],
  [/\b(lanza|presenta|nuevo|nueva|gratis|herramienta|funci[oó]n|actualizaci[oó]n)\b/i, 1.5],
  [/\b(negocios?|empresas?|productividad|trabajo|pymes?)\b/i, 1],
];
const PENALTIES: [RegExp, number][] = [
  [/\b(oferta|descuento|cupón|chollo|rebaja)s?\b/i, -6],
  [/\b(demanda|juicio|elecciones|guerra)\b/i, -2],
];

const MAX_AGE_H = 36;
const FALLBACK_AGE_H = 96;

type Candidate = {
  title: string;
  url: string;
  source: string;
  summary: string;
  imageUrl: string | null;
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
      imageUrl: isHttps(img) ? img : null,
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
  for (const [re, w] of PENALTIES) if (re.test(text)) s += w;
  if (c.imageUrl) s += 1;
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

/**
 * Elige y guarda la noticia destacada de hoy si todavía no hay una.
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
  const inserted = await db
    .insert(schema.news)
    .values({
      day,
      title: best.title,
      summary: best.summary,
      url: best.url,
      source: best.source,
      imageUrl: best.imageUrl,
      publishedAt: best.publishedAt,
    })
    .onConflictDoNothing()
    .returning({ id: schema.news.id });
  if (inserted.length) console.log(`[news] ${day}: ${best.source} · ${best.title}`);
  return inserted.length > 0;
}

export async function listNews(limit = 31) {
  return db.select().from(schema.news).orderBy(desc(schema.news.day)).limit(limit);
}
