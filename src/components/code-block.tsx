"use client";

import { useState } from "react";

/** Bloque de código/prompt con botón para copiarlo. */
type Labels = { copy: string; copied: string; fallback: string };
const ES: Labels = { copy: "Copiar prompt", copied: "¡Copiado ✓", fallback: "Copia el texto:" };

export function CodeBlock({ code, labels = ES }: { code: string; labels?: Labels }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="overflow-hidden rounded-lg border border-hairline bg-[#0d0d0d]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2">
        <span className="font-mono text-[11px] tracking-wide text-white/60 uppercase">Prompt</span>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            } catch {
              window.prompt(labels.fallback, code);
            }
          }}
          className="rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-white hover:opacity-90"
        >
          {copied ? labels.copied : labels.copy}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[0.8125rem] leading-relaxed whitespace-pre-wrap text-white">
        <code>{code}</code>
      </pre>
    </div>
  );
}
