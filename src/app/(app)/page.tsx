import { asc, eq, inArray } from "drizzle-orm";
import Link from "next/link";
import { CalendarIcon } from "@/components/icons";
import { Composer } from "@/components/composer";
import { CommunityCard } from "@/components/community-card";
import { PostCard } from "@/components/post-card";
import { TopRankingCard } from "@/components/top-ranking-card";
import { db, schema } from "@/db";
import { getCommunity } from "@/lib/community";
import { listEvents } from "@/lib/events";
import { myBoardIds, queryPosts } from "@/lib/feed";
import { getLeaderboards } from "@/lib/ranking";
import { requireMember } from "@/lib/session";
import { timeUntil } from "@/lib/time";

export default async function HomePage({ searchParams }: { searchParams: Promise<{ b?: string }> }) {
  const { user } = await requireMember();
  const { b } = await searchParams;

  const [boards, mine, [nextEvent], community, boardsRank] = await Promise.all([
    db.select().from(schema.board).orderBy(asc(schema.board.position)),
    myBoardIds(user.id),
    listEvents(user.id, "upcoming", 1),
    getCommunity(),
    getLeaderboards(3),
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

  const pill = (id: string, label: string) => (
    <Link
      key={id}
      href={id === "mine" ? "/" : `/?b=${id}`}
      className={`rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors ${
        filter === id
          ? "border-ink bg-ink text-white"
          : "border-hairline bg-paper text-ash hover:border-ink hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="min-w-0 space-y-4">
        <Composer
          boards={boards}
          defaultBoard={filter !== "all" && filter !== "mine" ? filter : (mine[0] ?? "general")}
          me={{ name: user.name, image: user.image ?? null, points: user.points }}
        />

        {nextEvent && (
          <Link
            href={`/calendario/${nextEvent.id}`}
            className="flex items-center justify-center gap-2 py-1 text-sm text-ash hover:text-ink"
          >
            <CalendarIcon size={16} />
            <span>
              <strong className="text-ink">{nextEvent.title}</strong> {timeUntil(nextEvent.startsAt)}
            </span>
          </Link>
        )}

        <div className="flex flex-wrap gap-2">
          {pill("all", "Todos")}
          {mine.length > 0 && pill("mine", "Mis boards")}
          {boards.map((x) => pill(x.id, x.name))}
        </div>

        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="card p-8 text-center text-sm text-ash">
              Aún no hay publicaciones aquí. ¡Sé el primero en escribir!
            </p>
          ) : (
            posts.map((p) => <PostCard key={p.id} p={p} />)
          )}
        </div>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
        <CommunityCard c={community} isAdmin={user.role === "admin"} />
        <TopRankingCard entries={boardsRank.d30} />
      </aside>
    </div>
  );
}
