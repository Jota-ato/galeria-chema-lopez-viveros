CREATE TABLE "artwork_image" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"artwork_id" uuid,
	"image_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "artworks_to_category" (
	"artwork_id" uuid,
	"category_id" uuid
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "collection_to_category" (
	"collection_id" uuid,
	"category_id" uuid
);
--> statement-breakpoint
ALTER TABLE "artwork_image" ADD CONSTRAINT "artwork_image_artwork_id_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "artwork"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "artworks_to_category" ADD CONSTRAINT "artworks_to_category_artwork_id_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "artwork"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "artworks_to_category" ADD CONSTRAINT "artworks_to_category_category_id_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "collection_to_category" ADD CONSTRAINT "collection_to_category_collection_id_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "collection_to_category" ADD CONSTRAINT "collection_to_category_category_id_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE;