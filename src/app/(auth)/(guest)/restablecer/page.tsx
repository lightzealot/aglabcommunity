"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { AuthShell } from "@/components/auth-shell";
import { authClient } from "@/lib/auth-client";

function Form() {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) return setError("El enlace no es válido o expiró.");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const { error } = await authClient.resetPassword({
      newPassword: String(form.get("password")),
      token,
    });
    setLoading(false);
    if (error) return setError("El enlace no es válido o expiró.");
    router.replace("/login");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input name="password" type="password" required minLength={8} placeholder="Nueva contraseña" className="input" autoComplete="new-password" />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="btn btn-primary w-full" disabled={loading}>
        {loading ? "Guardando…" : "Guardar contraseña"}
      </button>
    </form>
  );
}

export default function RestablecerPage() {
  return (
    <AuthShell title="Nueva clave">
      <Suspense>
        <Form />
      </Suspense>
    </AuthShell>
  );
}
