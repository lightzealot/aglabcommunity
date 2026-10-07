"use client";

import { useActionState, useState, useSyncExternalStore } from "react";
import { saveEvent, type EventState } from "./actions";

type Ev = {
  id?: string;
  title: string;
  description: string;
  startsAtIso: string;
  durationMin: number;
  link: string;
};

const noop = () => () => {};

/** ISO (UTC) -> valor para <input type="datetime-local"> en la zona del navegador. */
function toLocalInput(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function EventForm({ ev }: { ev?: Ev }) {
  const [state, action, pending] = useActionState<EventState, FormData>(saveEvent, {});
  const [iso, setIso] = useState(ev?.startsAtIso ?? "");
  // Espera a estar en el navegador para mostrar la hora en su zona horaria.
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  return (
    <form action={action} className="card space-y-3 p-5">
      {ev?.id && <input type="hidden" name="id" value={ev.id} />}
      <input name="title" required defaultValue={ev?.title} placeholder="Título del evento" className="input font-semibold" />
      <textarea name="description" rows={4} defaultValue={ev?.description} placeholder="De qué trata, qué traer, etc." className="input" />
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm">
          <span className="mb-1 block text-ash">Fecha y hora (tu zona horaria)</span>
          <input
            key={mounted ? "client" : "server"}
            type="datetime-local"
            required
            defaultValue={mounted ? toLocalInput(iso) : ""}
            onChange={(e) => {
              const d = new Date(e.target.value);
              setIso(Number.isNaN(d.getTime()) ? "" : d.toISOString());
            }}
            className="input"
          />
        </label>
        <input type="hidden" name="startsAt" value={iso} />
        <label className="text-sm">
          <span className="mb-1 block text-ash">Duración (min)</span>
          <input name="durationMin" type="number" min={5} max={600} defaultValue={ev?.durationMin ?? 60} className="input !w-28" />
        </label>
      </div>
      <input name="link" defaultValue={ev?.link} placeholder="Enlace de Zoom / Meet (opcional)" className="input" />
      <div className="flex items-center gap-3">
        <button className="btn btn-primary !py-2" disabled={pending}>
          {pending ? "Guardando…" : ev?.id ? "Guardar evento" : "Crear evento y avisar"}
        </button>
        {state.ok && <span className="text-sm text-ash">Guardado ✓</span>}
        {state.error && <span className="text-sm text-red-600">{state.error}</span>}
      </div>
    </form>
  );
}
