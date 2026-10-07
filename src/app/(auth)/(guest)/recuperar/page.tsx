"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthShell } from "@/components/auth-shell";
import { authClient } from "@/lib/auth-client";

export default function RecuperarPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    await authClient.requestPasswordReset({
      email: String(form.get("email")),
      redirectTo: "/restablecer",
    });
    setLoading(false);
    setSent(true);
  }

  return (
    <AuthShell title="Recuperar" subtitle="Te enviaremos un enlace para crear una contraseña nueva.">
      {sent ? (
        <p className="text-sm text-ash">
          Si el correo existe, recibirás un enlace en unos minutos. Revisa también spam.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <input name="email" type="email" required placeholder="Correo" className="input" />
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Enviando…" : "Enviar enlace"}
          </button>
        </form>
      )}
      <p className="mt-5 text-sm">
        <Link href="/login" className="font-semibold text-accent">Volver a entrar</Link>
      </p>
    </AuthShell>
  );
}
