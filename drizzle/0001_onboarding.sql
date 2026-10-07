CREATE TABLE "board" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"author_id" text NOT NULL,
	"board_id" text NOT NULL,
	"kind" text DEFAULT 'post' NOT NULL,
	"status" text DEFAULT 'published' NOT NULL,
	"title" text,
	"body" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_board" (
	"user_id" text NOT NULL,
	"board_id" text NOT NULL,
	CONSTRAINT "user_board_user_id_board_id_pk" PRIMARY KEY("user_id","board_id")
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "onboarded" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "level" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "business_type" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "team_size" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_board_id_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."board"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_board" ADD CONSTRAINT "user_board_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_board" ADD CONSTRAINT "user_board_board_id_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."board"("id") ON DELETE cascade ON UPDATE no action;