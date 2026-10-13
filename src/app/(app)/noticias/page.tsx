import { NewsCover } from "@/components/news-cover";
import { listNews } from "@/lib/news";
import { requireMember } from "@/lib/session";
import { dateKey } from "@/lib/streak";
import { removeNews } from "./actions";

export const metadata = { title: "Noticias" };

const dayLabel = (day: string) =>
  new Intl.DateTimeFormat("es", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(
    new Date(`${day}T12:00:00Z`),
  );

/** Respeta los párrafos del texto; si viene todo seguido, lo parte cada 3 frases para que se lea mejor. */
const paragraphs = (t: string) => {
  const blocks = t
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (blocks.length > 1) return blocks;
  const sentences = t.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g)?.map((x) => x.trim()) ?? [t];
  const out: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) out.push(sentences.slice(i, i + 3).join(" "));
  return out;
};

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
        <p className="mt-2 text-sm text-ash">Una noticia de IA al día, explicada para que le saques provecho.</p>
      </div>

      {!featured ? (
        <p className="card p-10 text-center text-sm text-ash">La primera noticia destacada aparecerá en unos minutos.</p>
      ) : (
        <>
          <article className="card overflow-hidden">
            <NewsCover day={featured.day} label={dayLabel(featured.day)} />
            <div className="p-6">
            <p className="label !text-ash">
              {featured.day === today ? "Noticia destacada de hoy" : `Destacada · ${dayLabel(featured.day)}`}
            </p>
            <h2 className="mt-2 text-2xl leading-snug font-bold sm:text-3xl">{featured.title}</h2>
            <div className="mt-4 space-y-3 text-ash">
              {paragraphs(featured.summary).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-5 text-right">{remove(featured.id)}</div>
            </div>
          </article>

          {older.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-3 text-sm font-semibold text-ash">Anteriores</h2>
              <div className="space-y-3">
                {older.map((n) => (
                  <details key={n.id} className="card group overflow-hidden">
                    <summary className="cursor-pointer list-none p-4">
                      <p className="label !text-ash">{dayLabel(n.day)}</p>
                      <span className="mt-0.5 block text-lg leading-snug font-semibold group-open:text-accent">{n.title}</span>
                    </summary>
                    <NewsCover day={n.day} label={dayLabel(n.day)} compact />
                    <div className="space-y-3 p-4 text-sm text-ash">
                      {paragraphs(n.summary).map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                      <div className="text-right">{remove(n.id)}</div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
