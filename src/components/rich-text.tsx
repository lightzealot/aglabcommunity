import { Fragment } from "react";

/** Texto de guías con formato mínimo: `## Título`, listas con `- `, **negrita** y enlaces https. */
function inline(text: string) {
  // Se parte por negritas y por enlaces; todo lo demás es texto plano (React lo escapa).
  const parts = text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s<>"']+)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer nofollow ugc" className="break-all text-accent underline">
          {part}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function RichText({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <div className="space-y-4 text-[0.9375rem] leading-relaxed">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (lines[0].startsWith("## ")) {
          return (
            <Fragment key={i}>
              <h2 className="display pt-2 text-3xl">{lines[0].slice(3)}</h2>
              {lines.length > 1 && <p className="whitespace-pre-line">{inline(lines.slice(1).join("\n"))}</p>}
            </Fragment>
          );
        }
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="list-disc space-y-1 pl-5">
              {lines.map((l, j) => (
                <li key={j}>{inline(l.slice(2))}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="break-words whitespace-pre-line">
            {inline(block)}
          </p>
        );
      })}
    </div>
  );
}
