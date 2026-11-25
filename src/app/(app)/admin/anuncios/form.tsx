"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { sendAnnouncement, type AnnounceState } from "./actions";

export function AnnounceForm() {
  const [state, action, pending] = useActionState<AnnounceState, FormData>(sendAnnouncement, {});
  const ref = useRef<HTMLFormElement>(null);
  const [len, setLen] = useState(0);
  useEffect(() => {
    if (state.ok) {
      ref.current?.reset();
      setLen(0);
    }
  }, [state]);

  return (
    <form ref={ref} action={action} className="card mt-6 space-y-4 p-5">
      <div>
        <label htmlFor="title" className="block text-sm font-semibold">Título</label>
        <input id="title" name="title" required maxLength={120} placeholder="Ej: Nuevo recurso: Teleprompter Studio" className="input mt-1" />
      </div>
      <div>
        <label htmlFor="body" className="block text-sm font-semibold">Mensaje <span className="font-normal text-ash">(opcional)</span></label>
        <textarea id="body" name="body" rows={5} maxLength={1000} onChange={(e) => setLen(e.target.value.length)} placeholder="Escribe el aviso completo." className="input mt-1" />
        <p className="mt-1 text-right text-xs text-hollow">{len}/1000 caracteres · el título admite hasta 120</p>
      </div>
      <div>
        <label htmlFor="href" className="block text-sm font-semibold">Enlace al tocar <span className="font-normal text-ash">(opcional)</span></label>
        <input id="href" name="href" placeholder="/recursos/teleprompter-studio-guia" className="input mt-1" />
        <p className="mt-1 text-xs text-ash">Una ruta de la comunidad, como /recursos, /calendario o /noticias.</p>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="email" className="h-4 w-4" />
        También enviarlo por correo a quienes lo tienen activado
      </label>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.ok && <p className="text-sm font-semibold text-accent">Enviado a {state.count} miembros ✓</p>}
      <button className="btn btn-primary" disabled={pending}>
        {pending ? "Enviando…" : "Enviar a todos"}
      </button>
    </form>
  );
}
