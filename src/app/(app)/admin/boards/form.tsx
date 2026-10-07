"use client";

import { useActionState, useEffect, useRef } from "react";
import { saveBoard, type BoardState } from "./actions";

type Board = { id?: string; name: string; description: string; position: number };

export function BoardForm({ board }: { board?: Board }) {
  const [state, action, pending] = useActionState<BoardState, FormData>(saveBoard, {});
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok && !board) ref.current?.reset();
  }, [state, board]);

  return (
    <form ref={ref} action={action} className="flex flex-wrap items-center gap-2">
      {board?.id && <input type="hidden" name="id" value={board.id} />}
      <input name="name" required defaultValue={board?.name} placeholder="Nombre" className="input !w-48" />
      <input name="description" defaultValue={board?.description} placeholder="Descripción" className="input min-w-48 flex-1" />
      <input name="position" type="number" min={0} defaultValue={board?.position ?? 0} title="Orden" className="input !w-20" />
      <button className="btn btn-primary !py-2" disabled={pending}>
        {board ? "Guardar" : "Crear"}
      </button>
      {state.error && <span className="w-full text-sm text-red-600">{state.error}</span>}
      {state.ok && board && <span className="text-sm text-ash">✓</span>}
    </form>
  );
}
