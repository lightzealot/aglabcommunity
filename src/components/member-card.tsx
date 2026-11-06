/** Tarjeta de miembro: foto, nombre, número y fecha de ingreso. Sin estado, sirve en servidor y cliente. */
export function MemberCard({
  name,
  image,
  number,
  since,
  handle,
  theme = "dark",
}: {
  name: string;
  image?: string | null;
  number: number;
  since: Date | string;
  handle?: string | null;
  theme?: "dark" | "light";
}) {
  const light = theme === "light";
  const date = new Date(since).toLocaleDateString("es", { month: "short", year: "numeric" }).replace(".", "");
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-[26px] bg-gradient-to-br from-[#f5c84b] via-[#e8e8ea] to-[#f5c84b] p-[7px] shadow-xl">
      <div className={`rounded-[20px] p-3 ${light ? "bg-[#faf7f0] text-[#1c1917]" : "bg-[#1c1917] text-white"}`}>
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-b from-[#4a3a26] to-[#1c1917]">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" className="h-full w-full object-cover" />
          ) : (
            <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
              <defs>
                <linearGradient id="mc-g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#fde58a" />
                  <stop offset="1" stopColor="#d9a826" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="38" r="15" fill="url(#mc-g)" />
              <path d="M20 92c0-20 13-32 30-32s30 12 30 32z" fill="url(#mc-g)" />
            </svg>
          )}
        </div>
        <p className="mt-3 truncate text-xl font-bold">{handle ? `@${handle}` : name}</p>
        <p className="mt-0.5 text-[11px] font-bold tracking-[.18em] text-[#f59e42]">
          MIEMBRO · #{number.toLocaleString("es")}
        </p>
        <p className={`mt-2 inline-block rounded-full border ${light ? "border-black/20 text-black/60" : "border-white/20 text-white/70"} px-3 py-1 text-xs`}>
          Miembro desde {date}
        </p>
        <div className={`mt-3 flex items-center justify-between border-t ${light ? "border-black/15" : "border-white/15"} pt-2 text-xs`}>
          <span className="font-bold">AG LAB</span>
          <span className={light ? "text-black/50" : "text-white/60"}>Comunidad</span>
        </div>
      </div>
    </div>
  );
}
