/** Puntos mínimos para llegar a cada nivel (nivel 1 = índice 0). */
export const LEVEL_THRESHOLDS = [0, 5, 20, 65, 155, 515, 2015, 8015, 33015] as const;
export const MAX_LEVEL = LEVEL_THRESHOLDS.length;

export function levelOf(points: number) {
  let level = 1;
  LEVEL_THRESHOLDS.forEach((min, i) => {
    if (points >= min) level = i + 1;
  });
  return level;
}

/** Puntos que faltan para el siguiente nivel (null si ya está en el máximo). */
export function pointsToNext(points: number) {
  const level = levelOf(points);
  return level >= MAX_LEVEL ? null : LEVEL_THRESHOLDS[level] - points;
}
