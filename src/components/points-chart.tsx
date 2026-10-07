import type { Row } from "@/lib/ranking";

export const SERIES_COLORS = ["#1961d5", "#e8590c", "#2f9e44", "#7048e8", "#0c8599"];

// Lienzo compacto: al escalarse a pantalla, los textos se ven grandes y legibles.
const W = 600;
const H = 340;
const M = { l: 38, r: 104, t: 26, b: 30 };

/** Divide el eje en 4 tramos con un paso "redondo" (1, 2, 5 × 10ⁿ). */
function niceScale(max: number) {
  const raw = Math.max(max, 4) / 4;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = ([1, 2, 2.5, 5, 10].find((m) => m * mag >= raw) ?? 10) * mag;
  return { step, max: step * 4 };
}

const short = (name: string, n = 9) => (name.length > n ? `${name.slice(0, n - 1)}…` : name);

const fmtDay = (key: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("es", { timeZone: "UTC", ...opts }).format(new Date(`${key}T12:00:00Z`));

/** Líneas de puntos acumulados por alumno. Es un componente de servidor: SVG puro, sin librerías. */
export function PointsChart({ days, series }: { days: string[]; series: Row[] }) {
  const n = days.length;
  const plotW = W - M.l - M.r;
  const plotH = H - M.t - M.b;
  const top = Math.max(...series.flatMap((s) => s.values), 1);
  const { step, max } = niceScale(top);

  const x = (i: number) => M.l + (n === 1 ? plotW / 2 : (i * plotW) / (n - 1));
  const y = (v: number) => M.t + plotH * (1 - v / max);

  const yTicks = [0, 1, 2, 3, 4].map((k) => k * step);
  const xTickIdx = Array.from(new Set([0, 1, 2, 3, 4].map((j) => Math.round((j * (n - 1)) / 4))));

  // Etiquetas al final de cada línea, separadas para que no se pisen.
  const GAP = 17;
  const labels = series
    .map((s, i) => ({ i, y: y(s.values[n - 1]) }))
    .sort((a, b) => a.y - b.y);
  for (let k = 1; k < labels.length; k++) labels[k].y = Math.max(labels[k].y, labels[k - 1].y + GAP);
  const overflow = labels.length ? labels[labels.length - 1].y - (M.t + plotH) : 0;
  if (overflow > 0) labels.forEach((l) => (l.y -= overflow));
  const labelY = new Map(labels.map((l) => [l.i, l.y]));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Puntos acumulados de los ${series.length} primeros del ranking`}
    >
      {/* Cuadrícula y eje Y */}
      {yTicks.map((v) => (
        <g key={v}>
          <line x1={M.l} x2={M.l + plotW} y1={y(v)} y2={y(v)} stroke="var(--hairline)" strokeDasharray={v === 0 ? undefined : "3 4"} />
          <text x={M.l - 8} y={y(v) + 4} textAnchor="end" fontSize="12.5" fill="var(--ash)">
            {v}
          </text>
        </g>
      ))}
      <text x={M.l - 8} y={12} textAnchor="end" fontSize="11" fill="var(--hollow)">
        pts
      </text>

      {/* Eje X */}
      {xTickIdx.map((i) => (
        <text key={i} x={x(i)} y={H - 10} textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"} fontSize="12.5" fill="var(--ash)">
          {fmtDay(days[i], { day: "numeric", month: "short" })}
        </text>
      ))}

      {/* Líneas: se dibujan de último a primero para que el líder quede encima */}
      {[...series].reverse().map((s) => {
        const idx = series.indexOf(s);
        const color = SERIES_COLORS[idx % SERIES_COLORS.length];
        const pts = s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ");
        return (
          <g key={s.id}>
            <polyline points={pts} fill="none" stroke={color} strokeWidth={idx === 0 ? 3.5 : 2.5} strokeLinejoin="round" strokeLinecap="round" />
            {/* Puntos invisibles con tooltip nativo al pasar el cursor */}
            {s.values.map((v, i) => (
              <circle key={i} cx={x(i)} cy={y(v)} r={6} fill="transparent">
                <title>{`${s.name} · ${fmtDay(days[i], { day: "numeric", month: "long" })}: ${v} pts`}</title>
              </circle>
            ))}
            <circle cx={x(n - 1)} cy={y(s.values[n - 1])} r={5} fill={color} stroke="#fff" strokeWidth={2} />
          </g>
        );
      })}

      {/* Etiquetas al final de cada línea: nombre y puntos */}
      {series.map((s, idx) => {
        const color = SERIES_COLORS[idx % SERIES_COLORS.length];
        const ly = labelY.get(idx) ?? 0;
        return (
          <g key={s.id}>
            <line x1={x(n - 1) + 8} x2={M.l + plotW + 14} y1={y(s.values[n - 1])} y2={ly} stroke={color} strokeWidth={1} opacity={0.5} />
            <text x={M.l + plotW + 18} y={ly + 4} fontSize="13" fontWeight={idx === 0 ? 700 : 600} fill={color}>
              {short(s.name.split(" ")[0])} <tspan fill="var(--ash)" fontWeight={500}>{s.total}</tspan>
            </text>
          </g>
        );
      })}
    </svg>
  );
}
