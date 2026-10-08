import { asc, eq, sql } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db, schema } from "@/db";
import { UUID_RE } from "@/lib/courses";
import { requireAdmin } from "@/lib/session";
import { deleteResource, deleteResourceFile } from "../actions";
import { ResourceFileUploader, ResourceForm } from "../forms";

export default async function AdminRecursoPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!UUID_RE.test(id)) notFound();

  const [r] = await db.select().from(schema.resource).where(eq(schema.resource.id, id));
  if (!r) notFound();
  const files = await db
    .select()
    .from(schema.resourceFile)
    .where(eq(schema.resourceFile.resourceId, id))
    .orderBy(asc(schema.resourceFile.createdAt));
  const [{ leads }] = await db
    .select({ leads: sql<number>`count(*)::int` })
    .from(schema.user)
    .where(eq(schema.user.signupSource, r.slug));

  return (
    <>
      <Link href="/admin/recursos" className="text-sm text-ash hover:text-ink">← Recursos</Link>
      <h1 className="display mt-3 text-5xl">
        {r.title}
        <span className="text-accent">.</span>
      </h1>
      <p className="mt-1 text-sm">
        <Link href={`/recursos/${r.slug}`} className="text-accent underline">Ver página pública</Link>
        <span className="ml-3 text-ash">
          {leads} lead{leads === 1 ? "" : "s"} registrado{leads === 1 ? "" : "s"} desde aquí
        </span>
      </p>

      <div className="mt-6">
        <ResourceForm resource={r} />
      </div>

      <h2 className="display mt-10 mb-3 text-3xl">Archivos<span className="text-accent">.</span></h2>
      <div className="card p-4">
        <ul className="mb-4 divide-y divide-hairline">
          {files.map((f) => (
            <li key={f.id} className="flex items-center gap-3 py-2 text-sm">
              <a href={`/api/resource-files/${f.id}`} className="flex-1 truncate text-accent underline">{f.name}</a>
              <span className="text-xs text-hollow">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
              <form action={deleteResourceFile}>
                <input type="hidden" name="id" value={f.id} />
                <button className="btn btn-ghost !py-1">Quitar</button>
              </form>
            </li>
          ))}
          {files.length === 0 && <li className="py-2 text-sm text-ash">Aún no hay archivos.</li>}
        </ul>
        <ResourceFileUploader resourceId={r.id} />
        <p className="mt-2 text-xs text-hollow">
          Solo se descargan con cuenta. PDF, ZIP, JSON (flujos de n8n), Office, CSV, TXT, MD o imágenes. Máx. 25 MB.
        </p>
      </div>

      <form action={deleteResource} className="mt-10">
        <input type="hidden" name="id" value={r.id} />
        <button className="btn btn-ghost !border-red-300 !text-red-600">Eliminar recurso</button>
      </form>
    </>
  );
}
