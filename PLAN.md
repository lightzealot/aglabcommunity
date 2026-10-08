# AG Lab — comunidad.andresgomez.store

Comunidad tipo Skool (una sola comunidad), en español LATAM, con el diseño de andresgomez.store.

## Decisiones
- Stack: Next.js 16 + TypeScript + Tailwind 4, Postgres (EasyPanel) con Drizzle, Better Auth, nodemailer (SMTP Namecheap).
- Registro abierto + **aprobación manual** del admin. Login con email/contraseña y Google (opcional).
- **Onboarding antes de aprobar** (inspirado en otra comunidad): nombre, intereses (= boards del foro), nivel, sector, tamaño de equipo, WhatsApp (opcional) y presentación obligatoria (mín. 20 caracteres). La presentación es el primer hilo y se publica al aprobar. El admin ve todos esos datos al revisar.
- Boards: Automatización y flujos · Agentes IA · Procesos y operaciones · Ventas y clientes · Herramientas y stack · General. Editables desde el admin. Los intereses definen el feed por defecto, pero se ven todos los boards.
- Roles: admin + miembros. Contenido gratis por defecto; módulos de pago se asignan **manualmente por usuario** (sin pasarela en el MVP).
- Videos: embeds externos (YouTube no listado / Vimeo / Loom).
- Gamificación: puntos por likes, publicar/comentar (tope diario), lecciones, eventos y racha. Gráfica estilo trading (puntos en el tiempo + ticker) de menor prioridad.
- Notificaciones: campanita, emails transaccionales, recordatorio de eventos, resumen semanal.

## Fases
- [x] Fase 0: proyecto, DB, auth, aprobación de miembros, layout y marca, Dockerfile.
- [x] Onboarding + boards + presentación pendiente (esquema de `post` listo).
- [x] Fase 1: feed (boards, posts con título opcional e imagen, comentarios, likes, fijar/borrar), perfiles, puntos con historial (`point_event`) y tope diario, admin de boards.
- [x] Fase 2: classroom (curso → módulos → lecciones con video embebido, texto y recursos), progreso, +5 pts por lección, cursos gratis o de pago con acceso asignado a mano por usuario, y admin completo en `/admin/cursos`.
- [x] Fase 3: calendario y eventos (RSVP, enlace, Google Calendar), asistencia **manual** (+10 pts), notificaciones in-app, recordatorio por correo ~1 h antes, resumen semanal (lunes 8:00), racha diaria (+1/día, +5 cada 7 días) y archivos subibles en lecciones.
- [x] Fase 4: ranking con gráfica de puntos acumulados (top 5, 7/30/90 días), ticker semanal de subidas y bajadas, tabla top 20, y guía de despliegue en [DEPLOY.md](DEPLOY.md).

## Puntos
Post +2, comentario +1 (tope 10/día entre ambos), like recibido +1. Al borrar contenido o quitar un like se revierten. El historial en `point_event` alimentará el ranking y la gráfica trading.

## Classroom
Curso → módulos → lecciones. Un curso es gratis o de pago; los de pago los desbloqueas por usuario desde `/admin/cursos/[id]` (sección Acceso). Los cursos en borrador solo los ve el admin. Videos: solo enlaces de YouTube, Vimeo o Loom (el embed se reconstruye desde el ID). Completar una lección da +5 pts y deshacerlo los quita.

## Eventos, asistencia y notificaciones
El admin crea eventos en `/admin/eventos` (todos los miembros reciben aviso). Los miembros confirman asistencia; **tú marcas quién asistió** en la página del evento (+10 pts, reversible). Notificaciones in-app (campanita): comentarios en tus posts, eventos nuevos, recordatorios, asistencia y bienvenida. Cada miembro puede desactivar los correos de recordatorio y resumen en `/perfil`.

## Tareas programadas
Corren dentro del propio contenedor (`src/instrumentation.ts`, activas con `ENABLE_JOBS=true`, que el Dockerfile ya pone): recordatorio de eventos cada 5 min (1 h antes) y resumen semanal los lunes desde las 8:00 en `APP_TIMEZONE` (por defecto America/Bogota). Un registro en la base de datos (`job_log`) evita enviarlos dos veces. Si algún día corres varias réplicas, siguen sin duplicarse.

## Archivos de lecciones
PDF, ZIP, JSON, Office, CSV, TXT, MD e imágenes, máx. 25 MB, 20 por lección. Se guardan en `UPLOAD_DIR/files`, se descargan siempre como adjunto y respetan el acceso al curso. Las acciones del servidor aceptan hasta 26 MB (`next.config.ts`).

## Ranking
`/ranking`: líneas de puntos acumulados de los 5 primeros (solo miembros, no el admin), con etiquetas al final de cada línea y leyenda con lo ganado en el periodo; ticker "Esta semana" con puestos que subió o bajó cada uno; y tabla del top 20. Todo sale del historial `point_event`.

## Interfaz (estilo Skool)
Barra superior con búsqueda, campanita y menú de usuario, y pestañas: Comunidad, Cursos, Calendario, Miembros, Clasificación y Acerca de. Feed con tarjeta plegable "Escribe algo…", tarjetas con foto y nivel, columna lateral con la comunidad y el top 3. Calendario mensual (o lista), miembros con "En línea" / "Activo hace…", clasificación con 9 niveles y tres tablas (7 días, 30 días y total), más la gráfica de evolución. Foto de perfil, y descripción y portada de la comunidad editables en `/admin/configuracion`. Quedan fuera por ahora: Mapa y Chat directo.

## Recursos públicos (captación de leads)
`/recursos` es público: cualquiera lee la guía y ve los archivos, pero **descargar exige crear cuenta** (basta con tener cuenta, aunque aún no esté aprobada en la comunidad). Los miembros ven la misma biblioteca como la pestaña "Recursos". Cada página lleva un CTA a `/registro?from=<recurso>`; el origen se guarda en `user.signup_source` (cookie `ag_from`, 30 días, primer contacto) y el admin ve los leads por recurso en `/admin/recursos`. Tras registrarse, el lead vuelve al recurso con la descarga desbloqueada. Incluye `sitemap.xml` y `robots.txt` (solo `/recursos` se indexa) y metadatos para compartir.

## Imágenes
Se guardan en `UPLOAD_DIR` (por defecto `./uploads`) y se sirven solo a miembros con sesión desde `/api/uploads/*`. En EasyPanel, monta un volumen persistente en `/app/uploads`.

## Desarrollo local
```bash
docker compose up -d        # Postgres en localhost:5433
npm run db:migrate
npm run dev
```
Variables en `.env.local` (plantilla en `.env.example`). Cambios de esquema: editar `src/db/schema.ts` → `npm run db:generate` → `npm run db:migrate`.

## Despliegue (EasyPanel)
Servicio Postgres + servicio App desde este repo (usa el `Dockerfile`, aplica migraciones al arrancar). Dominio `comunidad.andresgomez.store`, `BETTER_AUTH_URL=https://comunidad.andresgomez.store` y el resto de variables de `.env.example`.
