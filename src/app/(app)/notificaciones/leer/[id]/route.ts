import { and, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { UUID_RE } from "@/lib/courses";
import { isInternalPath } from "@/lib/notify";
import { getSession } from "@/lib/session";

// Redirección relativa: detrás de un proxy, `req.url` trae la dirección interna del
// contenedor (localhost:3000). Con `Location` relativo el navegador usa el dominio real.
const redirectTo = (path: string) =>
  new Response(null, { status: 303, headers: { Location: path } });

// Marca como leída y redirige al destino de la notificación.
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return redirectTo("/login");
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
  return redirectTo(isInternalPath(href) ? href : "/notificaciones");
}
