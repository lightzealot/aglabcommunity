"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignOutButton({ className = "btn btn-ghost" }: { className?: string }) {
  const router = useRouter();
  return (
    <button
      className={className}
      onClick={async () => {
        await authClient.signOut();
        router.replace("/login");
        router.refresh();
      }}
    >
      Cerrar sesión
    </button>
  );
}
