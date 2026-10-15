export const SITE_NAME = "AG Lab";
export const SITE_DESCRIPTION =
  "Comunidad gratis en español de Andrés Gómez: automatización, agentes de IA y procesos para empresas de servicios, con guías, plantillas, cursos y una noticia de IA al día.";
export const FOUNDER = "Andrés Gómez";

/** URL pública del sitio, sin barra final. En producción sale de BETTER_AUTH_URL. */
export const siteUrl = () => (process.env.BETTER_AUTH_URL ?? "http://localhost:3100").replace(/\/+$/, "");

/** Ruta relativa → URL absoluta (las URLs ya absolutas se devuelven tal cual). */
export const abs = (path: string) => (/^https?:\/\//i.test(path) ? path : `${siteUrl()}${path.startsWith("/") ? "" : "/"}${path}`);

export const orgRef = () => ({ "@type": "Organization", "@id": `${siteUrl()}/#organization` });

/** Organización + sitio web: se repite en la portada para que buscadores y asistentes de IA sepan quién es quién. */
export const siteJsonLd = () => [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl()}/#organization`,
    name: SITE_NAME,
    url: `${siteUrl()}/`,
    logo: abs("/logo.png"),
    description: SITE_DESCRIPTION,
    founder: { "@type": "Person", name: FOUNDER },
    inLanguage: "es",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl()}/#website`,
    name: SITE_NAME,
    url: `${siteUrl()}/`,
    inLanguage: "es",
    publisher: orgRef(),
  },
];

export const xmlEscape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

/** Cabeceras para los archivos que se generan con la base de datos: frescos, pero sin golpearla en cada visita de un bot. */
export const FEED_CACHE = "public, max-age=0, s-maxage=1800, stale-while-revalidate=86400";
