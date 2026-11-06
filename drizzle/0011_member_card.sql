ALTER TABLE "user" ADD COLUMN "handle" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "card_theme" text DEFAULT 'dark' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "country" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "socials" jsonb;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_handle_unique" UNIQUE("handle");