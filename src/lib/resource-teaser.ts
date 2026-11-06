/** Primeros párrafos de una guía (lo que ve un visitante antes de registrarse). */
export function teaser(body: string, max = 380) {
  const blocks = body.trim().split(/\n{2,}/);
  let out = "";
  let fences = 0;
  for (const b of blocks) {
    fences += (b.match(/```/g) ?? []).length;
    if (fences % 2 === 1) break; // no cortar dentro de un bloque de código
    out += (out ? "\n\n" : "") + b;
    if (out.length >= max) break;
  }
  return out;
}
