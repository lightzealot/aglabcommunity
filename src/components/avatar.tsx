import { levelOf } from "@/lib/levels";

/** Foto o iniciales; con `points` muestra la insignia de nivel en la esquina. */
export function Avatar({
  name,
  image,
  points,
  size = 36,
}: {
  name: string;
  image?: string | null;
  points?: number;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
  const badge = Math.max(14, Math.round(size * 0.4));

  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="h-full w-full rounded-full object-cover" />
      ) : (
        <span
          className="inline-flex h-full w-full items-center justify-center rounded-full bg-accent-soft font-semibold text-accent"
          style={{ fontSize: size * 0.38 }}
          aria-hidden
        >
          {initials}
        </span>
      )}
      {points !== undefined && (
        <span
          className="absolute -right-0.5 -bottom-0.5 flex items-center justify-center rounded-full bg-accent font-semibold text-white ring-2 ring-white"
          style={{ width: badge, height: badge, fontSize: Math.max(8, badge * 0.55) }}
          title={`Nivel ${levelOf(points)}`}
        >
          {levelOf(points)}
        </span>
      )}
    </span>
  );
}
