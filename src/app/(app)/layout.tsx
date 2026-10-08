import { AppShell } from "@/components/app-shell";
import { requireMember } from "@/lib/session";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireMember();
  return <AppShell user={user}>{children}</AppShell>;
}
