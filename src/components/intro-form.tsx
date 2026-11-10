"use client";

import { useActionState } from "react";
import { saveIntro, type IntroState } from "@/app/(auth)/gracias/actions";

export function IntroForm({ initial = "", pending: awaitingApproval = false }: { initial?: string; pending?: boolean }) {
  const [state, action, loading] = useActionState<IntroState, FormData>(saveIntro, {});
  return (
    <form action={action} className="card border-accent bg-accent-soft/40 p-5">
      <p className="label mb-1">Opcional · pero importante</p>
      <h2 className="display text-3xl">
        Déjale unas palabras a la comunidad<span className="text-accent">.</span>
      </h2>
      <p className="mt-1 text-sm text-ash">
        Quién eres y qué quieres crear con IA. {awaitingApproval ? "Se publicará cuando aprobemos tu cuenta." : "Es lo primero que verán de ti."}
      </p>
      <textarea
        name="intro"
        rows={3}
        maxLength={500}
        defaultValue={initial}
        placeholder="Hola, soy Ana. Quiero usar la IA para crear contenido y fotos para mi marca."
        className="input mt-3"
      />
      {state.error && <p className="mt-2 text-sm text-red-600">{state.error}</p>}
      {state.ok && <p className="mt-2 text-sm text-ash">Publicado ✓</p>}
      <button className="btn btn-primary mt-3 w-full" disabled={loading}>
        {loading ? "Publicando…" : initial ? "Actualizar mensaje" : "Publicar mi mensaje"}
      </button>
    </form>
  );
}
