"use client";

import { useState } from "react";

/** Comparte la invitación pública al evento (menú del teléfono: WhatsApp, etc.; si no, copia el enlace). */
export function InviteShare({ path, text }: { path: string; text: string }) {
  const [copied, setCopied] = useState(false);
  async function share() {
    const url = new URL(path, window.location.origin).toString();
    try {
      if (navigator.share) {
        await navigator.share({ title: "Te invito a AG Lab", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* canceló */
    }
  }
  return (
    <button type="button" onClick={share} className="btn btn-primary !py-2">
      {copied ? "Invitación copiada ✓" : "Invitar a alguien"}
    </button>
  );
}
