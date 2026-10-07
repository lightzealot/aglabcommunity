import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db, schema } from "@/db";
import { isGoogleEnabled } from "@/lib/google";
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
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const isAdmin = adminEmails.includes(user.email.toLowerCase());
          return {
            data: {
              ...user,
              role: isAdmin ? "admin" : "member",
              status: isAdmin ? "approved" : "pending",
              onboarded: isAdmin, // el admin no pasa por el onboarding
            },
          };
        },
        after: async (user) => {
          if (adminEmails.includes(user.email.toLowerCase())) return;
          const base = process.env.BETTER_AUTH_URL ?? "";
          await Promise.all(
            adminEmails.map((to) =>
              sendMail({
                to,
                subject: `Nueva solicitud: ${user.name}`,
                text: `${user.name} (${user.email}) pidió acceso a AG Lab.`,
                html: emailLayout(
                  "Nueva solicitud de acceso",
                  `${user.name} (${user.email}) pidió acceso a AG Lab.`,
                  { label: "Revisar usuarios", url: `${base}/admin/usuarios` },
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
