import { SourceCookie } from "@/components/source-cookie";
import { isGoogleEnabled } from "@/lib/google";
import { resourceSlugExists } from "@/lib/signup-source";
import { RegistroForm } from "./registro-form";
// Lee GOOGLE_CLIENT_ID/SECRET en cada petición: sin esto se prerenderiza en el build y el botón no aparece.
export const dynamic = "force-dynamic";

export default async function RegistroPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const { from: raw } = await searchParams;
  // Solo se acepta el origen si es un recurso publicado real.
  const from = raw && (await resourceSlugExists(raw)) ? raw : undefined;
  return (
    <>
      {from && <SourceCookie slug={from} overwrite />}
      <RegistroForm googleEnabled={isGoogleEnabled()} from={from} />
    </>
  );
}
