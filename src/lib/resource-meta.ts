/** Datos derivados del cuerpo (markdown) de un recurso: índice, prompt principal y tiempo de lectura. */

export function headingId(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function headings(body: string) {
  const out: { id: string; text: string }[] = [];
  let fence = false;
  for (const l of body.replace(/\r\n/g, "\n").split("\n")) {
    if (l.startsWith("```")) fence = !fence;
    const m = !fence && /^##\s+(.*)$/.exec(l);
    if (m) {
      const text = m[1].replace(/[*`]/g, "").trim();
      out.push({ id: headingId(text), text });
    }
  }
  return out;
}

export function promptCount(body: string) {
  return (body.match(/^```/gm)?.length ?? 0) >> 1;
}

export function readMinutes(body: string) {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
