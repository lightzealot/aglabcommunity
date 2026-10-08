import { Fragment } from "react";
import { CodeBlock } from "@/components/code-block";

/**
 * Markdown básico para guías: ##/### títulos, listas (- y 1.), citas (>), bloques de código (```),
 * tablas con |, **negrita**, `código`, [texto](https://enlace) y enlaces sueltos.
 * Todo se renderiza con elementos de React (nunca HTML crudo), así que no hay inyección.
 */

const isSafeUrl = (u: string) => /^https?:\/\//i.test(u);

function inline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s<>"')\]]+)/g);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i}>{inline(part.slice(2, -2))}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code key={i} className="rounded bg-veil px-1 py-0.5 font-mono text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    const md = /^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/.exec(part);
    if (md && isSafeUrl(md[2])) {
      return (
        <a key={i} href={md[2]} target="_blank" rel="noopener noreferrer nofollow ugc" className="text-accent underline">
          {md[1]}
        </a>
      );
    }
    if (isSafeUrl(part)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer nofollow ugc" className="break-all text-accent underline">
          {part}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

type Block =
  | { t: "h"; level: 2 | 3; text: string }
  | { t: "p"; text: string }
  | { t: "code"; text: string }
  | { t: "quote"; text: string }
  | { t: "ul" | "ol"; items: string[] }
  | { t: "table"; rows: string[][] };

const isTableRow = (l: string) => l.trim().startsWith("|") && l.trim().endsWith("|");
const isSeparator = (l: string) => /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?$/.test(l.trim());
const splitRow = (l: string) =>
  l
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());
const bullet = (l: string) => /^\s*[-*]\s+/.test(l);
const ordered = (l: string) => /^\s*\d+\.\s+/.test(l);
const special = (l: string) =>
  l.startsWith("```") || /^#{1,3}\s/.test(l) || l.startsWith(">") || bullet(l) || ordered(l) || isTableRow(l);

function parse(src: string): Block[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
    } else if (line.startsWith("```")) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) buf.push(lines[i++]);
      i++; // cierre
      blocks.push({ t: "code", text: buf.join("\n").replace(/^\n+|\n+$/g, "") });
    } else if (/^#{1,3}\s/.test(line)) {
      const m = /^(#{1,3})\s+(.*)$/.exec(line)!;
      blocks.push({ t: "h", level: m[1].length >= 3 ? 3 : 2, text: m[2] });
      i++;
    } else if (line.startsWith(">")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) buf.push(lines[i++].replace(/^>\s?/, ""));
      blocks.push({ t: "quote", text: buf.join("\n") });
    } else if (isTableRow(line) && i + 1 < lines.length && isSeparator(lines[i + 1])) {
      const rows = [splitRow(line)];
      i += 2;
      while (i < lines.length && isTableRow(lines[i])) rows.push(splitRow(lines[i++]));
      blocks.push({ t: "table", rows });
    } else if (bullet(line) || ordered(line)) {
      const kind = bullet(line) ? "ul" : "ol";
      const items: string[] = [];
      while (i < lines.length) {
        const l = lines[i];
        if ((kind === "ul" && bullet(l)) || (kind === "ol" && ordered(l))) {
          items.push(l.replace(/^\s*([-*]|\d+\.)\s+/, ""));
          i++;
        } else if (!l.trim()) {
          // Las listas pueden tener líneas en blanco entre elementos.
          let j = i;
          while (j < lines.length && !lines[j].trim()) j++;
          if (j < lines.length && ((kind === "ul" && bullet(lines[j])) || (kind === "ol" && ordered(lines[j])))) i = j;
          else break;
        } else if (/^\s+\S/.test(l) && !special(l.trim())) {
          items[items.length - 1] += "\n" + l.trim();
          i++;
        } else break;
      }
      blocks.push({ t: kind, items });
    } else {
      const buf: string[] = [];
      while (i < lines.length && lines[i].trim() && !special(lines[i])) buf.push(lines[i++]);
      if (buf.length) blocks.push({ t: "p", text: buf.join("\n") });
      else i++;
    }
  }
  return blocks;
}

export function RichText({ text }: { text: string }) {
  const blocks = parse(text.trim());
  return (
    <div className="space-y-4 text-[0.9375rem] leading-relaxed">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h":
            return b.level === 2 ? (
              <h2 key={i} className="display pt-4 text-3xl">
                {inline(b.text)}
              </h2>
            ) : (
              <h3 key={i} className="pt-2 text-lg font-bold">
                {inline(b.text)}
              </h3>
            );
          case "code":
            return <CodeBlock key={i} code={b.text} />;
          case "quote":
            return (
              <blockquote key={i} className="border-l-4 border-accent bg-accent-soft/40 py-2 pr-3 pl-4 whitespace-pre-line">
                {inline(b.text)}
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-1.5 pl-5">
                {b.items.map((it, j) => (
                  <li key={j} className="whitespace-pre-line">
                    {inline(it)}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal space-y-1.5 pl-5">
                {b.items.map((it, j) => (
                  <li key={j} className="whitespace-pre-line">
                    {inline(it)}
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-lg border border-hairline">
                <table className="w-full min-w-[32rem] border-collapse text-sm">
                  <thead className="bg-sidebar text-left">
                    <tr>
                      {b.rows[0].map((c, j) => (
                        <th key={j} className="border-b border-hairline px-3 py-2 font-semibold">
                          {inline(c)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.slice(1).map((r, j) => (
                      <tr key={j} className="border-b border-hairline last:border-b-0">
                        {r.map((c, k) => (
                          <td key={k} className="px-3 py-2 align-top">
                            {inline(c)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return (
              <p key={i} className="break-words whitespace-pre-line">
                {inline(b.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
