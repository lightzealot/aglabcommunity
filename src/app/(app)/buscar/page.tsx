import { and, eq, ilike, or } from "drizzle-orm";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { PostCard } from "@/components/post-card";
import { db, schema } from "@/db";
import { queryPosts } from "@/lib/feed";
import { requireMember } from "@/lib/session";

export const metadata = { title: "Buscar" };

export default async function BuscarPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { user: me } = await requireMember();
  const { q: raw } = await searchParams;
  const q = (raw ?? "").trim().slice(0, 80);

  // Se escapan % y _ para que el texto se busque literalmente.
  const like = `%${q.replace(/[\\%_]/g, "\\$&")}%`;
  const [posts, people] = q
    ? await Promise.all([
        queryPosts({
          me: me.id,
          where: or(ilike(schema.post.title, like), ilike(schema.post.body, like)),
          limit: 20,
        }),
        db
          .select({ id: schema.user.id, name: schema.user.name, image: schema.user.image, bio: schema.user.bio, points: schema.user.points })
          .from(schema.user)
          .where(and(eq(schema.user.status, "approved"), ilike(schema.user.name, like)))
          .limit(10),
      ])
    : [[], []];

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="display text-4xl">
        {q ? <>Resultados para “{q}”</> : "Buscar"}
        <span className="text-accent">.</span>
      </h1>

      {!q && <p className="mt-3 text-sm text-ash">Escribe en la barra de arriba para buscar publicaciones y miembros.</p>}

      {q && people.length > 0 && (
        <section className="mt-6">
          <h2 className="label mb-2">Miembros</h2>
          <div className="card divide-y divide-hairline">
            {people.map((p) => (
              <Link key={p.id} href={`/u/${p.id}`} className="flex items-center gap-3 p-3 hover:bg-veil">
                <Avatar name={p.name} image={p.image} points={p.points} size={40} />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{p.name}</span>
                  {p.bio && <span className="block truncate text-xs text-ash">{p.bio}</span>}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {q && (
        <section className="mt-6">
          <h2 className="label mb-2">Publicaciones</h2>
          <div className="space-y-4">
            {posts.map((p) => (
              <PostCard key={p.id} p={p} />
            ))}
            {posts.length === 0 && <p className="card p-8 text-center text-sm text-ash">No encontramos publicaciones con ese texto.</p>}
          </div>
        </section>
      )}
    </div>
  );
}
