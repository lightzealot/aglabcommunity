import Link from "next/link";
import { requireAdmin } from "@/lib/session";
import { EventForm } from "../form";

export const metadata = { title: "Nuevo evento" };

export default async function NuevoEventoPage() {
  await requireAdmin();
  return (
    <>
      <Link href="/admin/eventos" className="text-sm text-ash hover:text-ink">← Eventos</Link>
      <h1 className="display mt-3 mb-6 text-5xl">
        Nuevo evento<span className="text-accent">.</span>
      </h1>
      <EventForm />
      <p className="mt-3 text-sm text-ash">Al crearlo, todos los miembros reciben una notificación.</p>
    </>
  );
}
