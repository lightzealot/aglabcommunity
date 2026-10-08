"use client";

import { useActionState, useEffect, useRef } from "react";
import { addResourceFile, saveResource, type ResourceState } from "./actions";

type Resource = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  published: boolean;
  position: number;
  coverUrl: string | null;
};

export function ResourceForm({ resource }: { resource: Resource }) {
  const [state, action, pending] = useActionState<ResourceState, FormData>(saveResource, {});
  return (
    <form action={action} className="card space-y-3 p-5">
      <input type="hidden" name="id" value={resource.id} />
      <input name="title" required defaultValue={resource.title} placeholder="Título" className="input font-semibold" />
      <label className="block text-sm">
        <span className="mb-1 block text-ash">Enlace público (comunidad.andresgomez.store/recursos/…)</span>
        <input name="slug" required defaultValue={resource.slug} className="input" />
      </label>
      <textarea
        name="summary"
        rows={2}
        maxLength={300}
        defaultValue={resource.summary}
        placeholder="Resumen corto: aparece en la tarjeta y en Google"
        className="input"
      />
      <textarea
        name="body"
        rows={12}
        defaultValue={resource.body}
        placeholder={"Guía completa (pública).\n\nFormato: ## Título de sección, listas con '- ', **negrita** y enlaces https://...\nSepara los párrafos con una línea en blanco."}
        className="input font-mono text-sm"
      />
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="published" defaultChecked={resource.published} className="accent-[#1961d5]" />
          Publicado (visible para todos)
        </label>
        <label className="flex items-center gap-2">
          Orden
          <input name="position" type="number" min={0} defaultValue={resource.position} className="input !w-20 !py-1.5" />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {resource.coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={resource.coverUrl} alt="" className="h-12 w-20 rounded object-cover" />
        )}
        <input
          name="cover"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="text-ash file:mr-3 file:rounded file:border file:border-hairline file:bg-paper file:px-3 file:py-1.5"
        />
        {resource.coverUrl && (
          <label className="flex items-center gap-2 text-ash">
            <input type="checkbox" name="removeCover" /> Quitar portada
          </label>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button className="btn btn-primary !py-2" disabled={pending}>
          {pending ? "Guardando…" : "Guardar recurso"}
        </button>
        {state.ok && <span className="text-sm text-ash">Guardado ✓</span>}
        {state.error && <span className="text-sm text-red-600">{state.error}</span>}
      </div>
    </form>
  );
}

export function ResourceFileUploader({ resourceId }: { resourceId: string }) {
  const [state, action, pending] = useActionState<ResourceState, FormData>(addResourceFile, {});
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.ok) ref.current?.reset();
  }, [state]);
  return (
    <form ref={ref} action={action} className="flex flex-wrap items-center gap-3">
      <input type="hidden" name="resourceId" value={resourceId} />
      <input
        name="file"
        type="file"
        required
        className="text-sm text-ash file:mr-3 file:rounded file:border file:border-hairline file:bg-paper file:px-3 file:py-1.5"
      />
      <button className="btn btn-ghost !py-1.5" disabled={pending}>
        {pending ? "Subiendo…" : "Subir archivo"}
      </button>
      {state.error && <span className="w-full text-sm text-red-600">{state.error}</span>}
    </form>
  );
}
