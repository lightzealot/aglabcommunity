import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { Logo } from "@/components/logo";
import { getCommunity } from "@/lib/community";
import { requireMember } from "@/lib/session";

export const metadata = { title: "Acerca de" };

export default async function AcercaPage() {
  const { user } = await requireMember();
  const c = await getCommunity();

  return (
    <div className="mx-auto max-w-3xl">
      <section className="card overflow-hidden">
        {c.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.coverUrl} alt="" className="aspect-[16/7] w-full object-cover" />
        ) : (
          <div className="flex aspect-[16/7] items-center justify-center bg-accent-soft">
            <Logo size={84} withName={false} />
          </div>
        )}
        <div className="p-6">
          <h1 className="display text-5xl">
            {c.name}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-4 text-[0.9375rem] leading-relaxed break-words whitespace-pre-line text-ash">{c.description}</p>

          <dl className="mt-6 grid grid-cols-3 divide-x divide-hairline rounded border border-hairline py-3 text-center">
            <div>
              <dd className="text-2xl font-semibold">{c.members}</dd>
              <dt className="text-xs text-hollow">Miembros</dt>
            </div>
            <div>
              <dd className="text-2xl font-semibold">{c.online}</dd>
              <dt className="text-xs text-hollow">En línea</dt>
            </div>
            <div>
              <dd className="text-2xl font-semibold">{c.admins}</dd>
              <dt className="text-xs text-hollow">Administradores</dt>
            </div>
          </dl>

          <h2 className="label mt-8 mb-3">Equipo</h2>
          <ul className="space-y-3">
            {c.adminList.map((a) => (
              <li key={a.id} className="flex items-center gap-3">
                <Avatar name={a.name} image={a.image} points={a.points} size={40} />
                <Link href={`/u/${a.id}`} className="font-semibold hover:text-accent">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>

          {user.role === "admin" && (
            <Link href="/admin/configuracion" className="btn btn-ghost mt-8">
              Editar descripción y portada
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
