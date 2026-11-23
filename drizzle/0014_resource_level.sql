ALTER TABLE "resource" ADD COLUMN "level" text DEFAULT 'principiante' NOT NULL;
--> statement-breakpoint
UPDATE "resource" SET "level" = 'intermedio' WHERE "slug" IN ('videos-animados-claude','skills-claude-guia','mods-claude-guia','contexto-claude','sistema-administracion','ag-finance','edita-videos-claude-code','diseno-mejora-webs-claude','harvey-agente-correos','photocraft-photoshop-gratis','ai-job-search-claude-code','find-skills-claude-code','llm-council-claude','markitdown-claude','moneyprinterturbo-videos','youdash-youtube-carplay','claude-solidcraft-cad');
--> statement-breakpoint
UPDATE "resource" SET "level" = 'avanzado' WHERE "slug" IN ('mcp-agente-programacion','cua-computador-agente');
