ALTER TABLE "course" ADD COLUMN "slug" text;--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_slug_unique" UNIQUE("slug");--> statement-breakpoint
UPDATE "course" c SET "slug" = s.slug || CASE WHEN s.rn > 1 THEN '-' || s.rn ELSE '' END
FROM (
  SELECT id,
    COALESCE(NULLIF(trim(both '-' from regexp_replace(lower(translate("title", 'áéíóúüñÁÉÍÓÚÜÑ', 'aeiouunAEIOUUN')), '[^a-z0-9]+', '-', 'g')), ''), 'curso') AS slug,
    row_number() OVER (PARTITION BY COALESCE(NULLIF(trim(both '-' from regexp_replace(lower(translate("title", 'áéíóúüñÁÉÍÓÚÜÑ', 'aeiouunAEIOUUN')), '[^a-z0-9]+', '-', 'g')), ''), 'curso') ORDER BY "created_at") AS rn
  FROM "course"
) s
WHERE c.id = s.id;
