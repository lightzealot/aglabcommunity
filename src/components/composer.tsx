"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createPost, type FormState } from "@/app/(app)/actions";
import { Avatar } from "@/components/avatar";

type Board = { id: string; name: string };
type Me = { name: string; image: string | null; points: number };

const STARTERS = [
  { label: "👋 Preséntate", title: "Me presento", hint: "Cuenta quién eres, a qué te dedicas y qué quieres lograr con IA…" },
  { label: "❓ Haz una pregunta", title: "", hint: "¿Qué te trabó? Cuenta qué intentaste y qué resultado obtuviste…" },
  { label: "🏆 Comparte un logro", title: "", hint: "¿Qué te salió bien esta semana? Cuenta cómo lo hiciste…" },
  { label: "💡 Comparte un prompt", title: "", hint: "Pega el prompt y explica para qué te sirve…" },
];

/** Tarjeta "Escribe algo…" que se despliega al hacer clic. */
export function Composer({ boards, defaultBoard, me }: { boards: Board[]; defaultBoard: string; me: Me }) {
  const [state, action, pending] = useActionState<FormState, FormData>(createPost, {});
  const [open, setOpen] = useState(false);
  const [starter, setStarter] = useState<(typeof STARTERS)[number] | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
    }
  }, [state]);

  if (!open) {
    return (
      <div className="card p-3 shadow-sm transition hover:shadow-md">
        <button
          onClick={() => {
            setStarter(null);
            setOpen(true);
          }}
          className="flex w-full items-center gap-3 text-left"
        >
          <Avatar name={me.name} image={me.image} points={me.points} size={40} />
          <span className="flex-1 rounded-full bg-veil px-4 py-2.5 text-ash">¿Qué quieres compartir hoy?</span>
        </button>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {STARTERS.map((s) => (
            <button
              key={s.label}
              onClick={() => {
                setStarter(s);
                setOpen(true);
              }}
              className="shrink-0 rounded-full border border-hairline px-3 py-1.5 text-sm whitespace-nowrap text-ash transition hover:border-accent hover:text-accent active:scale-95"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} className="card feed-in space-y-3 p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <Avatar name={me.name} image={me.image} points={me.points} size={40} />
        <p className="text-sm font-semibold">{me.name}</p>
      </div>
      <input name="title" maxLength={120} defaultValue={starter?.title ?? ""} placeholder="Título (opcional)" className="input font-semibold" />
      <textarea name="body" required rows={4} maxLength={5000} autoFocus placeholder={starter?.hint ?? "Comparte algo con la comunidad…"} className="input" />
      <div className="flex flex-wrap items-center gap-3">
        <select name="boardId" defaultValue={defaultBoard} className="input !w-auto">
          {boards.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
        <input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="text-sm text-ash file:mr-3 file:rounded file:border file:border-hairline file:bg-paper file:px-3 file:py-1.5 file:text-sm" />
        <div className="ml-auto flex items-center gap-2">
          <button type="button" className="btn !py-2 text-ash" onClick={() => setOpen(false)}>
            Cancelar
          </button>
          <button className="btn btn-primary !py-2" disabled={pending}>
            {pending ? "Publicando…" : "Publicar"}
          </button>
        </div>
      </div>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
