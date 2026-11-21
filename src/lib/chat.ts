import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { db, schema } from "@/db";

const { chatMessage: m, user } = schema;

export async function unreadChatCount(userId: string) {
  const [r] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(m)
    .where(and(eq(m.recipientId, userId), isNull(m.readAt)));
  return r?.n ?? 0;
}

export type Conversation = {
  otherId: string;
  name: string;
  image: string | null;
  role: "admin" | "member";
  last: string;
  lastAt: Date;
  lastMine: boolean;
  unread: number;
};

/** Una fila por persona con quien hay mensajes: último mensaje y cuántos sin leer. */
export async function listConversations(me: string): Promise<Conversation[]> {
  const rows = await db.execute<{
    other_id: string;
    last: string;
    last_at: Date;
    last_mine: boolean;
    unread: number;
  }>(sql`
    select distinct on (other_id)
      case when sender_id = ${me} then recipient_id else sender_id end as other_id,
      body as last,
      created_at as last_at,
      (sender_id = ${me}) as last_mine,
      (select count(*)::int from chat_message x
        where x.recipient_id = ${me} and x.read_at is null
          and x.sender_id = case when c.sender_id = ${me} then c.recipient_id else c.sender_id end) as unread
    from chat_message c
    where sender_id = ${me} or recipient_id = ${me}
    order by other_id, created_at desc
  `);
  const list = rows.rows;
  if (!list.length) return [];
  const people = await db
    .select({ id: user.id, name: user.name, image: user.image, role: user.role })
    .from(user);
  const byId = new Map(people.map((p) => [p.id, p]));
  return list
    .map((r): Conversation | null => {
      const p = byId.get(r.other_id);
      return p
        ? {
            otherId: r.other_id,
            name: p.name,
            image: p.image,
            role: p.role,
            last: r.last,
            lastAt: new Date(r.last_at),
            lastMine: r.last_mine,
            unread: r.unread,
          }
        : null;
    })
    .filter((x): x is Conversation => !!x)
    .sort((a, b) => b.lastAt.getTime() - a.lastAt.getTime());
}

export async function getThread(me: string, other: string, limit = 200) {
  const rows = await db
    .select({ id: m.id, senderId: m.senderId, body: m.body, createdAt: m.createdAt })
    .from(m)
    .where(
      sql`(${m.senderId} = ${me} and ${m.recipientId} = ${other}) or (${m.senderId} = ${other} and ${m.recipientId} = ${me})`,
    )
    .orderBy(desc(m.createdAt))
    .limit(limit);
  return rows.reverse();
}
