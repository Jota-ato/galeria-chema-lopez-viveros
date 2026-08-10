CREATE TABLE "selected_artworks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"artwork_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "selected_collections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"collection_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "selected_artworks" ADD CONSTRAINT "selected_artworks_artwork_id_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "artwork"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "selected_collections" ADD CONSTRAINT "selected_collections_collection_id_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE CASCADE;