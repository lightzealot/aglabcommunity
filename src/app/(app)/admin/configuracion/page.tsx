import { eq, sql } from "drizzle-orm";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/session";
import { getRequireApproval } from "@/lib/settings";
import { approveAllPending, saveApprovalSetting } from "./actions";

export const metadata = { title: "Configuración" };

export default async function ConfiguracionPage() {
  await requireAdmin();
  const requireApproval = await getRequireApproval();
  const [{ pending }] = await db
    .select({ pending: sql<number>`count(*)::int` })
    .from(schema.user)
    .where(eq(schema.user.status, "pending"));

  return (
    <>
      <p className="label mb-2">Admin</p>
      <h1 className="display text-5xl">
        Configuración<span className="text-accent">.</span>
      </h1>

      <section className="card mt-6 p-5">
        <div className="flex flex-wrap items-start gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold">Aprobar solicitudes manualmente</h2>
            <p className="mt-1 text-sm text-ash">
              {requireApproval
                ? "Activado: cada persona nueva queda “En revisión” hasta que la apruebes en Usuarios."
                : "Desactivado: cualquiera que se registre (con correo o Google) entra directo a la comunidad."}
            </p>
          </div>
          <span className={`label ${requireApproval ? "" : "!text-hollow"}`}>
            {requireApproval ? "Activado" : "Desactivado"}
          </span>
        </div>

        <form action={saveApprovalSetting} className="mt-4">
          <input type="hidden" name="require" value={String(!requireApproval)} />
          <button className={`btn ${requireApproval ? "btn-ghost" : "btn-primary"}`}>
            {requireApproval ? "Desactivar aprobación (dejar entrar a todos)" : "Activar aprobación manual"}
          </button>
        </form>

        {!requireApproval && (
          <p className="mt-4 rounded bg-veil p-3 text-sm text-ash">
            Ten en cuenta: sin aprobación, cualquiera puede registrarse y publicar. El correo no se verifica y la
            presentación se publica al instante. Puedes bloquear a alguien después desde Usuarios.
          </p>
        )}
      </section>

      {pending > 0 && (
        <section className="card mt-4 p-5">
          <h2 className="text-lg font-semibold">
            {pending} solicitud{pending === 1 ? "" : "es"} pendiente{pending === 1 ? "" : "s"}
          </h2>
          <p className="mt-1 text-sm text-ash">
            Se registraron cuando la aprobación estaba activa. Puedes aprobarlas todas de una vez: se publican sus
            presentaciones y reciben un aviso por correo.
          </p>
          <form action={approveAllPending} className="mt-4">
            <button className="btn btn-primary">
              {pending === 1 ? "Aprobar la solicitud pendiente" : `Aprobar a las ${pending} pendientes`}
            </button>
          </form>
        </section>
      )}
    </>
  );
}
