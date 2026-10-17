"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";

const KEY = "aglab-theme";
const EVENT = "aglab-theme-change";
const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
};
const isDark = () => document.documentElement.dataset.theme === "dark";

/** Interruptor de modo oscuro (opcional): guarda la preferencia en este navegador. */
export function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  function toggle() {
    const next = !dark;
    if (next) document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
    window.dispatchEvent(new Event(EVENT));
    try {
      if (next) localStorage.setItem(KEY, "dark");
      else localStorage.removeItem(KEY);
    } catch {}
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Modo oscuro"
      title={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      onClick={toggle}
      className={className}
    >
      {dark ? <SunIcon size={22} /> : <MoonIcon size={22} />}
    </button>
  );
}
