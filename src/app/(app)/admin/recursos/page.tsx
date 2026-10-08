import { asc, sql } from "drizzle-orm";
import Link from "next/link";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/session";
import { createResource } from "./actions";

export const metadata = { title: "Recursos" };

export default async function AdminRecursosPage() {
  await requireAdmin();
  const rows = await db
    .select({
      id: schema.resource.id,
      slug: schema.resource.slug,
      title: schema.resource.title,
      published: schema.resource.published,
      files: sql<number>`(select count(*)::int from resource_file f where f.resource_id = "resource"."id")`,
      leads: sql<number>`(select count(*)::int from "user" u where u.signup_source = "resource"."slug")`,
    })
    .from(schema.resource)
    .orderBy(asc(schema.resource.position), asc(schema.resource.createdAt));
  const totalLeads = rows.reduce((n, r) => n + r.leads, 0);

  return (
    <>
      <p className="label mb-2">Admin</p>
      <h1 className="display text-5xl">
        Recursos<span className="text-accent">.</span>
      </h1>
      <p className="mt-2 text-sm text-ash">
        Páginas públicas que se ven sin cuenta; los archivos se descargan al crear una cuenta. “Leads” = personas que se
        registraron después de ver ese recurso ({totalLeads} en total).
      </p>

      <form action={createResource} className="card mt-6 flex gap-2 p-4">
        <input name="title" required minLength={2} placeholder="Título del nuevo recurso" className="input flex-1" />
        <button className="btn btn-primary">Crear recurso</button>
      </form>

      <div className="card mt-4 divide-y divide-hairline">
        {rows.map((r) => (
          <Link key={r.id} href={`/admin/recursos/${r.id}`} className="flex flex-wrap items-center gap-3 p-4 hover:bg-veil">
            <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold">{r.title}</span>
              <span className="block truncate text-xs text-hollow">/recursos/{r.slug}</span>
            </span>
            <span className="text-xs text-ash">{r.files} archivos</span>
            <span className="text-xs font-semibold text-accent">{r.leads} leads</span>
            <span className={`label ${r.published ? "" : "!text-hollow"}`}>{r.published ? "Publicado" : "Borrador"}</span>
          </Link>
        ))}
        {rows.length === 0 && <p className="p-6 text-center text-sm text-ash">Aún no has creado recursos.</p>}
      </div>
    </>
  );
}
