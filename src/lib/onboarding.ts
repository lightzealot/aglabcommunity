export const BUSINESS_TYPES = [
  "Servicios profesionales",
  "Agencia o consultoría",
  "Salud y bienestar",
  "Comercio o e-commerce",
  "Educación",
  "Tecnología o software",
  "Otro",
] as const;

export const TEAM_SIZES = ["Solo yo", "2-10", "11-50", "51 o más"] as const;

export const LEVELS = [
  { id: "principiante", label: "Principiante", hint: "Empiezo desde cero" },
  { id: "intermedio", label: "Intermedio", hint: "Tengo base y quiero profundizar" },
  { id: "avanzado", label: "Avanzado", hint: "Busco retos y compartir lo que sé" },
] as const;
