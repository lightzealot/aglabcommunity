import { and, asc, eq, sql } from "drizzle-orm";
import { db, schema } from "@/db";
import { getSession } from "@/lib/session";

export { SLUG_RE, SOURCE_COOKIE, slugify } from "@/lib/resource-constants";
export { resourceSlugExists } from "@/lib/signup-source";
import { SLUG_RE } from "@/lib/resource-constants";

export type Viewer =
  | { kind: "visitor" }
  /** Tiene cuenta pero aún no entra a la comunidad (onboarding o revisión): puede descargar. */
  | { kind: "lead"; user: { id: string; onboarded: boolean; status: string } }
  | { kind: "member"; user: NonNullable<Awaited<ReturnType<typeof getSession>>>["user"] };

export async function getViewer(): Promise<Viewer> {
  const session = await getSession();
  const u = session?.user;
  if (!u || u.status === "banned") return { kind: "visitor" };
  if (u.onboarded && u.status === "approved") return { kind: "member", user: u };
  return { kind: "lead", user: { id: u.id, onboarded: u.onboarded, status: u.status } };
}

export async function listPublishedResources() {
  return db
    .select({
      id: schema.resource.id,
      slug: schema.resource.slug,
      title: schema.resource.title,
      summary: schema.resource.summary,
      coverUrl: schema.resource.coverUrl,
      files: sql<number>`(select count(*)::int from resource_file f where f.resource_id = "resource"."id")`,
    })
    .from(schema.resource)
    .where(eq(schema.resource.published, true))
    .orderBy(asc(schema.resource.position), asc(schema.resource.createdAt));
}

export async function getResourceBySlug(slug: string, includeDrafts = false) {
  if (!SLUG_RE.test(slug)) return null;
  const [r] = await db
    .select()
    .from(schema.resource)
    .where(and(eq(schema.resource.slug, slug), includeDrafts ? undefined : eq(schema.resource.published, true)));
  if (!r) return null;
  const files = await db
    .select()
    .from(schema.resourceFile)
    .where(eq(schema.resourceFile.resourceId, r.id))
    .orderBy(asc(schema.resourceFile.createdAt));
  return { ...r, files };
}
