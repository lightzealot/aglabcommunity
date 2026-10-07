import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

// Páginas solo para visitantes: si la sesión es válida, van al inicio.
export default async function GuestLayout({ children }: { children: React.ReactNode }) {
  if (await getSession()) redirect("/");
  return children;
}
