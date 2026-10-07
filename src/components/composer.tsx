"use client";

import { useActionState, useEffect, useRef } from "react";
import { createPost, type FormState } from "@/app/(app)/actions";

type Board = { id: string; name: string };

export function Composer({ boards, defaultBoard }: { boards: Board[]; defaultBoard: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(createPost, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="card space-y-3 p-4">
      <input name="title" maxLength={120} placeholder="Título (opcional)" className="input font-semibold" />
      <textarea name="body" required rows={3} maxLength={5000} placeholder="Comparte algo con la comunidad…" className="input" />
      <div className="flex flex-wrap items-center gap-3">
        <select name="boardId" defaultValue={defaultBoard} className="input !w-auto">
          {boards.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
        <input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="text-sm text-ash file:mr-3 file:rounded file:border file:border-hairline file:bg-paper file:px-3 file:py-1.5 file:text-sm" />
        <button className="btn btn-primary ml-auto !py-2" disabled={pending}>
          {pending ? "Publicando…" : "Publicar"}
        </button>
      </div>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
