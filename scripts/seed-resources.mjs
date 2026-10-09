// Carga los recursos iniciales (seed/recursos) una sola vez.
// Se ejecuta tras las migraciones. Un registro en job_log evita repetirlo, así que si luego
// borras o editas un recurso desde el admin, no se vuelve a crear.
import { randomUUID } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import pg from "pg";

const KEY = "seed:resources:v1";
const root = path.resolve("seed/recursos");
const uploadDir = path.resolve(process.env.UPLOAD_DIR ?? "./uploads");
const filesDir = path.join(uploadDir, "files");

if (!existsSync(path.join(root, "index.json"))) {
  console.log("[seed] no hay recursos iniciales");
  process.exit(0);
}
const all = JSON.parse(readFileSync(path.join(root, "index.json"), "utf8"));
// Los primeros recursos van con la guarda "v1"; los marcados "extra" se cargan uno a uno (guarda por slug), sin archivo.
const items = all.filter((i) => !i.extra);
const extras = all.filter((i) => i.extra);

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const client = await pool.connect();
const copied = [];
try {
  await client.query("begin");
  const claimed = await client.query("insert into job_log (key) values ($1) on conflict do nothing returning key", [KEY]);
  if (!claimed.rowCount) {
    await client.query("rollback");
    console.log("[seed] recursos iniciales ya cargados");
  } else {
    mkdirSync(filesDir, { recursive: true });
    let created = 0;
    for (const it of items) {
      const body = readFileSync(path.join(root, it.slug, "body.md"), "utf8");
      const ins = await client.query(
        `insert into resource (slug, title, summary, body, cover_url, published, position)
         values ($1, $2, $3, $4, $5, true, $6) on conflict (slug) do nothing returning id`,
        [it.slug, it.title, it.summary, body, it.cover, it.position],
      );
      if (!ins.rowCount) continue; // ya existía un recurso con ese enlace
      created++;
      const src = path.join(root, it.slug, it.file);
      const stored = `${randomUUID()}.txt`;
      copyFileSync(src, path.join(filesDir, stored));
      copied.push(path.join(filesDir, stored));
      await client.query(
        "insert into resource_file (resource_id, name, stored_name, size) values ($1, $2, $3, $4)",
        [ins.rows[0].id, it.file, stored, statSync(src).size],
      );
    }
    await client.query("commit");
    console.log(`[seed] ${created} recursos iniciales creados`);
  }
  await client.query("begin");
  for (const it of extras) {
    const body = readFileSync(path.join(root, it.slug, "body.md"), "utf8");
    const claimed = await client.query("insert into job_log (key) values ($1) on conflict do nothing returning key", [`seed:resource:${it.slug}`]);
    if (claimed.rowCount) {
      // Va de primero: los demás bajan un puesto.
      await client.query("update resource set position = position + 1");
      const ins = await client.query(
        `insert into resource (slug, title, summary, body, cover_url, published, position)
         values ($1, $2, $3, $4, $5, true, 0) on conflict (slug) do nothing`,
        [it.slug, it.title, it.summary, body, it.cover],
      );
      console.log(`[seed] recurso ${it.slug}: ${ins.rowCount ? "creado" : "ya existía"}`);
    }
    // Revisiones (r2, r3…): reescriben una sola vez el texto y la portada de un recurso ya cargado.
    for (let r = 2; r <= (it.revision ?? 1); r++) {
      const rev = await client.query("insert into job_log (key) values ($1) on conflict do nothing returning key", [`seed:resource:${it.slug}:r${r}`]);
      if (!rev.rowCount) continue;
      const upd = await client.query(
        "update resource set title = $2, summary = $3, body = $4, cover_url = $5 where slug = $1",
        [it.slug, it.title, it.summary, body, it.cover],
      );
      console.log(`[seed] recurso ${it.slug}: revisión ${r} ${upd.rowCount ? "aplicada" : "(no existe, omitida)"}`);
    }
  }
  await client.query("commit");
} catch (e) {
  await client.query("rollback").catch(() => {});
  console.error("[seed] falló, no se cargó nada:", e);
  process.exitCode = 1;
} finally {
  client.release();
  await pool.end();
}
