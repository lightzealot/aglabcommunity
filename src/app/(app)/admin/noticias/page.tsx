import Link from "next/link";
import { listNews } from "@/lib/news";
import { requireAdmin } from "@/lib/session";
import { PublishForm } from "./form";

export const dynamic = "force-dynamic";

export default async function AdminNoticias() {
  await requireAdmin();
  const items = await listNews(8);
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="display text-4xl">Noticias<span className="text-accent">.</span></h1>
      <p className="mt-2 text-sm text-ash">
        La noticia del día se publica sola. Si hoy no salió, publícala aquí: usa una sola ejecución de Apify y te dice qué falló.
      </p>
      <p className="mt-2 text-sm">
        APIFY_TOKEN: {process.env.APIFY_TOKEN ? <b className="text-green-700">configurado</b> : <b className="text-red-600">falta</b>}
      </p>
      <PublishForm />
      <ul className="card mt-6 divide-y divide-hairline text-sm">
        {items.map((n) => (
          <li key={n.id} className="flex gap-3 p-3">
            <span className="shrink-0 font-mono text-xs text-hollow">{n.day}</span>
            <Link href={`/noticias/${n.day}`} className="min-w-0 flex-1 truncate hover:text-accent">{n.title}</Link>
            <span className="shrink-0 text-xs text-hollow">{n.imageUrl ? "con foto" : "sin foto"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
