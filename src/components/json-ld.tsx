/** Datos estructurados (schema.org) para buscadores y asistentes de IA. Se escapa "<" para que nada cierre el script. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
