import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { Logo } from "@/components/logo";
import { getCommunity } from "@/lib/community";

type Community = Awaited<ReturnType<typeof getCommunity>>;

export function CommunityCard({ c, isAdmin }: { c: Community; isAdmin: boolean }) {
  return (
    <section className="card overflow-hidden">
      {c.coverUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={c.coverUrl} alt="" className="aspect-[16/9] w-full object-cover" />
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center bg-accent-soft">
          <Logo size={56} withName={false} />
        </div>
      )}
      <div className="p-4">
        <h2 className="display text-3xl">
          {c.name}
          <span className="text-accent">.</span>
        </h2>
        <p className="mt-2 line-clamp-4 text-sm text-ash">{c.description}</p>

        <dl className="mt-4 grid grid-cols-3 divide-x divide-hairline border-y border-hairline py-3 text-center">
          <div>
            <dt className="sr-only">Miembros</dt>
            <dd className="text-lg font-semibold">{c.members}</dd>
            <p className="text-xs text-hollow">Miembros</p>
          </div>
          <div>
            <dt className="sr-only">En línea</dt>
            <dd className="text-lg font-semibold">{c.online}</dd>
            <p className="text-xs text-hollow">En línea</p>
          </div>
          <div>
            <dt className="sr-only">Administradores</dt>
            <dd className="text-lg font-semibold">{c.admins}</dd>
            <p className="text-xs text-hollow">Admins</p>
          </div>
        </dl>

        <div className="mt-3 flex -space-x-2">
          {c.adminList.slice(0, 6).map((a) => (
            <Link key={a.id} href={`/u/${a.id}`} title={a.name} className="rounded-full ring-2 ring-white">
              <Avatar name={a.name} image={a.image} size={28} />
            </Link>
          ))}
        </div>

        {isAdmin && (
          <Link href="/admin/configuracion" className="btn btn-ghost mt-4 w-full !border-hairline !text-ash">
            Configuración
          </Link>
        )}
      </div>
    </section>
  );
}
