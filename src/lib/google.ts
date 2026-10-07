/** Google se activa solo si el servidor tiene ambas credenciales (se lee en runtime). */
export const isGoogleEnabled = () =>
  !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
