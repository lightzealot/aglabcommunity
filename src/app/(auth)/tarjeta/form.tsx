"use client";

import { useActionState, useEffect, useState } from "react";
import { MemberCard } from "@/components/member-card";
import { SOCIALS } from "@/lib/card";
import { updateCard, type CardState } from "./actions";

type Props = {
  name: string;
  handle: string;
  theme: "dark" | "light";
  country: string;
  bio: string;
  socials: Record<string, string>;
  image: string | null;
  number: number;
  since: string;
};

export function CardForm(p: Props) {
  const [state, action, pending] = useActionState<CardState, FormData>(updateCard, {});
  const [name, setName] = useState(p.name);
  const [handle, setHandle] = useState(p.handle);
  const [theme, setTheme] = useState(p.theme);
  const [preview, setPreview] = useState<string | null>(p.image);
  useEffect(() => () => {
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
  }, [preview]);

  return (
    <form action={action} className="space-y-5">
      <MemberCard
        name={name.trim() || "Tu nombre"}
        handle={handle.trim().replace(/^@/, "").toLowerCase() || null}
        theme={theme}
        image={preview}
        number={p.number}
        since={p.since}
      />

      <div>
        <label htmlFor="avatar" className="block text-sm font-semibold">Foto</label>
        <input
          id="avatar" name="avatar" type="file" accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) setPreview(URL.createObjectURL(f)); }}
          className="mt-1 w-full text-sm text-ash file:mr-3 file:rounded-full file:border file:border-hairline file:bg-paper file:px-4 file:py-2 file:font-semibold file:text-ink"
        />
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-semibold">Nombre</label>
        <input id="name" name="name" required minLength={2} maxLength={60} value={name} onChange={(e) => setName(e.target.value)} className="input mt-1" />
      </div>
      <div>
        <label htmlFor="handle" className="block text-sm font-semibold">Tu @ <span className="font-normal text-ash">(opcional)</span></label>
        <input id="handle" name="handle" value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="tuusuario" maxLength={21} autoCapitalize="none" className="input mt-1" />
        <p className="mt-1 text-xs text-ash">De 3 a 20 letras minúsculas, números, punto o guion bajo. También será tu enlace.</p>
      </div>
      <div>
        <p className="text-sm font-semibold">Tema</p>
        <div className="mt-1 grid grid-cols-2 gap-2">
          {(["dark", "light"] as const).map((t) => (
            <label key={t} className="card has-[:checked]:border-accent has-[:checked]:bg-accent-soft cursor-pointer p-3 text-center text-sm font-semibold">
              <input type="radio" name="theme" value={t} checked={theme === t} onChange={() => setTheme(t)} className="sr-only" />
              {t === "dark" ? "Oscura" : "Clara"}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="country" className="block text-sm font-semibold">País <span className="font-normal text-ash">(opcional)</span></label>
        <input id="country" name="country" defaultValue={p.country} maxLength={40} className="input mt-1" />
      </div>
      <div>
        <label htmlFor="bio" className="block text-sm font-semibold">Bio <span className="font-normal text-ash">(opcional)</span></label>
        <textarea id="bio" name="bio" rows={3} maxLength={120} defaultValue={p.bio} placeholder="A qué te dedicas o qué quieres construir." className="input mt-1" />
      </div>
      <div>
        <p className="text-sm font-semibold">Redes</p>
        <p className="text-xs text-ash">Opcionales, hasta 3. Escribe tu usuario o pega el enlace.</p>
        <div className="mt-2 space-y-2">
          {SOCIALS.map((s) => (
            <input key={s.id} name={`social_${s.id}`} defaultValue={p.socials[s.id] ?? ""} placeholder={`${s.label} · usuario`} className="input" />
          ))}
        </div>
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.ok && <p className="text-sm text-ash">Guardado ✓</p>}
      <button className="btn btn-primary w-full" disabled={pending}>{pending ? "Guardando…" : "Guardar mi tarjeta"}</button>
    </form>
  );
}
