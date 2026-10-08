"use client";

import { useState } from "react";

/** Bloque de código/prompt con botón para copiarlo. */
export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="group relative">
      <pre className="overflow-x-auto rounded-lg border border-hairline bg-[#0d0d0d] p-4 pr-20 text-[0.8125rem] leading-relaxed whitespace-pre-wrap text-white">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {
            window.prompt("Copia el texto:", code);
          }
        }}
        className="absolute top-2 right-2 rounded bg-white/15 px-2.5 py-1 text-xs font-semibold text-white hover:bg-white/25"
      >
        {copied ? "¡Copiado!" : "Copiar"}
      </button>
    </div>
  );
}
