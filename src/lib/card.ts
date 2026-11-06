export const SOCIALS = [
  { id: "instagram", label: "Instagram", base: "https://instagram.com/" },
  { id: "tiktok", label: "TikTok", base: "https://tiktok.com/@" },
  { id: "x", label: "X", base: "https://x.com/" },
  { id: "linkedin", label: "LinkedIn", base: "https://linkedin.com/in/" },
  { id: "youtube", label: "YouTube", base: "https://youtube.com/@" },
  { id: "github", label: "GitHub", base: "https://github.com/" },
] as const;

export const HANDLE_RE = /^[a-z0-9_.]{3,20}$/;

/** Acepta "@usuario", "usuario" o un enlace y devuelve solo el usuario. */
export function cleanSocial(raw: string) {
  const last = raw.trim().split(/[?#]/)[0].replace(/\/+$/, "").split("/").pop() ?? "";
  return last.replace(/^@/, "").replace(/[^A-Za-z0-9_.-]/g, "").slice(0, 40);
}

export function socialUrl(id: string, user: string) {
  const s = SOCIALS.find((x) => x.id === id);
  return s ? s.base + user : null;
}

export function cardPath(u: { id: string; handle: string | null }) {
  return `/m/${u.handle ?? u.id}`;
}
