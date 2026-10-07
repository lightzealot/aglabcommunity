"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "@/components/auth-shell";
import { GoogleButton } from "@/components/google-button";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const { error } = await authClient.signIn.email({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setLoading(false);
    if (error) return setError("Correo o contraseña incorrectos.");
    router.replace("/");
    router.refresh();
  }

  return (
    <AuthShell title="Entrar" subtitle="Accede a tu espacio en AG Lab.">
      <GoogleButton />
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="email" type="email" required placeholder="Correo" className="input" autoComplete="email" />
        <input name="password" type="password" required placeholder="Contraseña" className="input" autoComplete="current-password" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
      <div className="mt-5 flex justify-between text-sm">
        <Link href="/recuperar" className="text-ash hover:text-ink">¿Olvidaste tu contraseña?</Link>
        <Link href="/registro" className="font-semibold text-accent">Crear cuenta</Link>
      </div>
    </AuthShell>
  );
}
