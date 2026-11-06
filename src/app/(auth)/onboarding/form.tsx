"use client";

import { useActionState, useEffect, useState } from "react";
import { MemberCard } from "@/components/member-card";
import { completeOnboarding, type OnboardingState } from "./actions";

export function OnboardingForm({
  defaultName,
  image,
  number,
  since,
}: {
  defaultName: string;
  image: string | null;
  number: number;
  since: string;
}) {
  const [state, action, pending] = useActionState<OnboardingState, FormData>(completeOnboarding, {});
  const [name, setName] = useState(defaultName);
  const [preview, setPreview] = useState<string | null>(image);

  useEffect(() => () => {
    if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
  }, [preview]);

  return (
    <form action={action} className="space-y-6">
      <MemberCard name={name.trim() || "Tu nombre"} image={preview} number={number} since={since} />

      <div className="space-y-4">
        <div>
          <label htmlFor="avatar" className="block text-sm font-semibold">
            Tu foto <span className="font-normal text-ash">(opcional)</span>
          </label>
          <input
            id="avatar"
            name="avatar"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setPreview(URL.createObjectURL(f));
            }}
            className="mt-1 w-full text-sm text-ash file:mr-3 file:rounded-full file:border file:border-hairline file:bg-paper file:px-4 file:py-2 file:font-semibold file:text-ink"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-semibold">Cómo te llamamos</label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            maxLength={60}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input mt-1"
          />
        </div>
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button className="btn btn-primary w-full" disabled={pending}>
        {pending ? "Guardando…" : "Listo, crear mi tarjeta"}
      </button>
    </form>
  );
}
