"use client";

import { useEffect } from "react";
import { archiveSeen } from "@/app/(app)/notificaciones/actions";

/** Cuando las notificaciones nuevas llevan unos segundos a la vista, quedan archivadas. */
export function AutoArchive({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      archiveSeen();
    }, 4000);
    return () => clearTimeout(t);
  }, [active]);
  return null;
}
