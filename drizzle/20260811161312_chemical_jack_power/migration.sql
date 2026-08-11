ALTER TABLE "selected_artworks" ADD COLUMN "position" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "selected_artworks" ADD CONSTRAINT "selected_artworks_position_key" UNIQUE("position");