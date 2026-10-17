import { CommunityMascot } from "@/components/community-mascot";
import { isGoogleEnabled } from "@/lib/google";
import { isInternalPath } from "@/lib/notify";
import { LoginForm } from "./login-form";

// Lee las variables del servidor en cada petición (no se prerenderiza).
export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;
  // `next` solo admite rutas internas (evita redirecciones a otros sitios).
  const safeNext = isInternalPath(next) ? next : "/";
  return (
    <>
      <LoginForm googleEnabled={isGoogleEnabled()} oauthError={!!error} next={safeNext} />
      <CommunityMascot
        storageKey="aglab-login-welcome-v1"
        title="¡Hola! Qué bueno verte"
        message="Inicia sesión para entrar a la comunidad. Si aún no tienes cuenta, créala gratis o mira los recursos abiertos."
        startUrl="/registro"
        resourcesUrl="/recursos"
      />
    </>
  );
}
