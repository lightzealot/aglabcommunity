// Carga los cursos iniciales (seed/cursos) una sola vez, publicados y gratis.
// Un registro en job_log evita repetirlo: si luego los editas o borras desde el admin, no se recrean.
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import pg from "pg";

const KEY = "seed:courses:v1";
const file = path.resolve("seed/cursos/index.json");
if (!existsSync(file)) {
  console.log("[seed-cursos] no hay cursos iniciales");
  process.exit(0);
}
const { courses } = JSON.parse(readFileSync(file, "utf8"));

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const client = await pool.connect();
try {
  await client.query("begin");
  const claimed = await client.query("insert into job_log (key) values ($1) on conflict do nothing returning key", [KEY]);
  if (!claimed.rowCount) {
    await client.query("rollback");
    console.log("[seed-cursos] cursos iniciales ya cargados");
  } else {
    const { rows } = await client.query("select coalesce(max(position), 0)::int as max from course");
    let base = rows[0].max;
    let lessons = 0;
    for (const c of courses) {
      const created = await client.query(
        `insert into course (title, description, cover_url, is_paid, published, position)
         values ($1, $2, $3, false, true, $4) returning id`,
        [c.title, c.description, c.cover, base + c.position],
      );
      const courseId = created.rows[0].id;
      let mPos = 0;
      for (const m of c.modules) {
        const mod = await client.query(
          "insert into course_module (course_id, title, position) values ($1, $2, $3) returning id",
          [courseId, m.title, ++mPos],
        );
        let lPos = 0;
        for (const l of m.lessons) {
          await client.query(
            "insert into lesson (module_id, title, body, resources, position) values ($1, $2, $3, $4::jsonb, $5)",
            [mod.rows[0].id, l.title, l.body, JSON.stringify(l.resources ?? []), ++lPos],
          );
          lessons++;
        }
      }
    }
    await client.query("commit");
    console.log(`[seed-cursos] ${courses.length} cursos y ${lessons} lecciones creados`);
  }
  // Siempre (sin importar la guarda): si los cursos ya se cargaron con la portada provisional .png,
  // la cambia por la definitiva .webp. Solo toca cursos que aún tienen esa portada exacta.
  for (const c of courses) {
    const old = c.cover.replace(/\.webp$/, ".png");
    if (old !== c.cover) await client.query("update course set cover_url = $1 where cover_url = $2", [c.cover, old]);
  }
} catch (e) {
  await client.query("rollback").catch(() => {});
  console.error("[seed-cursos] falló, no se cargó nada:", e);
  process.exitCode = 1;
} finally {
  client.release();
  await pool.end();
}
