"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * Envuelve la tarjeta de miembro y le da volumen: se inclina siguiendo el dedo o el cursor,
 * con un brillo que se mueve sobre la superficie. En reposo se mece sola.
 */
export function CardTilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  function move(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    el.style.setProperty("--ry", `${(x - 0.5) * 28}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 22}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
    if (!active) setActive(true);
  }

  return (
    <div className="card-scene mx-auto w-full max-w-[300px]" style={{ touchAction: "pan-y" }}>
      <div
        ref={ref}
        onPointerMove={move}
        onPointerLeave={() => setActive(false)}
        onPointerCancel={() => setActive(false)}
        className={`card-3d relative ${active ? "is-active" : ""}`}
      >
        {children}
        <div className="card-glare pointer-events-none absolute inset-0 rounded-[26px]" aria-hidden />
      </div>
      <div className="card-floor mx-auto mt-4 h-4 w-3/4 rounded-[50%]" aria-hidden />
    </div>
  );
}
