import { buildLlmsFull } from "@/lib/llms";
import { FEED_CACHE } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(await buildLlmsFull(), {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": FEED_CACHE },
  });
}
