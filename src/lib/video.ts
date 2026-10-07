/**
 * Convierte un enlace de YouTube, Vimeo o Loom en una URL de embed segura.
 * Solo se aceptan estos proveedores; el src se reconstruye desde el ID,
 * nunca se usa la URL pegada tal cual.
 */
export function toEmbedUrl(input: string | null | undefined): string | null {
  if (!input) return null;
  let u: URL;
  try {
    u = new URL(input.trim());
  } catch {
    return null;
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return null;
  const host = u.hostname.replace(/^www\./, "").replace(/^m\./, "");

  if (host === "youtu.be") {
    const id = u.pathname.slice(1).split("/")[0];
    return /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  }
  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const parts = u.pathname.split("/").filter(Boolean);
    const id = u.searchParams.get("v") ?? (["embed", "shorts", "live"].includes(parts[0]) ? parts[1] : null);
    return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  }
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const m = /\/(?:video\/)?(\d+)(?:\/([a-f0-9]+))?/.exec(u.pathname);
    if (!m) return null;
    const hash = m[2] ?? u.searchParams.get("h");
    return `https://player.vimeo.com/video/${m[1]}${hash ? `?h=${hash}` : ""}`;
  }
  if (host === "loom.com") {
    const m = /\/(?:share|embed)\/([a-f0-9]{32})/.exec(u.pathname);
    return m ? `https://www.loom.com/embed/${m[1]}` : null;
  }
  return null;
}
