import { Drawer, Elevator, Hub, Loupe, Padlock, Settle, Sieve, Vault } from "@lucasmarkes/hairline/react";

const FIGURES = { drawer: Drawer, elevator: Elevator, hub: Hub, loupe: Loupe, padlock: Padlock, settle: Settle, sieve: Sieve, vault: Vault };
export type FigureName = keyof typeof FIGURES;

/** Ilustración de línea fina (Hairline). Sigue el tema claro/oscuro de la web; `width` en px. */
export function Figure({ name, width = 200, label, play = false }: { name: FigureName; width?: number; label?: string; play?: boolean }) {
  const F = FIGURES[name];
  return (
    <div className="hairline-fig mx-auto" style={{ width, maxWidth: "100%" }}>
      <F label={label} play={play} />
    </div>
  );
}

/** Estado vacío: figura + mensaje, para dentro de una tarjeta. */
export function EmptyState({ figure, children }: { figure: FigureName; children: React.ReactNode }) {
  return (
    <div className="card flex flex-col items-center gap-2 p-6 text-center text-sm text-ash">
      <Figure name={figure} width={170} />
      <p>{children}</p>
    </div>
  );
}
