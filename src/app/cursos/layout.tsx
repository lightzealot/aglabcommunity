import { AppShell } from "@/components/app-shell";
import { PublicShell } from "@/components/public-shell";
import { getViewer } from "@/lib/resources";

// La vista previa de los cursos es pública: visitantes ven el marco público; miembros, la comunidad completa.
export default async function CursosLayout({ children }: { children: React.ReactNode }) {
  const viewer = await getViewer();
  if (viewer.kind === "member") return <AppShell user={viewer.user}>{children}</AppShell>;
  return <PublicShell viewer={viewer}>{children}</PublicShell>;
}
