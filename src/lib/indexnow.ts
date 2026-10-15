import { abs, siteUrl } from "@/lib/site";

/**
 * IndexNow: avisa a Bing, Yandex, Naver y Seznam (y de ahí a varios buscadores con IA) apenas hay algo nuevo.
 * Google no lo usa: a Google lo alimenta el sitemap. Sin INDEXNOW_KEY o en local no hace nada.
 */
export async function pingIndexNow(paths: string[]) {
  const key = process.env.INDEXNOW_KEY;
  const base = siteUrl();
  if (!key || !/^[a-zA-Z0-9-]{8,128}$/.test(key) || /localhost|127\.0\.0\.1/.test(base) || !paths.length) return;
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(base).host,
        key,
        keyLocation: abs("/indexnow.txt"),
        urlList: paths.map(abs),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok && res.status !== 202) console.warn("[indexnow] respuesta", res.status);
  } catch (e) {
    console.warn("[indexnow] falló", e);
  }
}
