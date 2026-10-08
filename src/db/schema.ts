import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

// Tablas requeridas por Better Auth + campos propios de la comunidad.
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  // Campos propios
  role: text("role", { enum: ["admin", "member"] }).notNull().default("member"),
  status: text("status", { enum: ["pending", "approved", "banned"] })
    .notNull()
    .default("pending"),
  bio: text("bio"),
  points: integer("points").notNull().default(0),
  // Onboarding
  onboarded: boolean("onboarded").notNull().default(false),
  level: text("level", { enum: ["principiante", "intermedio", "avanzado"] }),
  businessType: text("business_type"),
  teamSize: text("team_size"),
  phone: text("phone"),
  // Racha diaria y preferencias de correo
  streak: integer("streak").notNull().default(0),
  lastActiveDate: date("last_active_date", { mode: "string" }),
  emailNotifications: boolean("email_notifications").notNull().default(true),
  // Última vez que estuvo activo (para "En línea" y "Activo hace…")
  lastSeenAt: timestamp("last_seen_at"),
  // Slug del recurso desde el que llegó (atribución del lead)
  signupSource: text("signup_source"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Boards del foro (se editan desde el admin).
export const board = pgTable("board", {
  id: text("id").primaryKey(), // slug
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  position: integer("position").notNull().default(0),
});

// Intereses del usuario = boards que sigue.
export const userBoard = pgTable(
  "user_board",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    boardId: text("board_id")
      .notNull()
      .references(() => board.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.userId, t.boardId] })],
);

export const post = pgTable("post", {
  id: uuid("id").primaryKey().defaultRandom(),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  boardId: text("board_id")
    .notNull()
    .references(() => board.id),
  kind: text("kind", { enum: ["intro", "post"] }).notNull().default("post"),
  // La presentación queda "pending" hasta que el admin aprueba al usuario.
  status: text("status", { enum: ["pending", "published"] }).notNull().default("published"),
  title: text("title"),
  body: text("body").notNull(),
  imageUrl: text("image_url"),
  pinned: boolean("pinned").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const comment = pgTable(
  "comment",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    postId: uuid("post_id")
      .notNull()
      .references(() => post.id, { onDelete: "cascade" }),
    authorId: text("author_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    body: text("body").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("comment_post_idx").on(t.postId)],
);

export const postLike = pgTable(
  "post_like",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    postId: uuid("post_id")
      .notNull()
      .references(() => post.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.userId, t.postId] })],
);

export const commentLike = pgTable(
  "comment_like",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    commentId: uuid("comment_id")
      .notNull()
      .references(() => comment.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.userId, t.commentId] })],
);

// Historial de puntos: alimenta el ranking y la gráfica tipo trading.
export const pointEvent = pgTable(
  "point_event",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type", { enum: ["post", "comment", "like", "lesson", "event", "streak"] }).notNull(),
    points: integer("points").notNull(),
    refId: text("ref_id").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    unique("point_event_unique").on(t.userId, t.type, t.refId),
    index("point_event_user_time_idx").on(t.userId, t.createdAt),
  ],
);

// ---- Classroom ----
export const course = pgTable("course", {
  id: uuid("id").primaryKey().defaultRandom(),
  // Enlace público de la vista previa (/cursos/<slug>).
  slug: text("slug").unique(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  coverUrl: text("cover_url"),
  // Gratis por defecto; los de pago se asignan a mano por usuario (course_access).
  isPaid: boolean("is_paid").notNull().default(false),
  published: boolean("published").notNull().default(false),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const courseModule = pgTable(
  "course_module",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    courseId: uuid("course_id")
      .notNull()
      .references(() => course.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    position: integer("position").notNull().default(0),
  },
  (t) => [index("course_module_course_idx").on(t.courseId)],
);

export type LessonResource = { label: string; url: string };

export const lesson = pgTable(
  "lesson",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    moduleId: uuid("module_id")
      .notNull()
      .references(() => courseModule.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    videoUrl: text("video_url"),
    body: text("body").notNull().default(""),
    resources: jsonb("resources").$type<LessonResource[]>().notNull().default([]),
    position: integer("position").notNull().default(0),
  },
  (t) => [index("lesson_module_idx").on(t.moduleId)],
);

export const courseAccess = pgTable(
  "course_access",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    courseId: uuid("course_id")
      .notNull()
      .references(() => course.id, { onDelete: "cascade" }),
    grantedAt: timestamp("granted_at").notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.courseId] })],
);

export const lessonProgress = pgTable(
  "lesson_progress",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lesson.id, { onDelete: "cascade" }),
    completedAt: timestamp("completed_at").notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.lessonId] })],
);

export const lessonFile = pgTable(
  "lesson_file",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lesson.id, { onDelete: "cascade" }),
    name: text("name").notNull(), // nombre original para mostrar/descargar
    storedName: text("stored_name").notNull(), // nombre en disco (uuid.ext)
    size: integer("size").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("lesson_file_lesson_idx").on(t.lessonId)],
);

// ---- Eventos ----
export const event = pgTable("event", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  durationMin: integer("duration_min").notNull().default(60),
  link: text("link"), // Zoom / Meet / etc.
  reminderSentAt: timestamp("reminder_sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const eventRsvp = pgTable(
  "event_rsvp",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    eventId: uuid("event_id")
      .notNull()
      .references(() => event.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.userId, t.eventId] })],
);

// Asistencia marcada manualmente por el admin.
export const eventAttendance = pgTable(
  "event_attendance",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    eventId: uuid("event_id")
      .notNull()
      .references(() => event.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.userId, t.eventId] })],
);

// ---- Notificaciones ----
export const notification = pgTable(
  "notification",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    title: text("title").notNull(),
    body: text("body").notNull().default(""),
    href: text("href"),
    readAt: timestamp("read_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("notification_user_idx").on(t.userId, t.createdAt)],
);

// Evita que un trabajo programado (p. ej. el resumen semanal) corra dos veces.
export const jobLog = pgTable("job_log", {
  key: text("key").primaryKey(),
  ranAt: timestamp("ran_at").notNull().defaultNow(),
});

// Ajustes globales de la comunidad (clave/valor). Se editan en /admin/configuracion.
export const appSetting = pgTable("app_setting", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

// ---- Recursos públicos (captación de leads) ----
export const resource = pgTable("resource", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull().default(""),
  body: text("body").notNull().default(""),
  coverUrl: text("cover_url"),
  published: boolean("published").notNull().default(false),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const resourceFile = pgTable(
  "resource_file",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    resourceId: uuid("resource_id")
      .notNull()
      .references(() => resource.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    storedName: text("stored_name").notNull(),
    size: integer("size").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("resource_file_resource_idx").on(t.resourceId)],
);
