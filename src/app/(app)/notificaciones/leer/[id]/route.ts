import { and, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { UUID_RE } from "@/lib/courses";
import { isInternalPath } from "@/lib/notify";
import { getSession } from "@/lib/session";

// Marca como leída y redirige al destino de la notificación.
export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return Response.redirect(new URL("/login", req.url), 303);
  const { id } = await ctx.params;
  let href: string | null = null;
  if (UUID_RE.test(id)) {
    const [n] = await db
      .update(schema.notification)
      .set({ readAt: new Date() })
      .where(and(eq(schema.notification.id, id), eq(schema.notification.userId, session.user.id)))
      .returning({ href: schema.notification.href });
    href = n?.href ?? null;
  }
  return Response.redirect(new URL(isInternalPath(href) ? href : "/notificaciones", req.url), 303);
}
