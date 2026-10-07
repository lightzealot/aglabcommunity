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
