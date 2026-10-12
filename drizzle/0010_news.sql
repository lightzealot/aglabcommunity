CREATE TABLE "news" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"day" text NOT NULL,
	"title" text NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"url" text NOT NULL,
	"source" text NOT NULL,
	"image_url" text,
	"published_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "news_day_unique" UNIQUE("day"),
	CONSTRAINT "news_url_unique" UNIQUE("url")
);
