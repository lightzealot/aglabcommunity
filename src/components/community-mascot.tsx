"use client";

import { useEffect } from "react";

type MascotElement = HTMLElement & { config?: Record<string, string> };

/** Bienvenida con la mascota (Web Component de /public/mascota). Solo cliente, una instancia, sin servicios externos. */
export function CommunityMascot({ startUrl, resourcesUrl }: { startUrl?: string; resourcesUrl?: string }) {
  useEffect(() => {
    let cancelled = false;
    let el: MascotElement | null = null;
    (async () => {
      try {
        const src = "/mascota/mascot-welcome.js"; // archivo estático de /public, no se empaqueta
        await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ src);
      } catch {
        return; // sin la mascota la página funciona igual
      }
      if (cancelled || document.querySelector("community-mascot")) return;
      el = document.createElement("community-mascot") as MascotElement;
      el.config = {
        assetBase: "/mascota/assets/",
        storageKey: "aglab-community-welcome-v1",
        title: "¡Bienvenido a la comunidad!",
        message: "Aquí aprendemos a usar la IA y a convertir ideas en proyectos. ¿Por dónde quieres empezar?",
        ...(startUrl ? { startUrl } : {}),
        ...(resourcesUrl ? { resourcesUrl } : {}),
      };
      document.body.append(el);
    })();
    return () => {
      cancelled = true;
      el?.remove();
    };
  }, [startUrl, resourcesUrl]);
  return null;
}
