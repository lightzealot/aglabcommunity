import { fmtViews } from "@/lib/resource-views";

/** Ojito con el número de personas que han visto el recurso. */
export function EyeCount({ n, className = "" }: { n: number; className?: string }) {
  if (n <= 0) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} title={`${n} ${n === 1 ? "persona lo ha visto" : "personas lo han visto"}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span className="tabular-nums">{fmtViews(n)}</span>
    </span>
  );
}
