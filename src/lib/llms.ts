import { desc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { excerpt } from "@/lib/news-format";
import { abs, FOUNDER, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

async function load() {
  const [news, resources, courses] = await Promise.all([
    db.select().from(schema.news).orderBy(desc(schema.news.day)).limit(120),
    db
      .select()
      .from(schema.resource)
      .where(eq(schema.resource.published, true))
      .orderBy(schema.resource.position, schema.resource.createdAt),
    db.select().from(schema.course).where(eq(schema.course.published, true)).orderBy(schema.course.position),
  ]);
  return { news, resources, courses: courses.filter((c) => c.slug) };
}

const intro = () =>
  `# ${SITE_NAME}\n\n> ${SITE_DESCRIPTION}\n\n${SITE_NAME} es la comunidad de ${FOUNDER} (en español) para implementar inteligencia artificial y automatización en empresas de servicios. ` +
  `Todo el contenido de abajo es público y se puede citar enlazando a su página.`;

/** /llms.txt: índice en Markdown para agentes de IA (estándar llmstxt.org). Se regenera con cada noticia o recurso nuevo. */
export async function buildLlmsTxt() {
  const { news, resources, courses } = await load();
  const out = [intro()];
  out.push(
    `## Noticias de IA (una nueva cada día)\n\n- [Todas las noticias](${abs("/noticias")}): archivo completo, la más reciente primero\n` +
      news.slice(0, 30).map((n) => `- [${n.title}](${abs(`/noticias/${n.day}`)}) (${n.day}): ${excerpt(n.summary, 140)}`).join("\n"),
  );
  if (resources.length)
    out.push(
      `## Recursos gratuitos (guías, prompts y plantillas)\n\n- [Todos los recursos](${abs("/recursos")})\n` +
        resources.map((r) => `- [${r.title}](${abs(`/recursos/${r.slug}`)}): ${r.summary || excerpt(r.body, 140)}`).join("\n"),
    );
  if (courses.length)
    out.push(
      `## Cursos\n\n` + courses.map((c) => `- [${c.title}](${abs(`/cursos/${c.slug}`)}): ${excerpt(c.description, 140)}`).join("\n"),
    );
  out.push(
    `## Más\n\n- [Contenido completo en un solo archivo](${abs("/llms-full.txt")})\n- [Feed RSS](${abs("/feed.xml")})\n- [Sitemap](${abs("/sitemap.xml")})`,
  );
  return `${out.join("\n\n")}\n`;
}

/** /llms-full.txt: el texto completo de noticias y recursos, para que un agente lo lea sin rastrear página por página. */
export async function buildLlmsFull() {
  const { news, resources, courses } = await load();
  const out = [intro()];
  out.push(`## Noticias de IA`);
  for (const n of news) out.push(`### ${n.title}\n\nFecha: ${n.day}\nURL: ${abs(`/noticias/${n.day}`)}\n\n${n.summary}`);
  if (resources.length) out.push(`## Recursos gratuitos`);
  for (const r of resources)
    out.push(`### ${r.title}\n\nURL: ${abs(`/recursos/${r.slug}`)}\n\n${r.summary ? `${r.summary}\n\n` : ""}${r.body}`);
  if (courses.length) out.push(`## Cursos`);
  for (const c of courses) out.push(`### ${c.title}\n\nURL: ${abs(`/cursos/${c.slug}`)}\n\n${c.description}`);
  return `${out.join("\n\n")}\n`;
}
