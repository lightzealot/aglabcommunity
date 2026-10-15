import type { MetadataRoute } from "next";
import { desc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { abs, siteUrl } from "@/lib/site";

// Se arma en cada petición: cada día entra una noticia nueva y los recursos cambian cuando el admin publica.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const [resources, courses, news] = await Promise.all([
    db
      .select({ slug: schema.resource.slug, createdAt: schema.resource.createdAt, coverUrl: schema.resource.coverUrl })
      .from(schema.resource)
      .where(eq(schema.resource.published, true)),
    db
      .select({ slug: schema.course.slug, createdAt: schema.course.createdAt, coverUrl: schema.course.coverUrl })
      .from(schema.course)
      .where(eq(schema.course.published, true)),
    db.select({ day: schema.news.day, createdAt: schema.news.createdAt }).from(schema.news).orderBy(desc(schema.news.day)),
  ]);

  const newest = (dates: Date[]) => (dates.length ? new Date(Math.max(...dates.map((d) => d.getTime()))) : undefined);

  return [
    {
      url: `${base}/`,
      lastModified: newest([...news.map((n) => n.createdAt), ...resources.map((r) => r.createdAt)]),
      changeFrequency: "daily",
      priority: 1,
    },
    { url: `${base}/noticias`, lastModified: newest(news.map((n) => n.createdAt)), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/recursos`, lastModified: newest(resources.map((r) => r.createdAt)), changeFrequency: "weekly", priority: 0.8 },
    ...news.map((n) => ({
      url: `${base}/noticias/${n.day}`,
      lastModified: n.createdAt,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...resources.map((r) => ({
      url: `${base}/recursos/${r.slug}`,
      lastModified: r.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: r.coverUrl ? [abs(r.coverUrl)] : undefined,
    })),
    ...courses.flatMap((c) =>
      c.slug
        ? [
            {
              url: `${base}/cursos/${c.slug}`,
              lastModified: c.createdAt,
              changeFrequency: "monthly" as const,
              priority: 0.7,
              images: c.coverUrl ? [abs(c.coverUrl)] : undefined,
            },
          ]
        : [],
    ),
  ];
}
