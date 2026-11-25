"use client";

import { useEffect } from "react";
import { INVITE_COOKIE } from "@/lib/invite-const";

/** Recuerda a qué evento y de parte de quién llegó el invitado, para confirmarle la asistencia al registrarse. */
export function InviteCookie({ eventId, refId }: { eventId: string; refId?: string }) {
  useEffect(() => {
    document.cookie = `${INVITE_COOKIE}=${encodeURIComponent(`${eventId}.${refId ?? ""}`)}; path=/; max-age=${30 * 86400}; samesite=lax`;
  }, [eventId, refId]);
  return null;
}
