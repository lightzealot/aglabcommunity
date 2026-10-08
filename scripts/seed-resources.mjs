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
const items = JSON.parse(readFileSync(path.join(root, "index.json"), "utf8"));

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
} catch (e) {
  await client.query("rollback").catch(() => {});
  console.error("[seed] falló, no se cargó nada:", e);
  process.exitCode = 1;
} finally {
  client.release();
  await pool.end();
}
