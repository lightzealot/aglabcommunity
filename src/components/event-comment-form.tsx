"use client";

import { useActionState, useEffect, useRef } from "react";
import { addEventComment, type EventCommentState } from "@/app/(app)/calendario/actions";

export function EventCommentForm({ eventId }: { eventId: string }) {
  const [state, action, pending] = useActionState<EventCommentState, FormData>(addEventComment, {});
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.ok) ref.current?.reset();
  }, [state]);
  return (
    <form ref={ref} action={action} className="space-y-2">
      <input type="hidden" name="eventId" value={eventId} />
      <textarea name="body" required rows={3} maxLength={1000} placeholder="Pregunta, saluda o cuéntanos qué esperas del evento…" className="input" />
      <div className="flex items-center gap-3">
        <button className="btn btn-primary !py-2" disabled={pending}>
          {pending ? "Enviando…" : "Comentar"}
        </button>
        {state.error && <span className="text-sm text-red-600">{state.error}</span>}
      </div>
    </form>
  );
}
