import nodemailer, { type Transporter } from "nodemailer";

const globalForMail = globalThis as unknown as {
  transport?: Transporter;
};

function getTransport() {
  if (!globalForMail.transport) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    globalForMail.transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return globalForMail.transport;
}

export async function sendMail(opts: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  headers?: Record<string, string>;
}) {
  if (!process.env.SMTP_PASS) {
    console.warn(`[mail] SMTP no configurado, no se envió: ${opts.subject} -> ${opts.to}`);
    return;
  }
  await getTransport().sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    ...opts,
  });
}

/** Cabeceras de correo masivo: permiten darse de baja desde el propio cliente de correo y bajan el riesgo de spam. */
export function bulkHeaders() {
  const base = process.env.BETTER_AUTH_URL ?? "";
  const from = process.env.SMTP_USER ?? "";
  return {
    "List-Unsubscribe": `<${base}/perfil>${from ? `, <mailto:${from}?subject=Baja>` : ""}`,
    Precedence: "bulk",
    "Auto-Submitted": "auto-generated",
  };
}

export function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Plantilla simple. `title` y `body` son texto plano y se escapan; `innerHtml` ya debe venir escapado. */
export function emailLayout(
  title: string,
  body: string,
  cta?: { label: string; url: string },
  innerHtml = "",
) {
  return `<div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#0d0d0d">
  <h2 style="margin:0 0 16px">${esc(title)}</h2>
  ${body ? `<p style="color:#5d5d5d;line-height:1.5">${esc(body)}</p>` : ""}
  ${innerHtml}
  ${
    cta
      ? `<p><a href="${esc(cta.url)}" style="display:inline-block;background:#1961d5;color:#fff;padding:12px 20px;border-radius:4px;text-decoration:none">${esc(cta.label)}</a></p>`
      : ""
  }
  <p style="color:#8f8f8f;font-size:12px">AG Lab · comunidad.andresgomez.store</p>
</div>`;
}
