"use client";

import { useState } from "react";

export function ShareButton({ path, text, className }: { path: string; text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  async function share() {
    const url = new URL(path, window.location.origin).toString();
    try {
      if (navigator.share) {
        await navigator.share({ title: "Mi tarjeta AG LAB", text, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* el usuario canceló */
    }
  }
  return (
    <button type="button" onClick={share} className={className}>
      {copied ? "Enlace copiado ✓" : "Comparte tu tarjeta"}
    </button>
  );
}
