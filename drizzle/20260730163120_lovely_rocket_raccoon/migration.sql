CREATE TYPE "aspect_ratio" AS ENUM('wide', 'landscape', 'portrait', 'vertical');--> statement-breakpoint
ALTER TABLE "artwork" ADD COLUMN "aspect_ratio" "aspect_ratio" DEFAULT 'wide'::"aspect_ratio" NOT NULL;--> statement-breakpoint
ALTER TABLE "artwork" ADD COLUMN "width" integer;--> statement-breakpoint
ALTER TABLE "artwork" ADD COLUMN "height" integer;