import { and, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { SLUG_RE, SOURCE_COOKIE } from "@/lib/resource-constants";

/** ¿Existe un recurso publicado con ese slug? */
export async function resourceSlugExists(slug: string) {
  if (!SLUG_RE.test(slug)) return false;
  const [r] = await db
    .select({ id: schema.resource.id })
    .from(schema.resource)
    .where(and(eq(schema.resource.slug, slug), eq(schema.resource.published, true)));
  return !!r;
}

/** Lee la cookie de origen de la petición y devuelve el slug solo si corresponde a un recurso real. */
export async function sourceFromHeaders(headers: Headers | undefined | null): Promise<string | null> {
  const raw = headers?.get("cookie");
  if (!raw) return null;
  const hit = raw.split(/;\s*/).find((c) => c.startsWith(`${SOURCE_COOKIE}=`));
  if (!hit) return null;
  let slug = "";
  try {
    slug = decodeURIComponent(hit.slice(SOURCE_COOKIE.length + 1));
  } catch {
    return null;
  }
  return (await resourceSlugExists(slug)) ? slug : null;
}
