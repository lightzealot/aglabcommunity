import { asc, eq, inArray } from "drizzle-orm";
import Link from "next/link";
import { CalendarIcon } from "@/components/icons";
import { Composer } from "@/components/composer";
import { FeedWelcome } from "@/components/feed-welcome";
import { CommunityCard } from "@/components/community-card";
import { PostCard } from "@/components/post-card";
import { TopRankingCard } from "@/components/top-ranking-card";
import { db, schema } from "@/db";
import { getCommunity } from "@/lib/community";
import { listEvents } from "@/lib/events";
import { EmptyState } from "@/components/figure";
import { myBoardIds, queryPosts } from "@/lib/feed";
import { getLeaderboards } from "@/lib/ranking";
import { timeUntil } from "@/lib/time";

export type FeedUser = { id: string; name: string; image?: string | null; points: number; role: string };

/** Feed de la comunidad (para miembros aprobados). `b` es el filtro de board de la URL. */
export async function FeedPage({ user, b }: { user: FeedUser; b?: string }) {

  const [boards, mine, [nextEvent], community, boardsRank] = await Promise.all([
    db.select().from(schema.board).orderBy(asc(schema.board.position)),
    myBoardIds(user.id),
    listEvents(user.id, "upcoming", 1),
    getCommunity(),
    getLeaderboards(3),
  ]);
  const boardIds = new Set(boards.map((x) => x.id));

  // Por defecto: todos; "mine" (mis boards) o un board concreto con ?b=
  const filter = b && ((b === "mine" && mine.length > 0) || boardIds.has(b)) ? b : "all";
  const where =
    filter === "all"
      ? undefined
      : filter === "mine"
        ? inArray(schema.post.boardId, mine)
        : eq(schema.post.boardId, filter);

  const posts = await queryPosts({ me: user.id, where });

  // Solo 3 boards a la vista (más el que estés viendo); el resto va en "Más boards".
  const MAX_BOARDS = 3;
  const visibleIds = new Set(boards.slice(0, MAX_BOARDS).map((x) => x.id));
  if (filter !== "all" && filter !== "mine") visibleIds.add(filter);
  const shownBoards = boards.filter((x) => visibleIds.has(x.id));
  const moreBoards = boards.filter((x) => !visibleIds.has(x.id));

  const pill = (id: string, label: string) => (
    <Link
      key={id}
      href={id === "all" ? "/" : `/?b=${id}`}
      className={`rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap transition active:scale-95 ${
        filter === id
          ? "border-ink bg-ink text-paper"
          : "border-hairline bg-paper text-ash hover:border-ink hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="min-w-0 space-y-4">
        <FeedWelcome name={user.name} points={user.points} online={community.online} />
        <Composer
          boards={boards}
          defaultBoard={filter !== "all" && filter !== "mine" ? filter : (mine[0] ?? "general")}
          me={{ name: user.name, image: user.image ?? null, points: user.points }}
        />

        {nextEvent && (
          <Link
            href={`/calendario/${nextEvent.id}`}
            className="card flex items-center gap-3 border-accent bg-accent-soft/40 px-4 py-3 text-sm text-ash transition hover:shadow-md"
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
          {shownBoards.map((x) => pill(x.id, x.name))}
          {moreBoards.length > 0 && (
            <details key={filter} className="relative">
              <summary className="cursor-pointer list-none rounded-full border border-dashed border-hairline bg-paper px-3.5 py-1.5 text-sm whitespace-nowrap text-ash hover:border-ink hover:text-ink [&::-webkit-details-marker]:hidden">
                Más boards ({moreBoards.length}) ▾
              </summary>
              <div className="card absolute top-full left-0 z-10 mt-2 flex w-[min(20rem,calc(100vw-2rem))] flex-wrap gap-2 p-3 shadow-lg">
                {moreBoards.map((x) => pill(x.id, x.name))}
              </div>
            </details>
          )}
        </div>

        <div className="space-y-4">
          {posts.length === 0 ? (
            <EmptyState figure="drawer">Aún no hay publicaciones aquí. ¡Sé el primero en escribir!</EmptyState>
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
