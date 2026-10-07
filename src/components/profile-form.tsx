"use client";

import { useActionState } from "react";
import { updateProfile, type FormState } from "@/app/(app)/actions";

export function ProfileForm({
  name,
  bio,
  emailNotifications,
}: {
  name: string;
  bio: string;
  emailNotifications: boolean;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(updateProfile, {});
  return (
    <form action={action} className="card space-y-3 p-5">
      <label className="block text-sm font-semibold">Nombre</label>
      <input name="name" required defaultValue={name} className="input" />
      <label className="block text-sm font-semibold">Bio</label>
      <textarea name="bio" rows={3} maxLength={300} defaultValue={bio} placeholder="Qué haces y qué quieres automatizar" className="input" />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="emailNotifications" defaultChecked={emailNotifications} className="accent-[#1961d5]" />
        Recibir recordatorios de eventos y el resumen semanal por correo
      </label>
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
