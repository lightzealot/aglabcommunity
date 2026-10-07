import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/avatar";
import { PostCard } from "@/components/post-card";
import { db, schema } from "@/db";
import { queryPosts } from "@/lib/feed";
import { requireMember } from "@/lib/session";

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { user: me } = await requireMember();
  const { id } = await params;

  const [u] = await db
    .select({
      id: schema.user.id,
      name: schema.user.name,
      bio: schema.user.bio,
      level: schema.user.level,
      points: schema.user.points,
      status: schema.user.status,
      createdAt: schema.user.createdAt,
    })
    .from(schema.user)
    .where(eq(schema.user.id, id));
  if (!u || u.status !== "approved") notFound();

  const posts = await queryPosts({ me: me.id, where: eq(schema.post.authorId, id) });

  return (
    <>
      <div className="card flex items-center gap-5 p-6">
        <Avatar name={u.name} size={72} />
        <div className="min-w-0 flex-1">
          <h1 className="display text-4xl">{u.name}<span className="text-accent">.</span></h1>
          <p className="label !text-ash mt-1">
            {u.level ?? "Miembro"} · desde {u.createdAt.toLocaleDateString("es", { month: "short", year: "numeric" })}
          </p>
          {u.bio && <p className="mt-2 text-sm text-ash">{u.bio}</p>}
        </div>
        <div className="text-right">
          <p className="display text-4xl">{u.points}</p>
          <p className="label">Puntos</p>
        </div>
      </div>
      {me.id === u.id && (
        <Link href="/perfil" className="btn btn-ghost mt-3 !py-1.5">Editar perfil</Link>
      )}
      <h2 className="display mt-8 mb-3 text-3xl">Publicaciones<span className="text-accent">.</span></h2>
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-sm text-ash">Sin publicaciones todavía.</p>
        ) : (
          posts.map((p) => <PostCard key={p.id} p={p} />)
        )}
      </div>
    </>
  );
}
