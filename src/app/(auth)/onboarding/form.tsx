"use client";

import { useActionState } from "react";
import { BUSINESS_TYPES, LEVELS, TEAM_SIZES } from "@/lib/onboarding";
import { completeOnboarding, type OnboardingState } from "./actions";

type Board = { id: string; name: string; description: string };

function Step({ n, title, hint }: { n: string; title: string; hint?: string }) {
  return (
    <div className="mb-3">
      <p className="label">{n}</p>
      <h2 className="display text-3xl">{title}</h2>
      {hint && <p className="mt-1 text-sm text-ash">{hint}</p>}
    </div>
  );
}

export function OnboardingForm({ boards, defaultName }: { boards: Board[]; defaultName: string }) {
  const [state, action, pending] = useActionState<OnboardingState, FormData>(completeOnboarding, {});

  return (
    <form action={action} className="space-y-10">
      <section>
        <Step n="01" title="Cómo te llamamos" />
        <input name="name" required minLength={2} defaultValue={defaultName} className="input" />
      </section>

      <section>
        <Step n="02" title="Qué te interesa" hint="Elige uno o varios. Son los boards del foro." />
        <div className="grid gap-3 sm:grid-cols-2">
          {boards.map((b) => (
            <label key={b.id} className="card has-[:checked]:border-accent has-[:checked]:bg-accent-soft flex cursor-pointer gap-3 p-4">
              <input type="checkbox" name="boards" value={b.id} className="mt-1 accent-[#1961d5]" />
              <span>
                <span className="block font-semibold">{b.name}</span>
                <span className="block text-sm text-ash">{b.description}</span>
              </span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <Step n="03" title="Tu nivel" />
        <div className="grid gap-3 sm:grid-cols-3">
          {LEVELS.map((l) => (
            <label key={l.id} className="card has-[:checked]:border-accent has-[:checked]:bg-accent-soft cursor-pointer p-4">
              <input type="radio" name="level" value={l.id} required className="sr-only" />
              <span className="block font-semibold">{l.label}</span>
              <span className="block text-sm text-ash">{l.hint}</span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <Step n="04" title="Sobre tu negocio" hint="Nos ayuda a darte contenido útil para tu caso." />
        <div className="grid gap-3 sm:grid-cols-2">
          <select name="businessType" required defaultValue="" className="input">
            <option value="" disabled>Sector</option>
            {BUSINESS_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <select name="teamSize" required defaultValue="" className="input">
            <option value="" disabled>Tamaño del equipo</option>
            {TEAM_SIZES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <input name="phone" placeholder="WhatsApp o teléfono (opcional)" className="input sm:col-span-2" />
        </div>
      </section>

      <section>
        <Step
          n="05"
          title="Preséntate a la comunidad"
          hint="Es tu primer hilo: qué haces y qué quieres automatizar. Se publica cuando aprobemos tu cuenta."
        />
        <textarea
          name="intro"
          required
          minLength={20}
          rows={5}
          placeholder="Por ejemplo: soy Ana, llevo una clínica y quiero automatizar la atención por WhatsApp con IA."
          className="input"
        />
        <p className="mt-1 text-xs text-hollow">Mínimo 20 caracteres.</p>
      </section>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button className="btn btn-primary w-full sm:w-auto" disabled={pending}>
        {pending ? "Guardando…" : "Guardar y enviar mi solicitud"}
      </button>
    </form>
  );
}
