"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { markThreadRead, sendMessage, type ChatState } from "@/app/(app)/mensajes/actions";

type Msg = { id: string; mine: boolean; body: string; at: string };

const hour = (iso: string) => new Date(iso).toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });
const dayLabel = (iso: string) =>
  new Date(iso).toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" });

/** Conversación con envío y actualización automática (cada pocos segundos mientras la pestaña está visible). */
export function ChatThread({
  meId: _meId,
  otherId,
  otherName,
  initial,
}: {
  meId: string;
  otherId: string;
  otherName: string;
  initial: Msg[];
}) {
  const router = useRouter();
  const [state, action, pending] = useActionState<ChatState, FormData>(sendMessage, {});
  const bottom = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const last = useRef(initial.at(-1)?.id);

  useEffect(() => {
    markThreadRead(otherId);
  }, [otherId, initial.length]);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  // Desplaza al último mensaje cuando llega uno nuevo.
  useEffect(() => {
    const id = initial.at(-1)?.id;
    bottom.current?.scrollIntoView({ behavior: last.current === undefined ? "auto" : "smooth", block: "end" });
    last.current = id;
  }, [initial]);

  useEffect(() => {
    const t = setInterval(() => {
      if (document.visibilityState === "visible") router.refresh();
    }, 5000);
    return () => clearInterval(t);
  }, [router]);

  let prevDay = "";
  return (
    <div className="mt-4">
      <div className="card flex max-h-[58vh] min-h-64 flex-col gap-1 overflow-y-auto p-4">
        {initial.length === 0 && (
          <p className="my-auto text-center text-sm text-ash">
            Aún no hay mensajes. Escríbele a {otherName} para empezar la conversación.
          </p>
        )}
        {initial.map((m) => {
          const d = dayLabel(m.at);
          const sep = d !== prevDay;
          prevDay = d;
          return (
            <div key={m.id} className="flex flex-col">
              {sep && <p className="my-2 text-center text-[11px] tracking-wide text-hollow uppercase">{d}</p>}
              <div className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`feed-in max-w-[80%] rounded-2xl px-3.5 py-2 text-[0.9375rem] break-words whitespace-pre-line ${
                    m.mine ? "rounded-br-sm bg-accent text-white" : "rounded-bl-sm bg-veil"
                  }`}
                >
                  {m.body}
                  <span className={`mt-0.5 block text-right text-[10px] ${m.mine ? "text-white/70" : "text-hollow"}`}>
                    {hour(m.at)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottom} />
      </div>

      <form ref={formRef} action={action} className="mt-3 flex items-end gap-2">
        <input type="hidden" name="to" value={otherId} />
        <textarea
          name="body"
          required
          rows={1}
          maxLength={2000}
          placeholder={`Escríbele a ${otherName}…`}
          className="input max-h-32 min-h-11 flex-1 resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
        />
        <button className="btn btn-primary !rounded-full !py-3" disabled={pending}>
          {pending ? "…" : "Enviar"}
        </button>
      </form>
      {state.error && <p className="mt-2 text-sm text-red-600">{state.error}</p>}
    </div>
  );
}
