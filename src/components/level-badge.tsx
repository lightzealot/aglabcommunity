import { levelOf, LEVELS } from "@/lib/resource-constants";
import type { Lang } from "@/lib/resource-i18n";

export const LEVEL_LABEL: Record<Lang, Record<(typeof LEVELS)[number], string>> = {
  es: { principiante: "Principiante", intermedio: "Intermedio", avanzado: "Avanzado" },
  en: { principiante: "Beginner", intermedio: "Intermediate", avanzado: "Advanced" },
  pt: { principiante: "Iniciante", intermedio: "Intermediário", avanzado: "Avançado" },
};

const COLOR = {
  principiante: "text-[#15803d] bg-[#dcfce7] border-[#bbf7d0]",
  intermedio: "text-[#b45309] bg-[#fef3c7] border-[#fde68a]",
  avanzado: "text-[#b91c1c] bg-[#fee2e2] border-[#fecaca]",
} as const;

/** Nivel de conocimiento con tres barritas (1, 2 o 3 llenas). */
export function LevelBadge({ level, lang = "es", className = "" }: { level: string; lang?: Lang; className?: string }) {
  const l = levelOf(level);
  const n = LEVELS.indexOf(l) + 1;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${COLOR[l]} ${className}`}>
      <span className="flex items-end gap-px" aria-hidden>
        {[1, 2, 3].map((i) => (
          <span key={i} className="w-[3px] rounded-sm bg-current" style={{ height: 4 + i * 3, opacity: i <= n ? 1 : 0.25 }} />
        ))}
      </span>
      {LEVEL_LABEL[lang][l]}
    </span>
  );
}
