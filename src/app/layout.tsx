import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import { SITE_DESCRIPTION, SITE_NAME, siteUrl } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});
const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    authors: [{ name: "Andrés Gómez" }],
    creator: "Andrés Gómez",
    keywords: ["inteligencia artificial", "automatización", "agentes de IA", "IA para negocios", "n8n", "comunidad", "noticias de IA"],
    // "./" = la URL de cada página sin parámetros: evita contenido duplicado por ?welcome=1, ?b=... etc.
    alternates: { canonical: "./", types: { "application/rss+xml": "/feed.xml" } },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "es_ES",
      images: [{ url: "/logo.png", alt: SITE_NAME }],
    },
    twitter: { card: "summary_large_image" },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${dmSans.variable} ${plexMono.variable} ${barlow.variable} h-full antialiased`}
    >
      <head>
        {/* Aplica el tema guardado antes de pintar, para evitar el parpadeo. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("aglab-theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
