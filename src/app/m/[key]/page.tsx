import Link from "next/link";
import { eq, or } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Logo } from "@/components/logo";
import { CardTilt } from "@/components/card-tilt";
import { MemberCard } from "@/components/member-card";
import { db, schema } from "@/db";
import { SOCIALS, socialUrl } from "@/lib/card";
import { memberNumber } from "@/lib/member-number";

type Ctx = { params: Promise<{ key: string }> };

async function find(key: string) {
  const k = decodeURIComponent(key).toLowerCase();
  const [u] = await db
    .select()
    .from(schema.user)
    .where(or(eq(schema.user.handle, k), eq(schema.user.id, key)))
    .limit(1);
  return u && u.onboarded ? u : null;
}

export async function generateMetadata({ params }: Ctx) {
  const u = await find((await params).key);
  return { title: u ? `${u.handle ? "@" + u.handle : u.name} · AG LAB` : "Tarjeta" };
}

export default async function PublicCard({ params }: Ctx) {
  const u = await find((await params).key);
  if (!u) notFound();
  const number = await memberNumber(u.createdAt);
  const links = SOCIALS.flatMap((s) => {
    const v = u.socials?.[s.id];
    const href = v ? socialUrl(s.id, v) : null;
    return v && href ? [{ id: s.id, label: s.label, v, href }] : [];
  });

  return (
    <main className="mx-auto w-full max-w-md px-4 py-10">
      <div className="mb-6 flex justify-center"><Logo /></div>
      <CardTilt><MemberCard name={u.name} handle={u.handle} theme={u.cardTheme} image={u.image} number={number} since={u.createdAt} /></CardTilt>
      <div className="mt-6 text-center">
        <p className="font-semibold">{u.name}{u.country ? ` · ${u.country}` : ""}</p>
        {u.bio && <p className="mt-1 text-sm text-ash">{u.bio}</p>}
        {links.length > 0 && (
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {links.map((l) => (
              <li key={l.id}>
                <a href={l.href} target="_blank" rel="noopener noreferrer nofollow" className="btn btn-ghost !py-1.5 text-sm">
                  {l.label} · {l.v}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Link href="/registro" className="btn btn-primary mt-8 w-full">Únete a la comunidad</Link>
    </main>
  );
}
