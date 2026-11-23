import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * Versiones en inglés y portugués de los recursos. Viven junto a cada guía en `seed/recursos/<slug>/en.md` y `pt.md`
 * (cabecera con title y summary + cuerpo) y se lee en tiempo de ejecución, así no hace falta migrar la base.
 * Si un recurso no tiene un idioma, ese idioma no aparece en el selector y la página cae a español.
 */

export type Lang = "es" | "en" | "pt";
export type ResourceTr = { title: string; summary: string; body: string };
export type ResourceEn = ResourceTr;

export const LANGS: Lang[] = ["es", "en", "pt"];
export const langOf = (v: string | string[] | undefined): Lang => (v === "en" ? "en" : v === "pt" ? "pt" : "es");

/** Sufijo de la URL para un idioma ("" para español, que es el original). */
export const langQuery = (l: Lang) => (l === "es" ? "" : `?lang=${l}`);

const root = path.resolve(process.cwd(), "seed/recursos");
const cache = new Map<string, ResourceTr | null>();

/** Traducción de un recurso (`en.md` / `pt.md`), o null si no existe. */
export function getResourceTr(slug: string, lang: Lang): ResourceTr | null {
  if (lang === "es") return null;
  const key = `${lang}:${slug}`;
  if (process.env.NODE_ENV === "production" && cache.has(key)) return cache.get(key)!;
  let out: ResourceTr | null = null;
  const file = path.join(root, slug, `${lang}.md`);
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
  cache.set(key, out);
  return out;
}

export const getResourceEn = (slug: string) => getResourceTr(slug, "en");

/** Idiomas en los que existe el recurso (siempre incluye español). */
export function availableLangs(slug: string): Lang[] {
  return LANGS.filter((l) => l === "es" || getResourceTr(slug, l));
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
  pt: {
    back: "‹ Todos os recursos",
    draft: "Rascunho (só você vê)",
    kicker: "Guia · prompts prontos para copiar",
    readMin: "min de leitura",
    prompt: (n: number) => (n === 1 ? "prompt" : "prompts"),
    file: (n: number) => (n === 1 ? "arquivo" : "arquivos"),
    free: "Grátis",
    toc: "Neste guia",
    welcomeTitle: "Pronto, sua conta foi criada!",
    welcomeBody: "Agora você já pode baixar os arquivos abaixo.",
    welcomeCard: "Crie seu cartão de membro",
    optional: "Download opcional",
    freeCommunity: "Comunidade grátis",
    takeIt: "Quer levar com você?",
    join: "Entre para a comunidade",
    takeItBody:
      "Você já leu o guia completo, sem conta. Se quiser os arquivos no seu computador, crie sua conta grátis: leva menos de um minuto.",
    joinBody: "Crie sua conta grátis: leva menos de um minuto e não pede cartão.",
    withAccount: "Com sua conta grátis você também tem",
    perks: [
      ["Downloads em todos os recursos", "Os arquivos de cada guia, os de hoje e os que forem saindo, sem precisar pedir de novo."],
      ["Cursos grátis", "Aprenda passo a passo com aulas em vídeo e acompanhe seu progresso."],
      ["Comunidade em espanhol", "Pergunte, compartilhe o que você faz e receba respostas de quem usa IA como você."],
      ["Eventos ao vivo", "Avisamos antes de cada um para você não perder."],
      ["Cartão de membro, pontos e ranking", "Ganhe pontos por participar e aprender, e suba no ranking."],
    ],
    byEmail: "Prefiro me cadastrar com meu e-mail",
    create: "Criar minha conta grátis",
    haveAccount: "Já tem conta?",
    login: "Entrar",
    downloads: "Arquivos para baixar",
    myCard: "Meu cartão",
    bio: "IA prática para criar conteúdo, fotos e marca.",
    next: "Continue com",
    copy: "Copiar prompt",
    copied: "Copiado ✓",
    copyFallback: "Copie o texto:",
    filesForDownload: (n: number) => `${n} arquivo${n === 1 ? "" : "s"} para baixar`,
    guide: "Guia",
    dateLocale: "pt-BR",
  },
} as const;
