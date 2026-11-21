import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/avatar";
import { ChatThread } from "@/components/chat-thread";
import { db, schema } from "@/db";
import { getThread } from "@/lib/chat";
import { requireMember } from "@/lib/session";

export const metadata = { title: "Mensajes" };

export default async function ConversacionPage({ params }: { params: Promise<{ id: string }> }) {
  const { user: me } = await requireMember();
  const { id } = await params;
  if (id === me.id) notFound();
  const [other] = await db
    .select({ id: schema.user.id, name: schema.user.name, image: schema.user.image, role: schema.user.role })
    .from(schema.user)
    .where(and(eq(schema.user.id, id), eq(schema.user.status, "approved")));
  if (!other) notFound();

  const messages = await getThread(me.id, id);

  return (
    <>
      <Link href="/mensajes" className="text-sm text-ash hover:text-ink">
        ‹ Todos los mensajes
      </Link>
      <div className="mt-3 flex items-center gap-3">
        <Link href={`/u/${other.id}`}>
          <Avatar name={other.name} image={other.image} size={48} />
        </Link>
        <div className="min-w-0">
          <Link href={`/u/${other.id}`} className="block truncate text-xl font-bold hover:text-accent">
            {other.name}
          </Link>
          {other.role === "admin" && <span className="label">Administrador</span>}
        </div>
      </div>
      <ChatThread
        meId={me.id}
        otherId={other.id}
        otherName={other.name.split(" ")[0]}
        initial={messages.map((m) => ({ id: m.id, mine: m.senderId === me.id, body: m.body, at: m.createdAt.toISOString() }))}
      />
    </>
  );
}
