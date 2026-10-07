import { and, desc, eq, sql, type SQL } from "drizzle-orm";
import { db, schema } from "@/db";
import type { FeedPost } from "@/components/post-card";

/** Posts publicados con autor, board y contadores. */
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
      boardName: board.name,
      likes: sql<number>`(select count(*)::int from post_like pl where pl.post_id = ${post.id})`,
      comments: sql<number>`(select count(*)::int from comment c where c.post_id = ${post.id})`,
      liked: sql<boolean>`exists(select 1 from post_like pl where pl.post_id = ${post.id} and pl.user_id = ${opts.me})`,
    })
    .from(post)
    .innerJoin(user, eq(user.id, post.authorId))
    .innerJoin(board, eq(board.id, post.boardId))
    .where(and(eq(post.status, "published"), opts.where))
    .orderBy(desc(post.pinned), desc(post.createdAt))
    .limit(opts.limit ?? 30);
}

export async function myBoardIds(userId: string) {
  const rows = await db
    .select({ id: schema.userBoard.boardId })
    .from(schema.userBoard)
    .where(eq(schema.userBoard.userId, userId));
  return rows.map((r) => r.id);
}
