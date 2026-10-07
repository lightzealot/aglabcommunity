import Link from "next/link";
import { togglePostLike } from "@/app/(app)/actions";
import { Avatar } from "@/components/avatar";
import { timeAgo } from "@/lib/time";

export type FeedPost = {
  id: string;
  title: string | null;
  body: string;
  imageUrl: string | null;
  pinned: boolean;
  kind: "intro" | "post";
  createdAt: Date;
  authorId: string;
  authorName: string;
  boardName: string;
  likes: number;
  comments: number;
  liked: boolean;
};

export function LikeButton({ postId, count, liked }: { postId: string; count: number; liked: boolean }) {
  return (
    <form action={togglePostLike}>
      <input type="hidden" name="postId" value={postId} />
      <button
        className={`flex items-center gap-1.5 text-sm font-semibold ${liked ? "text-accent" : "text-ash hover:text-ink"}`}
        aria-pressed={liked}
      >
        <span aria-hidden>{liked ? "▲" : "△"}</span> {count}
      </button>
    </form>
  );
}

export function PostCard({ p, full = false }: { p: FeedPost; full?: boolean }) {
  return (
    <article className="card p-5">
      <header className="flex items-center gap-3">
        <Avatar name={p.authorName} />
        <div className="min-w-0 flex-1">
          <Link href={`/u/${p.authorId}`} className="font-semibold hover:text-accent">
            {p.authorName}
          </Link>
          <p className="text-xs text-hollow">
            {timeAgo(p.createdAt)} · {p.boardName}
          </p>
        </div>
        {p.pinned && <span className="label">Fijado</span>}
        {p.kind === "intro" && <span className="label !text-ash">Presentación</span>}
      </header>

      <div className="mt-3">
        {p.title &&
          (full ? (
            <h1 className="display text-4xl">{p.title}</h1>
          ) : (
            <Link href={`/post/${p.id}`}>
              <h2 className="text-lg font-semibold hover:text-accent">{p.title}</h2>
            </Link>
          ))}
        <p className={`mt-1 text-[0.9375rem] break-words whitespace-pre-line ${full ? "" : "line-clamp-6"}`}>
          {p.body}
        </p>
        {p.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.imageUrl} alt="" className="mt-3 max-h-96 rounded border border-hairline object-cover" />
        )}
      </div>

      <footer className="mt-4 flex items-center gap-5">
        <LikeButton postId={p.id} count={p.likes} liked={p.liked} />
        <Link href={`/post/${p.id}`} className="text-sm font-semibold text-ash hover:text-ink">
          💬 {p.comments}
        </Link>
      </footer>
    </article>
  );
}
