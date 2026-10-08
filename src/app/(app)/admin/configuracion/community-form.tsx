"use client";

import { useActionState } from "react";
import { saveCommunity, type CommunityState } from "./actions";

export function CommunityForm({ description, coverUrl }: { description: string; coverUrl: string | null }) {
  const [state, action, pending] = useActionState<CommunityState, FormData>(saveCommunity, {});
  return (
    <form action={action} className="mt-4 space-y-3">
      <textarea
        name="description"
        rows={5}
        maxLength={1500}
        defaultValue={description}
        placeholder="De qué trata la comunidad y para quién es"
        className="input"
      />
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={coverUrl} alt="" className="h-14 w-24 rounded object-cover" />
        )}
        <input
          name="cover"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="text-ash file:mr-3 file:rounded file:border file:border-hairline file:bg-paper file:px-3 file:py-1.5"
        />
        {coverUrl && (
          <label className="flex items-center gap-2 text-ash">
            <input type="checkbox" name="removeCover" /> Quitar portada
          </label>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button className="btn btn-primary !py-2" disabled={pending}>
          {pending ? "Guardando…" : "Guardar"}
        </button>
        {state.ok && <span className="text-sm text-ash">Guardado ✓</span>}
        {state.error && <span className="text-sm text-red-600">{state.error}</span>}
      </div>
    </form>
  );
}
