import { and, desc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/session";
import { setUserStatus } from "./actions";

export const metadata = { title: "Usuarios" };

const STATUS_LABEL = { pending: "Pendiente", approved: "Aprobado", banned: "Bloqueado" } as const;

export default async function UsuariosPage() {
  const admin = await requireAdmin();
  const rows = await db
    .select({ u: schema.user, intro: schema.post.body })
    .from(schema.user)
    .leftJoin(
      schema.post,
      and(eq(schema.post.authorId, schema.user.id), eq(schema.post.kind, "intro")),
    )
    .orderBy(desc(schema.user.createdAt));
  const users = rows.map((r) => ({ ...r.u, intro: r.intro }));
  const pending = users.filter((u) => u.status === "pending").length;

  return (
    <>
      <p className="label mb-2">Admin</p>
      <h1 className="display text-5xl">
        Usuarios<span className="text-accent">.</span>
      </h1>
      <p className="mt-2 text-sm text-ash">
        {users.length} en total · {pending} pendiente{pending === 1 ? "" : "s"} de aprobación
      </p>

      <div className="card mt-6 divide-y divide-hairline">
        {users.map((u) => (
          <div key={u.id} className="flex flex-wrap items-center gap-3 p-4">
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">
                {u.name} {u.role === "admin" && <span className="label ml-1">Admin</span>}
              </p>
              <p className="truncate text-sm text-ash">{u.email}</p>
              {u.onboarded && u.role !== "admin" && (
                <p className="mt-1 text-xs text-ash">
                  {[u.level, u.businessType, u.teamSize && `Equipo: ${u.teamSize}`, u.phone]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
              {u.intro && (
                <p className="mt-2 rounded bg-veil p-3 text-sm whitespace-pre-line">{u.intro}</p>
              )}
              {!u.onboarded && u.role !== "admin" && (
                <p className="mt-1 text-xs text-hollow">Aún no completa el onboarding</p>
              )}
            </div>
            <span className="label !text-ash">{STATUS_LABEL[u.status]}</span>
            {u.id !== admin.user.id && (
              <form action={setUserStatus} className="flex gap-2">
                <input type="hidden" name="id" value={u.id} />
                {u.status !== "approved" && (
                  <button name="status" value="approved" className="btn btn-primary !py-1.5">
                    Aprobar
                  </button>
                )}
                {u.status !== "banned" && (
                  <button name="status" value="banned" className="btn btn-ghost !py-1.5">
                    Bloquear
                  </button>
                )}
              </form>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
