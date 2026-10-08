"use client";

import { useEffect } from "react";
import { SOURCE_COOKIE } from "@/lib/resource-constants";

/** Guarda el recurso que vio el visitante (primer contacto, 30 días) para atribuir su registro. */
export function SourceCookie({ slug, overwrite = false }: { slug: string; overwrite?: boolean }) {
  useEffect(() => {
    const has = document.cookie.split("; ").some((c) => c.startsWith(`${SOURCE_COOKIE}=`));
    if (has && !overwrite) return;
    document.cookie = `${SOURCE_COOKIE}=${encodeURIComponent(slug)}; path=/; max-age=${30 * 86400}; samesite=lax`;
  }, [slug, overwrite]);
  return null;
}
