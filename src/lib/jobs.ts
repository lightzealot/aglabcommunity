import { and, desc, eq, gt, gte, isNull, lte, sql } from "drizzle-orm";
import { db, schema } from "@/db";
import { emailLayout, esc, sendMail } from "@/lib/mail";
import { notify } from "@/lib/notify";
import { dateKey, TZ } from "@/lib/streak";

const base = () => process.env.BETTER_AUTH_URL ?? "";
const REMINDER_WINDOW_MIN = 60;

const fmtDateTime = (d: Date) =>
  new Intl.DateTimeFormat("es", {
    timeZone: TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);

/** Recordatorio (correo + campanita) a quienes confirmaron asistencia, ~1 hora antes. */
export async function sendEventReminders(now = new Date()) {
  const limit = new Date(now.getTime() + REMINDER_WINDOW_MIN * 60_000);
  const due = await db
    .update(schema.event)
    .set({ reminderSentAt: now })
    .where(
      and(
        isNull(schema.event.reminderSentAt),
        gt(schema.event.startsAt, now),
        lte(schema.event.startsAt, limit),
      ),
    )
    .returning();

  for (const ev of due) {
    const rsvps = await db
      .select({ id: schema.user.id, email: schema.user.email, wants: schema.user.emailNotifications })
      .from(schema.eventRsvp)
      .innerJoin(schema.user, eq(schema.user.id, schema.eventRsvp.userId))
      .where(and(eq(schema.eventRsvp.eventId, ev.id), eq(schema.user.status, "approved")));
    if (!rsvps.length) continue;

    const url = `${base()}/calendario/${ev.id}`;
    await notify(
      rsvps.map((r) => r.id),
      { type: "event_reminder", title: `Empieza pronto: ${ev.title}`, body: fmtDateTime(ev.startsAt), href: `/calendario/${ev.id}` },
    );
    for (const r of rsvps.filter((r) => r.wants)) {
      await sendMail({
        to: r.email,
        subject: `Hoy: ${ev.title}`,
        text: `${ev.title} empieza ${fmtDateTime(ev.startsAt)}. ${ev.link ?? url}`,
        html: emailLayout(ev.title, `Empieza ${fmtDateTime(ev.startsAt)} (hora de ${TZ}).`, {
          label: "Ver evento",
          url,
        }),
      }).catch((e) => console.error("[jobs] recordatorio falló", r.email, e));
    }
  }
  return due.length;
}

/** Resumen semanal: lunes 8:00 (hora de la comunidad). Corre una sola vez por semana. */
export async function sendWeeklyDigest(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short", hour: "numeric", hour12: false })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  );
  if (parts.weekday !== "Mon" || Number(parts.hour) % 24 < 8) return 0;

  const key = `digest:${dateKey(now)}`;
  const claimed = await db.insert(schema.jobLog).values({ key }).onConflictDoNothing().returning();
  if (!claimed.length) return 0;

  const since = new Date(now.getTime() - 7 * 86_400_000);
  const until = new Date(now.getTime() + 7 * 86_400_000);

  const score = sql<number>`((select count(*) from post_like pl where pl.post_id = "post"."id") + (select count(*) from comment c where c.post_id = "post"."id"))::int`;
  const topPosts = await db
    .select({
      id: schema.post.id,
      title: schema.post.title,
      body: schema.post.body,
      author: schema.user.name,
      score,
    })
    .from(schema.post)
    .innerJoin(schema.user, eq(schema.user.id, schema.post.authorId))
    .where(and(eq(schema.post.status, "published"), gte(schema.post.createdAt, since)))
    .orderBy(desc(score), desc(schema.post.createdAt))
    .limit(5);
  const events = await db
    .select()
    .from(schema.event)
    .where(and(gt(schema.event.startsAt, now), lte(schema.event.startsAt, until)))
    .orderBy(schema.event.startsAt);
  const [{ newMembers }] = await db
    .select({ newMembers: sql<number>`count(*)::int` })
    .from(schema.user)
    .where(and(eq(schema.user.status, "approved"), gte(schema.user.createdAt, since), eq(schema.user.role, "member")));

  if (!topPosts.length && !events.length) return 0;

  const snippet = (s: string) => (s.length > 120 ? `${s.slice(0, 117)}…` : s);
  const postsHtml = topPosts.length
    ? `<h3 style="margin:24px 0 8px">Lo más activo de la semana</h3><ul style="padding-left:18px;line-height:1.6">${topPosts
        .map(
          (p) =>
            `<li><a href="${esc(base())}/post/${p.id}" style="color:#1961d5">${esc(p.title || snippet(p.body))}</a> <span style="color:#8f8f8f">· ${esc(p.author)}</span></li>`,
        )
        .join("")}</ul>`
    : "";
  const eventsHtml = events.length
    ? `<h3 style="margin:24px 0 8px">Próximos eventos</h3><ul style="padding-left:18px;line-height:1.6">${events
        .map(
          (e) =>
            `<li><a href="${esc(base())}/calendario/${e.id}" style="color:#1961d5">${esc(e.title)}</a> <span style="color:#8f8f8f">· ${esc(fmtDateTime(e.startsAt))}</span></li>`,
        )
        .join("")}</ul>`
    : "";
  const intro = newMembers > 0 ? `Esta semana se unieron ${newMembers} miembro${newMembers === 1 ? "" : "s"} nuevo${newMembers === 1 ? "" : "s"}.` : "";
  const html = emailLayout("Tu resumen semanal", intro, { label: "Entrar a AG Lab", url: base() }, postsHtml + eventsHtml).replace(
    "AG Lab · comunidad.andresgomez.store",
    `AG Lab · <a href="${esc(base())}/perfil" style="color:#8f8f8f">Dejar de recibir estos correos</a>`,
  );

  const recipients = await db
    .select({ email: schema.user.email })
    .from(schema.user)
    .where(and(eq(schema.user.status, "approved"), eq(schema.user.emailNotifications, true)));
  let sent = 0;
  for (const r of recipients) {
    try {
      await sendMail({ to: r.email, subject: "Tu resumen semanal · AG Lab", text: `Tu resumen semanal: ${base()}`, html });
      sent++;
    } catch (e) {
      console.error("[jobs] resumen falló", r.email, e);
    }
  }
  return sent;
}

export async function runJobs(now = new Date()) {
  const reminders = await sendEventReminders(now);
  const digest = await sendWeeklyDigest(now);
  return { reminders, digest };
}

const g = globalThis as unknown as { jobsStarted?: boolean };

export function startJobs() {
  if (g.jobsStarted) return;
  g.jobsStarted = true;
  const tick = () =>
    runJobs().catch((e) => console.error("[jobs] error", e));
  setTimeout(tick, 15_000);
  setInterval(tick, 5 * 60_000);
  console.log("[jobs] programados: recordatorios cada 5 min, resumen los lunes 8:00");
}
