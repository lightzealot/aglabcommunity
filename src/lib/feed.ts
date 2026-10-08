import { and, desc, eq, sql, type SQL } from "drizzle-orm";
import { db, schema } from "@/db";
import type { FeedPost } from "@/components/post-card";

/** Posts publicados con autor, board, contadores y quién comentó. */
export async function queryPosts(opts: { me: string; where?: SQL; limit?: number }): Promise<FeedPost[]> {
  const { post, user, board } = schema;
  return db
    .select({
      id: post.id,
      title: post.title,
      body: post.body,
      imageUrl: post.imageUrl,
      pinned: post.pinned,
      kind: post.kind,
      createdAt: post.createdAt,
      authorId: user.id,
      authorName: user.name,
      authorImage: user.image,
      authorPoints: user.points,
      boardName: board.name,
      likes: sql<number>`(select count(*)::int from post_like pl where pl.post_id = ${post.id})`,
      comments: sql<number>`(select count(*)::int from comment c where c.post_id = ${post.id})`,
      liked: sql<boolean>`exists(select 1 from post_like pl where pl.post_id = ${post.id} and pl.user_id = ${opts.me})`,
      lastCommentAt: sql<Date | null>`(select max(c.created_at) from comment c where c.post_id = ${post.id})`,
      commenters: sql<{ id: string; name: string; image: string | null }[] | null>`(
        select json_agg(t) from (
          select u.id, u.name, u.image
          from (
            select c.author_id, max(c.created_at) as m
            from comment c where c.post_id = ${post.id}
            group by c.author_id order by m desc limit 5
          ) k
          join "user" u on u.id = k.author_id
          order by k.m desc
        ) t
      )`,
    })
    .from(post)
    .innerJoin(user, eq(user.id, post.authorId))
    .innerJoin(board, eq(board.id, post.boardId))
    .where(and(eq(post.status, "published"), opts.where))
    .orderBy(desc(post.pinned), desc(post.createdAt))
    .limit(opts.limit ?? 30)
    .then((rows) =>
      rows.map((r) => ({
        ...r,
        lastCommentAt: r.lastCommentAt ? new Date(r.lastCommentAt) : null,
        commenters: r.commenters ?? [],
      })),
    );
}

export async function myBoardIds(userId: string) {
  const rows = await db
    .select({ id: schema.userBoard.boardId })
    .from(schema.userBoard)
    .where(eq(schema.userBoard.userId, userId));
  return rows.map((r) => r.id);
}
