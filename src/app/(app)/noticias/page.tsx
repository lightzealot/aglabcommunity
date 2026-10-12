import { LocalTime } from "@/components/local-time";
import { listNews } from "@/lib/news";
import { requireMember } from "@/lib/session";
import { dateKey } from "@/lib/streak";
import { removeNews } from "./actions";

export const metadata = { title: "Noticias" };

const dayLabel = (day: string) =>
  new Intl.DateTimeFormat("es", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(
    new Date(`${day}T12:00:00Z`),
  );

export default async function NoticiasPage() {
  const { user } = await requireMember();
  const isAdmin = user.role === "admin";
  const items = await listNews();
  const today = dateKey();
  const [featured, ...older] = items;

  const remove = (id: string) =>
    isAdmin && (
      <form action={removeNews}>
        <input type="hidden" name="id" value={id} />
        <button type="submit" className="text-xs font-semibold text-hollow hover:text-accent">
          Quitar
        </button>
      </form>
    );

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="display text-5xl">
          Noticias<span className="text-accent">.</span>
        </h1>
        <p className="mt-2 text-sm text-ash">Una noticia de IA al día, elegida sola entre las fuentes en español.</p>
      </div>

      {!featured ? (
        <p className="card p-10 text-center text-sm text-ash">La primera noticia destacada aparecerá en unos minutos.</p>
      ) : (
        <>
          <article className="card overflow-hidden">
            {featured.imageUrl && (
              <div className="aspect-[21/9] bg-accent-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.imageUrl} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              </div>
            )}
            <div className="p-6">
              <p className="label !text-ash">
                {featured.day === today ? "Noticia destacada de hoy" : `Destacada · ${dayLabel(featured.day)}`}
              </p>
              <h2 className="mt-2 text-2xl leading-snug font-bold sm:text-3xl">{featured.title}</h2>
              {featured.summary && <p className="mt-3 text-ash">{featured.summary}</p>}
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <a href={featured.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Leer en {featured.source}
                </a>
                <span className="text-xs text-hollow">
                  {featured.source} · <LocalTime iso={featured.publishedAt.toISOString()} options={{ day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }} />
                </span>
                <span className="ml-auto">{remove(featured.id)}</span>
              </div>
            </div>
          </article>

          {older.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-3 text-sm font-semibold text-ash">Anteriores</h2>
              <div className="space-y-3">
                {older.map((n) => (
                  <div key={n.id} className="card flex items-center gap-4 p-4">
                    <div className="min-w-0 flex-1">
                      <p className="label !text-ash">
                        {dayLabel(n.day)} · {n.source}
                      </p>
                      <a
                        href={n.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-0.5 block text-lg leading-snug font-semibold hover:text-accent"
                      >
                        {n.title}
                      </a>
                    </div>
                    {remove(n.id)}
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
