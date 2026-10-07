"use client";

import { useActionState, useEffect, useRef } from "react";
import { addComment, type FormState } from "@/app/(app)/actions";

export function CommentForm({ postId }: { postId: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(addComment, {});
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) ref.current?.reset();
  }, [state]);

  return (
    <form ref={ref} action={action} className="space-y-2">
      <input type="hidden" name="postId" value={postId} />
      <textarea name="body" required rows={2} maxLength={2000} placeholder="Escribe un comentario…" className="input" />
      <div className="flex items-center gap-3">
        <button className="btn btn-primary !py-2" disabled={pending}>
          {pending ? "Enviando…" : "Comentar"}
        </button>
        {state.error && <span className="text-sm text-red-600">{state.error}</span>}
      </div>
    </form>
  );
}
