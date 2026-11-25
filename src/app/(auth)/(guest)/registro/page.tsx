import { InviteCookie } from "@/components/invite-cookie";
import { UUID_RE } from "@/lib/courses";
import { SourceCookie } from "@/components/source-cookie";
import { isGoogleEnabled } from "@/lib/google";
import { resourceSlugExists } from "@/lib/signup-source";
import { RegistroForm } from "./registro-form";
// Lee GOOGLE_CLIENT_ID/SECRET en cada petición: sin esto se prerenderiza en el build y el botón no aparece.
export const dynamic = "force-dynamic";

export default async function RegistroPage({ searchParams }: { searchParams: Promise<{ from?: string; evento?: string; ref?: string }> }) {
  const { from: raw, evento, ref } = await searchParams;
  const eventId = evento && UUID_RE.test(evento) ? evento : undefined;
  // Solo se acepta el origen si es un recurso publicado real.
  const from = raw && (await resourceSlugExists(raw)) ? raw : undefined;
  return (
    <>
      {from && <SourceCookie slug={from} overwrite />}
      {eventId && <InviteCookie eventId={eventId} refId={ref} />}
      <RegistroForm googleEnabled={isGoogleEnabled()} from={from} />
    </>
  );
}
