import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { CommentIcon, PinIcon } from "@/components/icons";
import { LikeButton, SharePost } from "@/components/like-button";
import { PostBody } from "@/components/post-body";
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

/** "10h" si es reciente, "jun. 22" si es más viejo. */
function when(d: Date) {
  const days = (Date.now() - d.getTime()) / 86_400_000;
  if (days < 7) return timeShort(d);
  return new Intl.DateTimeFormat("es", { month: "short", day: "numeric" }).format(d);
}

export function PostCard({ p, full = false }: { p: FeedPost; full?: boolean }) {
  return (
    <article className={`card feed-in p-4 transition-shadow hover:shadow-md sm:p-5 ${p.pinned ? "!border-[#f2c14e] shadow-[0_0_0_1px_#f2c14e33]" : ""}`}>
      <header className="flex items-center gap-3">
        <Avatar name={p.authorName} image={p.authorImage} points={p.authorPoints} size={40} />
        <div className="min-w-0 flex-1">
          <Link href={`/u/${p.authorId}`} className="text-sm font-semibold hover:text-accent">
            {p.authorName}
          </Link>
          <p className="text-xs text-hollow">
            {full ? timeAgo(p.createdAt) : when(p.createdAt)} ·{" "}
            <span className="rounded bg-accent-soft px-1.5 py-0.5 text-[11px] font-semibold text-accent">{p.boardName}</span>
          </p>
        </div>
        {p.pinned && (
          <span className="flex items-center gap-1 text-xs font-semibold text-ink">
            <PinIcon size={14} /> Fijado
          </span>
        )}
        {p.kind === "intro" && <span className="label !text-ash">Presentación</span>}
      </header>

      <div className={`mt-3 flex gap-4 ${full ? "flex-col" : "flex-col sm:flex-row"}`}>
        <div className="min-w-0 flex-1">
          {p.title &&
            (full ? (
              <h1 className="display text-4xl">{p.title}</h1>
            ) : (
              <Link href={`/post/${p.id}`}>
                <h2 className="text-lg font-semibold hover:text-accent">{p.title}</h2>
              </Link>
            ))}
          <div className="mt-1">
            {full ? (
              <p className="text-[0.9375rem] break-words whitespace-pre-line">{p.body}</p>
            ) : (
              <PostBody text={p.body} />
            )}
          </div>
        </div>
        {p.imageUrl &&
          (full ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.imageUrl} alt="" className="max-h-[28rem] rounded border border-hairline object-cover" />
          ) : (
            <Link href={`/post/${p.id}`} className="block shrink-0 overflow-hidden rounded-lg border border-hairline">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.imageUrl} alt="" className="aspect-[16/9] w-full object-cover transition-transform duration-300 hover:scale-[1.03] sm:aspect-auto sm:h-24 sm:w-32" />
            </Link>
          ))}
      </div>

      <footer className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-hairline pt-3">
        <LikeButton postId={p.id} count={p.likes} liked={p.liked} />
        <Link href={`/post/${p.id}`} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-ash transition-colors hover:bg-veil hover:text-ink">
          <CommentIcon /> {p.comments > 0 ? p.comments : "Comentar"}
        </Link>
        {p.commenters.length > 0 && (
          <span className="flex -space-x-1.5">
            {p.commenters.map((c) => (
              <span key={c.id} className="rounded-full ring-2 ring-paper" title={c.name}>
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
        <SharePost postId={p.id} />
      </footer>
    </article>
  );
}
