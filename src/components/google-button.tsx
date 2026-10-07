"use client";

import { authClient } from "@/lib/auth-client";

export function GoogleButton() {
  return (
    <>
      <button
        type="button"
        className="btn btn-ghost w-full"
        onClick={() =>
          authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
            errorCallbackURL: "/login?error=google",
          })
        }
      >
        Continuar con Google
      </button>
      <div className="my-4 flex items-center gap-3 text-xs text-hollow">
        <span className="h-px flex-1 bg-hairline" />
        o con tu correo
        <span className="h-px flex-1 bg-hairline" />
      </div>
    </>
  );
}
