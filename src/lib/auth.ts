import { eq } from "drizzle-orm";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db, schema } from "@/db";
import { isGoogleEnabled } from "@/lib/google";
import { notify } from "@/lib/notify";
import { getRequireApproval } from "@/lib/settings";
import { sourceFromHeaders } from "@/lib/signup-source";
import { emailLayout, sendMail } from "@/lib/mail";

const adminEmails = (process.env.ADMIN_EMAIL ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

const googleEnabled = isGoogleEnabled();

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    sendResetPassword: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: "Restablece tu contraseña · AG Lab",
        text: `Restablece tu contraseña aquí: ${url}`,
        html: emailLayout(
          "Restablece tu contraseña",
          "Recibimos una solicitud para cambiar tu contraseña. Si no fuiste tú, ignora este correo.",
          { label: "Cambiar contraseña", url },
        ),
      });
    },
  },
  socialProviders: googleEnabled
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
      }
    : {},
  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "member", input: false },
      status: { type: "string", defaultValue: "pending", input: false },
      points: { type: "number", defaultValue: 0, input: false },
      onboarded: { type: "boolean", defaultValue: false, input: false },
      signupSource: { type: "string", required: false, input: false },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user, context) => {
          const isAdmin = adminEmails.includes(user.email.toLowerCase());
          // Con la aprobación manual desactivada, los nuevos miembros entran directo.
          const approved = isAdmin || !(await getRequireApproval());
          // Atribución: el recurso que vio antes de registrarse (cookie), si existe.
          const signupSource = await sourceFromHeaders(
            context?.request?.headers ?? (context as { headers?: Headers } | null)?.headers,
          );
          return {
            data: {
              ...user,
              role: isAdmin ? "admin" : "member",
              status: approved ? "approved" : "pending",
              onboarded: isAdmin, // el admin no pasa por el onboarding
              ...(signupSource ? { signupSource } : {}),
            },
          };
        },
        after: async (user) => {
          if (adminEmails.includes(user.email.toLowerCase())) return;
          const base = process.env.BETTER_AUTH_URL ?? "";
          const [row] = await db
            .select({ status: schema.user.status })
            .from(schema.user)
            .where(eq(schema.user.id, user.id));
          const joined = row?.status === "approved";

          if (joined) {
            await notify(user.id, {
              type: "welcome",
              title: "¡Bienvenido a AG Lab!",
              body: "Ya eres parte de la comunidad.",
              href: "/",
            });
          }
          const subject = joined ? `Nuevo miembro: ${user.name}` : `Nueva solicitud: ${user.name}`;
          const text = joined
            ? `${user.name} (${user.email}) se unió a AG Lab.`
            : `${user.name} (${user.email}) pidió acceso a AG Lab.`;
          await Promise.all(
            adminEmails.map((to) =>
              sendMail({
                to,
                subject,
                text,
                html: emailLayout(
                  joined ? "Nuevo miembro" : "Nueva solicitud de acceso",
                  text,
                  { label: "Ver usuarios", url: `${base}/admin/usuarios` },
                ),
              }).catch((e) => console.error("[mail] aviso admin falló", e)),
            ),
          );
        },
      },
    },
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
