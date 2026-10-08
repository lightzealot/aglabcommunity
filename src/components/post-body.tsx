"use client";

import { useState } from "react";

/** Texto del post recortado a 4 líneas, con "Ver más" / "Ver menos" si es largo. */
export function PostBody({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  // Heurística: más de ~280 caracteres o más de 4 saltos de línea suelen pasar de 4 líneas.
  const long = text.length > 280 || text.split("\n").length > 4;

  return (
    <div>
      <p className={`text-[0.9375rem] break-words whitespace-pre-line text-ash ${open ? "" : "line-clamp-4"}`}>{text}</p>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-1 text-sm font-semibold text-accent hover:underline"
          aria-expanded={open}
        >
          {open ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  );
}
