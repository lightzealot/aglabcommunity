import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Rastreadores de IA: los de búsqueda y asistente (traen visitas y citas) y los de entrenamiento.
// Todos permitidos para que ChatGPT, Claude, Perplexity, Gemini y compañía puedan leer y citar el contenido público.
// Para cerrar el entrenamiento sin perder las citas, quita de aquí GPTBot, Google-Extended, CCBot, Applebot-Extended y Bytespider.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot",
  "cohere-ai",
  "MistralAI-User",
  "DuckAssistBot",
  "meta-externalagent",
  "Bytespider",
];

// Zona de miembros: no tiene nada público que indexar (redirige al login).
const PRIVATE = [
  "/api/",
  "/admin/",
  "/classroom",
  "/post/",
  "/u/",
  "/miembros",
  "/ranking",
  "/calendario",
  "/perfil",
  "/notificaciones",
  "/buscar",
  "/acerca",
  "/onboarding",
  "/pendiente",
];

// Dinámico: la URL del sitemap sale de BETTER_AUTH_URL en runtime, no del momento del build.
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  // Las imágenes subidas (portadas) viven en /api/uploads/: deben poder rastrearse.
  const allow = ["/", "/api/uploads/"];
  return {
    rules: [
      { userAgent: "*", allow, disallow: PRIVATE },
      { userAgent: AI_BOTS, allow, disallow: PRIVATE },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
