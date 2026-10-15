import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { requireMember } from "@/lib/session";

// La comunidad es solo para miembros: nada de esto va al índice.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireMember();
  return <AppShell user={user}>{children}</AppShell>;
}
