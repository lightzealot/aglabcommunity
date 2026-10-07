import { asc } from "drizzle-orm";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/session";
import { deleteBoard } from "./actions";
import { BoardForm } from "./form";

export const metadata = { title: "Boards" };

export default async function BoardsPage() {
  await requireAdmin();
  const boards = await db.select().from(schema.board).orderBy(asc(schema.board.position));

  return (
    <>
      <p className="label mb-2">Admin</p>
      <h1 className="display text-5xl">
        Boards<span className="text-accent">.</span>
      </h1>
      <p className="mt-2 text-sm text-ash">
        Los boards son los temas del foro y los intereses que eligen los miembros al registrarse.
      </p>

      <div className="card mt-6 divide-y divide-hairline">
        {boards.map((b) => (
          <div key={b.id} className="flex flex-wrap items-center gap-3 p-4">
            <div className="min-w-0 flex-1">
              <BoardForm board={b} />
            </div>
            {b.id !== "general" && (
              <form action={deleteBoard}>
                <input type="hidden" name="id" value={b.id} />
                <button className="btn btn-ghost !py-1.5" title="Solo se puede borrar si no tiene publicaciones">
                  Borrar
                </button>
              </form>
            )}
          </div>
        ))}
      </div>

      <h2 className="display mt-8 mb-3 text-3xl">
        Nuevo board<span className="text-accent">.</span>
      </h2>
      <div className="card p-4">
        <BoardForm />
      </div>
    </>
  );
}
