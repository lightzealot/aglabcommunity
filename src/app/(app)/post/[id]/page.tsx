import { asc, eq, sql } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteComment, deletePost, toggleCommentLike, togglePin } from "@/app/(app)/actions";
import { Avatar } from "@/components/avatar";
import { CommentForm } from "@/components/comment-form";
import { PostCard } from "@/components/post-card";
import { db, schema } from "@/db";
import { queryPosts } from "@/lib/feed";
import { requireMember } from "@/lib/session";
import { timeAgo } from "@/lib/time";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = await requireMember();
  const { id } = await params;
  if (!UUID.test(id)) notFound();

  const [post] = await queryPosts({ me: user.id, where: eq(schema.post.id, id), limit: 1 });
  if (!post) notFound();

  const { comment, user: author } = schema;
  const comments = await db
    .select({
      id: comment.id,
      body: comment.body,
      createdAt: comment.createdAt,
      authorId: author.id,
      authorName: author.name,
      authorImage: author.image,
      authorPoints: author.points,
      likes: sql<number>`(select count(*)::int from comment_like cl where cl.comment_id = ${comment.id})`,
      liked: sql<boolean>`exists(select 1 from comment_like cl where cl.comment_id = ${comment.id} and cl.user_id = ${user.id})`,
    })
    .from(comment)
    .innerJoin(author, eq(author.id, comment.authorId))
    .where(eq(comment.postId, id))
    .orderBy(asc(comment.createdAt));

  const canDeletePost = post.authorId === user.id || user.role === "admin";

  return (
    <>
      <Link href="/" className="text-sm text-ash hover:text-ink">← Volver al feed</Link>
      <div className="mt-3">
        <PostCard p={post} full />
      </div>

      {canDeletePost && (
        <div className="mt-3 flex gap-2">
          {user.role === "admin" && (
            <form action={togglePin}>
              <input type="hidden" name="postId" value={post.id} />
              <button className="btn btn-ghost !py-1.5">{post.pinned ? "Quitar fijado" : "Fijar"}</button>
            </form>
          )}
          <form action={deletePost}>
            <input type="hidden" name="postId" value={post.id} />
            <button className="btn btn-ghost !py-1.5">Eliminar post</button>
          </form>
        </div>
      )}

      <h2 className="display mt-8 mb-3 text-3xl">
        Comentarios<span className="text-accent">.</span>
      </h2>
      <div className="space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="card flex gap-3 p-4">
            <Avatar name={c.authorName} image={c.authorImage} points={c.authorPoints} size={36} />
            <div className="min-w-0 flex-1">
              <p className="text-sm">
                <Link href={`/u/${c.authorId}`} className="font-semibold hover:text-accent">{c.authorName}</Link>
                <span className="ml-2 text-xs text-hollow">{timeAgo(c.createdAt)}</span>
              </p>
              <p className="mt-1 text-sm break-words whitespace-pre-line">{c.body}</p>
              <div className="mt-2 flex items-center gap-4">
                <form action={toggleCommentLike}>
                  <input type="hidden" name="commentId" value={c.id} />
                  <button className={`text-xs font-semibold ${c.liked ? "text-accent" : "text-ash hover:text-ink"}`}>
                    {c.liked ? "▲" : "△"} {c.likes}
                  </button>
                </form>
                {(c.authorId === user.id || user.role === "admin") && (
                  <form action={deleteComment}>
                    <input type="hidden" name="commentId" value={c.id} />
                    <button className="text-xs text-hollow hover:text-ink">Eliminar</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        ))}
        {comments.length === 0 && <p className="text-sm text-ash">Nadie ha comentado todavía.</p>}
      </div>

      <div className="mt-5">
        <CommentForm postId={post.id} />
      </div>
    </>
  );
}
