import { readFile } from "node:fs/promises";
import path from "node:path";
import { getSession } from "@/lib/session";
import { TYPE_BY_EXT, uploadDir } from "@/lib/uploads";

export async function GET(_req: Request, ctx: { params: Promise<{ file: string }> }) {
  const session = await getSession();
  if (!session || session.user.status !== "approved") {
    return new Response("No autorizado", { status: 401 });
  }
  const { file } = await ctx.params;
  const m = /^[0-9a-f-]{36}\.(jpg|png|webp|gif)$/.exec(file);
  if (!m) return new Response("No encontrado", { status: 404 });
  try {
    const data = await readFile(path.join(/*turbopackIgnore: true*/ uploadDir(), file));
    return new Response(data, {
      headers: {
        "Content-Type": TYPE_BY_EXT[m[1]],
        "Cache-Control": "private, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("No encontrado", { status: 404 });
  }
}
