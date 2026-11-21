import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * Versión en inglés de los recursos. Vive junto a cada guía en `seed/recursos/<slug>/en.md`
 * (cabecera con title y summary + cuerpo) y se lee en tiempo de ejecución, así no hace falta migrar la base.
 * Si un recurso no tiene inglés, la página se muestra en español y el switch no aparece.
 */

export type Lang = "es" | "en";
export type ResourceEn = { title: string; summary: string; body: string };

export const langOf = (v: string | string[] | undefined): Lang => (v === "en" ? "en" : "es");

const root = path.resolve(process.cwd(), "seed/recursos");
const cache = new Map<string, ResourceEn | null>();

export function getResourceEn(slug: string): ResourceEn | null {
  if (process.env.NODE_ENV === "production" && cache.has(slug)) return cache.get(slug)!;
  let out: ResourceEn | null = null;
  const file = path.join(root, slug, "en.md");
  if (/^[a-z0-9-]+$/.test(slug) && existsSync(file)) {
    // Formato: cabecera entre --- con `title:` y `summary:`, luego el cuerpo en el mismo markdown que body.md.
    const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(readFileSync(file, "utf8"));
    if (m) {
      const meta = Object.fromEntries(
        m[1].split(/\r?\n/).map((l) => [l.slice(0, l.indexOf(":")).trim(), l.slice(l.indexOf(":") + 1).trim().replace(/^"(.*)"$/, "$1")]),
      );
      if (meta.title && m[2].trim()) out = { title: meta.title, summary: meta.summary ?? "", body: m[2].trim() };
    }
  }
  cache.set(slug, out);
  return out;
}

/** Textos de la interfaz de un recurso en cada idioma. */
export const UI = {
  es: {
    back: "‹ Todos los recursos",
    draft: "Borrador (solo lo ves tú)",
    kicker: "Guía · prompts listos para copiar",
    readMin: "min de lectura",
    prompt: (n: number) => (n === 1 ? "prompt" : "prompts"),
    file: (n: number) => (n === 1 ? "archivo" : "archivos"),
    free: "Gratis",
    toc: "En esta guía",
    welcomeTitle: "¡Listo, tu cuenta está creada!",
    welcomeBody: "Ya puedes descargar los archivos de abajo.",
    welcomeCard: "Crea tu tarjeta de miembro",
    optional: "Descarga opcional",
    freeCommunity: "Comunidad gratis",
    takeIt: "¿Quieres llevártela?",
    join: "Únete a la comunidad",
    takeItBody:
      "Ya leíste la guía completa, sin cuenta. Si quieres los archivos para tenerlos en tu computador, crea tu cuenta gratis: toma menos de un minuto.",
    joinBody: "Crea tu cuenta gratis: toma menos de un minuto y no pide tarjeta.",
    withAccount: "Con tu cuenta gratis también tienes",
    perks: [
      ["Descargas en todos los recursos", "Los archivos de cada guía, hoy y los que vayan saliendo, sin volver a pedirlos."],
      ["Cursos gratis", "Aprende paso a paso con lecciones en video y lleva tu progreso."],
      ["Comunidad en español", "Pregunta, comparte lo que haces y recibe respuestas de otros que usan IA como tú."],
      ["Eventos en vivo", "Te avisamos antes de cada uno para que no se te pasen."],
      ["Tarjeta de miembro, puntos y ranking", "Sumas puntos por participar y aprender, y subes en el ranking."],
    ],
    byEmail: "Prefiero registrarme con mi correo",
    create: "Crear mi cuenta gratis",
    haveAccount: "¿Ya tienes cuenta?",
    login: "Entrar",
    downloads: "Archivos para descargar",
    myCard: "Mi tarjeta",
    bio: "IA práctica para crear contenido, fotos y marca.",
    next: "Sigue con",
    copy: "Copiar prompt",
    copied: "¡Copiado ✓",
    copyFallback: "Copia el texto:",
    filesForDownload: (n: number) => `${n} archivo${n === 1 ? "" : "s"} para descargar`,
    guide: "Guía",
    dateLocale: "es",
  },
  en: {
    back: "‹ All resources",
    draft: "Draft (only you can see it)",
    kicker: "Guide · ready-to-copy prompts",
    readMin: "min read",
    prompt: (n: number) => (n === 1 ? "prompt" : "prompts"),
    file: (n: number) => (n === 1 ? "file" : "files"),
    free: "Free",
    toc: "In this guide",
    welcomeTitle: "Done, your account is ready!",
    welcomeBody: "You can now download the files below.",
    welcomeCard: "Create your member card",
    optional: "Optional download",
    freeCommunity: "Free community",
    takeIt: "Want to keep it?",
    join: "Join the community",
    takeItBody:
      "You already read the full guide, no account needed. If you want the files on your computer, create your free account: it takes less than a minute.",
    joinBody: "Create your free account: it takes less than a minute and no card is required.",
    withAccount: "Your free account also gives you",
    perks: [
      ["Downloads on every resource", "The files of every guide, today's and the ones still to come, without asking again."],
      ["Free courses", "Learn step by step with video lessons and track your progress."],
      ["Spanish-speaking community", "Ask, share what you build and get answers from others who use AI like you."],
      ["Live events", "We let you know before each one so you don't miss it."],
      ["Member card, points and ranking", "Earn points for joining in and learning, and climb the ranking."],
    ],
    byEmail: "I'd rather sign up with my email",
    create: "Create my free account",
    haveAccount: "Already have an account?",
    login: "Log in",
    downloads: "Files to download",
    myCard: "My card",
    bio: "Practical AI to create content, photos and brand.",
    next: "Keep going with",
    copy: "Copy prompt",
    copied: "Copied ✓",
    copyFallback: "Copy the text:",
    filesForDownload: (n: number) => `${n} file${n === 1 ? "" : "s"} to download`,
    guide: "Guide",
    dateLocale: "en",
  },
} as const;
