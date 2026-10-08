"use client";

import { useActionState } from "react";
import { updateProfile, type FormState } from "@/app/(app)/actions";
import { Avatar } from "@/components/avatar";

export function ProfileForm({
  name,
  bio,
  emailNotifications,
  image,
}: {
  name: string;
  bio: string;
  emailNotifications: boolean;
  image: string | null;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(updateProfile, {});
  return (
    <form action={action} className="card space-y-3 p-5">
      <div className="flex flex-wrap items-center gap-4">
        <Avatar name={name} image={image} size={64} />
        <div className="space-y-1 text-sm">
          <p className="font-semibold">Foto de perfil</p>
          <input name="avatar" type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="text-ash file:mr-3 file:rounded file:border file:border-hairline file:bg-paper file:px-3 file:py-1.5" />
          {image && (
            <label className="flex items-center gap-2 text-ash">
              <input type="checkbox" name="removeAvatar" /> Quitar foto
            </label>
          )}
        </div>
      </div>
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
