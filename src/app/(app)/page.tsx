import { asc, eq, inArray } from "drizzle-orm";
import Link from "next/link";
import { Composer } from "@/components/composer";
import { LocalTime } from "@/components/local-time";
import { PostCard } from "@/components/post-card";
import { db, schema } from "@/db";
import { listEvents } from "@/lib/events";
import { myBoardIds, queryPosts } from "@/lib/feed";
import { requireMember } from "@/lib/session";

export default async function HomePage({ searchParams }: { searchParams: Promise<{ b?: string }> }) {
  const { user } = await requireMember();
  const { b } = await searchParams;

  const [boards, mine, [nextEvent]] = await Promise.all([
    db.select().from(schema.board).orderBy(asc(schema.board.position)),
    myBoardIds(user.id),
    listEvents(user.id, "upcoming", 1),
  ]);
  const boardIds = new Set(boards.map((x) => x.id));

  // Por defecto: mis boards (si tengo); "todos" o un board concreto con ?b=
  const filter = b && (b === "all" || boardIds.has(b)) ? b : mine.length ? "mine" : "all";
  const where =
    filter === "all"
      ? undefined
      : filter === "mine"
        ? inArray(schema.post.boardId, mine)
        : eq(schema.post.boardId, filter);

  const posts = await queryPosts({ me: user.id, where });

  const tab = (id: string, label: string) => (
    <Link
      key={id}
      href={id === "mine" ? "/" : `/?b=${id}`}
      className={`rounded-full border px-3 py-1.5 text-sm whitespace-nowrap ${
        filter === id
          ? "border-accent bg-accent text-white"
          : "border-hairline bg-paper text-ash hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <>
      <p className="label mb-2">Comunidad</p>
      <h1 className="display text-5xl">
        Feed<span className="text-accent">.</span>
      </h1>

      {nextEvent && (
        <Link href={`/calendario/${nextEvent.id}`} className="card mt-5 flex items-center gap-4 border-accent bg-accent-soft/40 p-4">
          <div className="min-w-0 flex-1">
            <p className="label">Próximo evento</p>
            <p className="font-semibold">{nextEvent.title}</p>
            <p className="text-sm text-ash">
              <LocalTime iso={nextEvent.startsAt.toISOString()} />
            </p>
          </div>
          <span className="text-sm font-semibold text-accent">{nextEvent.going ? "✓ Confirmado" : "Ver →"}</span>
        </Link>
      )}

      <div className="mt-5">
        <Composer
          boards={boards}
          defaultBoard={filter !== "all" && filter !== "mine" ? filter : (mine[0] ?? "general")}
        />
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {mine.length > 0 && tab("mine", "Mis boards")}
        {tab("all", "Todos")}
        {boards.map((x) => tab(x.id, x.name))}
      </div>

      <div className="mt-4 space-y-4">
        {posts.length === 0 ? (
          <p className="card p-8 text-center text-sm text-ash">
            Aún no hay publicaciones aquí. ¡Sé el primero en escribir!
          </p>
        ) : (
          posts.map((p) => <PostCard key={p.id} p={p} />)
        )}
      </div>
    </>
  );
}
