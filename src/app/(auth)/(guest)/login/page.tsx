import { isGoogleEnabled } from "@/lib/google";
import { LoginForm } from "./login-form";

// Lee las variables del servidor en cada petición (no se prerenderiza).
export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <LoginForm googleEnabled={isGoogleEnabled()} oauthError={!!error} />;
}
