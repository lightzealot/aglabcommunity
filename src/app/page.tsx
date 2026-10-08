import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { FeedPage } from "@/components/feed-page";
import { Landing } from "@/components/landing";
import { PublicShell } from "@/components/public-shell";
import { getLandingData } from "@/lib/landing";
import { getViewer } from "@/lib/resources";

export const metadata: Metadata = {
  title: { absolute: "AG Lab · Comunidad de IA aplicada a tu negocio" },
  description:
    "Comunidad gratis en español de Andrés Gómez: automatización, agentes de IA y procesos para empresas de servicios, con guías, plantillas y cursos.",
};

// "/" muestra el feed a los miembros y la página de inicio a todos los demás.
export default async function Home({ searchParams }: { searchParams: Promise<{ b?: string }> }) {
  const viewer = await getViewer();

  if (viewer.kind === "member") {
    const { b } = await searchParams;
    return (
      <AppShell user={viewer.user}>
        <FeedPage user={viewer.user} b={b} />
      </AppShell>
    );
  }

  const data = await getLandingData();
  return (
    <PublicShell viewer={viewer}>
      <Landing data={data} viewer={viewer} />
    </PublicShell>
  );
}
