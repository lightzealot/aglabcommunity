"use client";

import { useOptimistic, useState, useTransition } from "react";
import { togglePostLike } from "@/app/(app)/actions";
import { ThumbIcon } from "@/components/icons";

/** Me gusta con respuesta inmediata: el contador cambia al tocar, sin esperar al servidor. */
export function LikeButton({ postId, count, liked }: { postId: string; count: number; liked: boolean }) {
  const [state, flip] = useOptimistic({ count, liked }, (s) => ({
    liked: !s.liked,
    count: s.count + (s.liked ? -1 : 1),
  }));
  const [, start] = useTransition();
  const [pop, setPop] = useState(0);

  return (
    <button
      type="button"
      onClick={() => {
        setPop((n) => n + 1);
        start(async () => {
          flip(null);
          const fd = new FormData();
          fd.set("postId", postId);
          await togglePostLike(fd);
        });
      }}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
        state.liked ? "bg-accent-soft text-accent" : "text-ash hover:bg-veil hover:text-ink"
      }`}
      aria-pressed={state.liked}
      aria-label={state.liked ? "Quitar me gusta" : "Me gusta"}
    >
      <span key={pop} className={pop ? "like-pop inline-flex" : "inline-flex"}>
        <ThumbIcon filled={state.liked} />
      </span>
      <span className="tabular-nums">{state.count}</span>
    </button>
  );
}

/** Copia (o comparte, en el celular) el enlace de la publicación. */
export function SharePost({ postId }: { postId: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        const url = new URL(`/post/${postId}`, window.location.origin).toString();
        try {
          if (navigator.share) return await navigator.share({ url });
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          /* cancelado */
        }
      }}
      className="ml-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-ash transition-colors hover:bg-veil hover:text-ink"
      aria-label="Compartir publicación"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 15V4M8 8l4-4 4 4M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
      </svg>
      {copied ? "Copiado ✓" : "Compartir"}
    </button>
  );
}
