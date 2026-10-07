# Desplegar AG Lab en tu VPS con EasyPanel

Dominio: `comunidad.andresgomez.store`

## 1. DNS
En el DNS de `andresgomez.store` crea un registro **A**: `comunidad` → IP de tu VPS.

## 2. Código en un repositorio
EasyPanel despliega desde Git. Sube este proyecto a un repositorio **privado** (GitHub, GitLab…).
`.env.local` no se sube (está en `.gitignore`); los secretos se ponen en EasyPanel.

## 3. Base de datos
En tu proyecto de EasyPanel: **+ Service → Postgres** (versión 16 o 17).
Anota la **URL de conexión interna**, algo como `postgres://usuario:clave@postgres:5432/aglab`.
Activa los **backups** del servicio (programados) y guarda una copia fuera del VPS.

## 4. Aplicación
**+ Service → App**:
- **Source:** tu repositorio, rama principal.
- **Build:** Dockerfile (ya está en la raíz). Al arrancar aplica las migraciones solo.
- **Puerto:** 3000.
- **Dominio:** `comunidad.andresgomez.store` con HTTPS (Let's Encrypt, lo da EasyPanel).
- **Volumen persistente:** monta uno en `/app/uploads` (imágenes y archivos de las lecciones).
  Sin esto se pierden en cada despliegue.

### Variables de entorno
| Variable | Valor |
|---|---|
| `DATABASE_URL` | la URL interna de Postgres del paso 3 |
| `BETTER_AUTH_URL` | `https://comunidad.andresgomez.store` |
| `BETTER_AUTH_SECRET` | una clave larga y aleatoria (`openssl rand -base64 32`) |
| `ADMIN_EMAIL` | tu correo de admin (acepta varios separados por coma) |
| `SMTP_HOST` | `mail.privateemail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `hello@andresgomez.store` |
| `SMTP_PASS` | la contraseña del correo |
| `SMTP_FROM` | `AG Lab <hello@andresgomez.store>` |
| `APP_TIMEZONE` | `America/Bogota` (o la de tu comunidad) |
| `UPLOAD_DIR` | `/app/uploads` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | opcionales, ver abajo |

> `NEXT_PUBLIC_GOOGLE_ENABLED` se fija **al construir**. Si activas Google, ponla en `true`
> como *build argument* / variable de build en EasyPanel y reconstruye.

## 5. Primer arranque
1. Abre `https://comunidad.andresgomez.store/registro` y regístrate con el correo de `ADMIN_EMAIL`:
   queda como **admin** y aprobado sin pasar por el onboarding.
2. Revisa `/admin/boards`, crea tu primer curso en `/admin/cursos` y tu primer evento en `/admin/eventos`.
3. Escribe a otra cuenta de prueba para confirmar que llega el correo de aviso.

## Google (opcional)
En Google Cloud Console → Credenciales → ID de cliente OAuth (aplicación web):
- Origen autorizado: `https://comunidad.andresgomez.store`
- URI de redirección: `https://comunidad.andresgomez.store/api/auth/callback/google`

## Mantenimiento
- **Actualizar:** `git push` y vuelve a desplegar. Las migraciones se aplican solas.
- **Un solo contenedor:** los recordatorios y el resumen semanal corren dentro de la app
  (`ENABLE_JOBS=true`, ya puesto en el Dockerfile). Si la app está caída a las 8:00 del lunes,
  el resumen sale cuando vuelva a arrancar ese mismo día.
- **Backups:** base de datos (servicio Postgres) **y** el volumen `/app/uploads`.
