"use client";

import { useActionState } from "react";
import { publishTodayNews, type NewsState } from "./actions";

export function PublishForm() {
  const [state, action, pending] = useActionState<NewsState, FormData>(() => publishTodayNews(), {});
  return (
    <form action={action} className="mt-4">
      <button className="btn btn-primary" disabled={pending}>
        {pending ? "Publicando… (puede tardar un minuto)" : "Publicar la noticia de hoy"}
      </button>
      {state.message && (
        <p className={`mt-3 text-sm ${state.ok ? "text-green-700" : "text-red-600"}`} role="status">
          {state.message}
        </p>
      )}
    </form>
  );
}
