import { ImageResponse } from "next/og";
import { getNewsByDay } from "@/lib/news";
import { dayLabel, isDayKey } from "@/lib/news-format";

export const alt = "Noticia de IA · AG Lab";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params;
  const n = isDayKey(day) ? await getNewsByDay(day) : null;
  const title = n?.title ?? "Noticias de IA al día";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#0b0f19",
          backgroundImage: "radial-gradient(circle at 20% 15%, rgba(25,97,213,0.9), transparent 55%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 4, textTransform: "uppercase", opacity: 0.75 }}>
          {n ? dayLabel(day) : "AG Lab"}
        </div>
        <div style={{ display: "flex", fontSize: title.length > 90 ? 52 : 64, fontWeight: 700, lineHeight: 1.12 }}>{title}</div>
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
          AG Lab<span style={{ color: "#1961d5" }}>.</span>
          <span style={{ marginLeft: 20, fontSize: 28, fontWeight: 400, opacity: 0.7 }}>Noticias de IA al día</span>
        </div>
      </div>
    ),
    size,
  );
}
