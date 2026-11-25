import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { UUID_RE } from "@/lib/courses";
import { INVITE_COOKIE } from "@/lib/invite-const";

/** Lee y valida la invitación de la cookie de la petición (el evento debe existir). */
export async function inviteFromHeaders(
  headers: Headers | undefined | null,
): Promise<{ eventId: string; refId: string | null; title: string } | null> {
  const raw = headers?.get("cookie");
  const hit = raw?.split(/;\s*/).find((c) => c.startsWith(`${INVITE_COOKIE}=`));
  if (!hit) return null;
  let v = "";
  try {
    v = decodeURIComponent(hit.slice(INVITE_COOKIE.length + 1));
  } catch {
    return null;
  }
  const [eventId, refId] = v.split(".");
  if (!UUID_RE.test(eventId ?? "")) return null;
  const [ev] = await db.select({ title: schema.event.title }).from(schema.event).where(eq(schema.event.id, eventId));
  return ev ? { eventId, refId: refId && refId.length < 64 ? refId : null, title: ev.title } : null;
}
