/** Constantes y utilidades puras de recursos (seguras para el navegador). */

/** Cookie con el recurso desde el que llegó el visitante (atribución de leads). */
export const SOURCE_COOKIE = "ag_from";
export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);

/** Nivel de conocimiento de un recurso. */
export const LEVELS = ["principiante", "intermedio", "avanzado"] as const;
export type Level = (typeof LEVELS)[number];
export const levelOf = (v: unknown): Level => (LEVELS as readonly string[]).includes(v as string) ? (v as Level) : "principiante";
