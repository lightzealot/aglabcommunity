import type { MetadataRoute } from "next";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.BETTER_AUTH_URL ?? "";
  const rows = await db
    .select({ slug: schema.resource.slug, createdAt: schema.resource.createdAt })
    .from(schema.resource)
    .where(eq(schema.resource.published, true));
  return [
    { url: `${base}/recursos`, changeFrequency: "weekly", priority: 0.8 },
    ...rows.map((r) => ({ url: `${base}/recursos/${r.slug}`, lastModified: r.createdAt, priority: 0.7 })),
  ];
}
