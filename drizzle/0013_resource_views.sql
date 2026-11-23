CREATE TABLE "resource_view" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resource_id" uuid NOT NULL,
	"viewer" text NOT NULL,
	"kind" text NOT NULL,
	"day" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "resource_view_unique" UNIQUE("resource_id","viewer","day")
);
--> statement-breakpoint
ALTER TABLE "resource_view" ADD CONSTRAINT "resource_view_resource_id_resource_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resource"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "resource_view_day_idx" ON "resource_view" USING btree ("resource_id","day");