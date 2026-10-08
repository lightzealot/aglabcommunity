"use client";

import { useState } from "react";

/** Copia el enlace de registro de la comunidad. */
export function CopyInvite() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="btn btn-primary !py-2"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(`${window.location.origin}/registro`);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          window.prompt("Copia este enlace:", `${window.location.origin}/registro`);
        }
      }}
    >
      {copied ? "¡Enlace copiado!" : "Invitar"}
    </button>
  );
}
