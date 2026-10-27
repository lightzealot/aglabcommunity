import Image from "next/image";

/** Portada de marca generada en código: mismo estilo siempre, con variación sutil por día. */
export function NewsCover({ day, label, compact = false, fill = false }: { day: string; label: string; compact?: boolean; fill?: boolean }) {
  const n = [...day].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const x1 = 15 + (n % 40);
  const y1 = 20 + ((n >> 3) % 50);
  const x2 = 55 + ((n >> 6) % 35);
  const y2 = 30 + ((n >> 9) % 55);

  return (
    <div
      className={`relative overflow-hidden bg-[#0d0d0d] ${compact ? "aspect-[3/1]" : fill ? "aspect-[21/8] lg:aspect-auto lg:min-h-full" : "aspect-[21/8]"}`}
      style={{
        backgroundImage: [
          `radial-gradient(circle at ${x1}% ${y1}%, rgba(25,97,213,0.85), transparent 45%)`,
          `radial-gradient(circle at ${x2}% ${y2}%, rgba(90,150,255,0.45), transparent 40%)`,
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: "auto, auto, 32px 32px, 32px 32px",
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
        <span className={`display leading-none text-white ${compact ? "text-3xl" : "text-5xl sm:text-7xl"}`}>
          IA<span className="text-accent">.</span>
        </span>
        <div className="flex items-center gap-2 text-right">
          <span className="font-mono text-[11px] tracking-widest text-white/70 uppercase">{label}</span>
          <Image src="/logo.png" alt="" width={28} height={28} className="rounded-md" />
        </div>
      </div>
    </div>
  );
}
