import type { Metadata } from "next";

// Registro, login y onboarding no son contenido: que no entren al índice.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
