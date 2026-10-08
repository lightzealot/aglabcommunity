import Link from "next/link";
import { togglePostLike } from "@/app/(app)/actions";
import { Avatar } from "@/components/avatar";
import { CommentIcon, PinIcon, ThumbIcon } from "@/components/icons";
import { timeAgo, timeShort } from "@/lib/time";

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
  authorImage: string | null;
  authorPoints: number;
  boardName: string;
  likes: number;
  comments: number;
  liked: boolean;
  lastCommentAt: Date | null;
  commenters: { id: string; name: string; image: string | null }[];
};

export function LikeButton({ postId, count, liked }: { postId: string; count: number; liked: boolean }) {
  return (
    <form action={togglePostLike}>
      <input type="hidden" name="postId" value={postId} />
      <button
        className={`flex items-center gap-1.5 text-sm font-semibold ${liked ? "text-accent" : "text-ash hover:text-ink"}`}
        aria-pressed={liked}
        aria-label={liked ? "Quitar me gusta" : "Me gusta"}
      >
        <ThumbIcon filled={liked} /> {count}
      </button>
    </form>
  );
}

/** "10h" si es reciente, "jun. 22" si es más viejo. */
function when(d: Date) {
  const days = (Date.now() - d.getTime()) / 86_400_000;
  if (days < 7) return timeShort(d);
  return new Intl.DateTimeFormat("es", { month: "short", day: "numeric" }).format(d);
}

export function PostCard({ p, full = false }: { p: FeedPost; full?: boolean }) {
  return (
    <article className={`card p-4 sm:p-5 ${p.pinned ? "!border-[#f2c14e] shadow-[0_0_0_1px_#f2c14e33]" : ""}`}>
      <header className="flex items-center gap-3">
        <Avatar name={p.authorName} image={p.authorImage} points={p.authorPoints} size={40} />
        <div className="min-w-0 flex-1">
          <Link href={`/u/${p.authorId}`} className="text-sm font-semibold hover:text-accent">
            {p.authorName}
          </Link>
          <p className="text-xs text-hollow">
            {full ? timeAgo(p.createdAt) : when(p.createdAt)} · <span className="font-semibold">{p.boardName}</span>
          </p>
        </div>
        {p.pinned && (
          <span className="flex items-center gap-1 text-xs font-semibold text-ink">
            <PinIcon size={14} /> Fijado
          </span>
        )}
        {p.kind === "intro" && <span className="label !text-ash">Presentación</span>}
      </header>

      <div className={`mt-3 flex gap-4 ${full ? "flex-col" : ""}`}>
        <div className="min-w-0 flex-1">
          {p.title &&
            (full ? (
              <h1 className="display text-4xl">{p.title}</h1>
            ) : (
              <Link href={`/post/${p.id}`}>
                <h2 className="text-lg font-semibold hover:text-accent">{p.title}</h2>
              </Link>
            ))}
          <p className={`mt-1 text-[0.9375rem] break-words whitespace-pre-line ${full ? "" : "line-clamp-2 text-ash"}`}>
            {p.body}
          </p>
        </div>
        {p.imageUrl &&
          (full ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.imageUrl} alt="" className="max-h-[28rem] rounded border border-hairline object-cover" />
          ) : (
            <Link href={`/post/${p.id}`} className="hidden shrink-0 sm:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.imageUrl} alt="" className="h-24 w-32 rounded border border-hairline object-cover" />
            </Link>
          ))}
      </div>

      <footer className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <LikeButton postId={p.id} count={p.likes} liked={p.liked} />
        <Link href={`/post/${p.id}`} className="flex items-center gap-1.5 text-sm font-semibold text-ash hover:text-ink">
          <CommentIcon /> {p.comments}
        </Link>
        {p.commenters.length > 0 && (
          <span className="flex -space-x-1.5">
            {p.commenters.map((c) => (
              <span key={c.id} className="rounded-full ring-2 ring-white" title={c.name}>
                <Avatar name={c.name} image={c.image} size={24} />
              </span>
            ))}
          </span>
        )}
        {p.lastCommentAt && !full && (
          <Link href={`/post/${p.id}`} className="text-xs font-semibold text-accent">
            Nuevo comentario hace {timeShort(p.lastCommentAt)}
          </Link>
        )}
      </footer>
    </article>
  );
}
