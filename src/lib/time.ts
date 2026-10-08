const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

export function timeAgo(date: Date) {
  const s = Math.round((date.getTime() - Date.now()) / 1000);
  const steps: [Intl.RelativeTimeFormatUnit, number][] = [
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, secs] of steps) {
    if (Math.abs(s) >= secs) return rtf.format(Math.round(s / secs), unit);
  }
  return "justo ahora";
}

/** "12m", "3h", "5d": formato corto para actividad reciente. */
export function timeShort(date: Date) {
  const s = Math.max(0, Math.round((Date.now() - date.getTime()) / 1000));
  if (s < 60) return "1m";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

/** "en 19 horas", "en 2 días": cuánto falta para una fecha futura. */
export function timeUntil(date: Date) {
  const s = Math.round((date.getTime() - Date.now()) / 1000);
  if (s <= 0) return "está ocurriendo ahora";
  if (s < 3600) return `ocurre en ${Math.max(1, Math.round(s / 60))} min`;
  if (s < 86400) return `ocurre en ${Math.round(s / 3600)} horas`;
  const d = Math.round(s / 86400);
  return `ocurre en ${d} día${d === 1 ? "" : "s"}`;
}
