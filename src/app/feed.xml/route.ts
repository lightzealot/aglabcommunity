import { desc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { excerpt } from "@/lib/news-format";
import { abs, FEED_CACHE, SITE_DESCRIPTION, SITE_NAME, siteUrl, xmlEscape } from "@/lib/site";

// RSS con las noticias y los recursos nuevos: lo leen agregadores, buscadores y agentes de IA.
export const dynamic = "force-dynamic";

export async function GET() {
  const [news, resources] = await Promise.all([
    db.select().from(schema.news).orderBy(desc(schema.news.day)).limit(40),
    db.select().from(schema.resource).where(eq(schema.resource.published, true)).orderBy(desc(schema.resource.createdAt)).limit(40),
  ]);

  const items = [
    ...news.map((n) => ({ title: n.title, link: abs(`/noticias/${n.day}`), date: n.createdAt, text: n.summary, cat: "Noticias" })),
    ...resources.map((r) => ({
      title: r.title,
      link: abs(`/recursos/${r.slug}`),
      date: r.createdAt,
      text: r.summary || excerpt(r.body, 300),
      cat: "Recursos",
    })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 60);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${xmlEscape(SITE_NAME)}</title>
<link>${siteUrl()}/</link>
<description>${xmlEscape(SITE_DESCRIPTION)}</description>
<language>es</language>
<lastBuildDate>${(items[0]?.date ?? new Date()).toUTCString()}</lastBuildDate>
<atom:link href="${siteUrl()}/feed.xml" rel="self" type="application/rss+xml"/>
${items
  .map(
    (i) => `<item>
<title>${xmlEscape(i.title)}</title>
<link>${xmlEscape(i.link)}</link>
<guid isPermaLink="true">${xmlEscape(i.link)}</guid>
<pubDate>${i.date.toUTCString()}</pubDate>
<category>${i.cat}</category>
<description>${xmlEscape(i.text)}</description>
</item>`,
  )
  .join("\n")}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "content-type": "application/rss+xml; charset=utf-8", "cache-control": FEED_CACHE },
  });
}
