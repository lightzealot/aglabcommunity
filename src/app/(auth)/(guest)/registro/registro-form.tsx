"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "@/components/auth-shell";
import { GoogleButton } from "@/components/google-button";
import { authClient } from "@/lib/auth-client";

export function RegistroForm({ googleEnabled, from }: { googleEnabled: boolean; from?: string }) {
  // Si llega desde un recurso, vuelve a él (con la descarga ya desbloqueada).
  const after = from ? `/recursos/${from}?welcome=1` : "/";
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const { error } = await authClient.signUp.email({
      name: String(form.get("name")),
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setLoading(false);
    if (error) return setError(error.message ?? "No pudimos crear tu cuenta.");
    router.replace(after);
    router.refresh();
  }

  return (
    <AuthShell
      title="Únete"
      subtitle="Crea tu cuenta. Aprobamos cada solicitud manualmente antes de dar acceso."
    >
      {googleEnabled && <GoogleButton callbackURL={after} />}
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="name" required placeholder="Nombre" className="input" autoComplete="name" />
        <input name="email" type="email" required placeholder="Correo" className="input" autoComplete="email" />
        <input name="password" type="password" required minLength={8} placeholder="Contraseña (mín. 8 caracteres)" className="input" autoComplete="new-password" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Creando…" : "Solicitar acceso"}
        </button>
      </form>
      <p className="mt-5 text-sm text-ash">
        ¿Ya tienes cuenta? <Link href="/login" className="font-semibold text-accent">Entrar</Link>
      </p>
    </AuthShell>
  );
}
