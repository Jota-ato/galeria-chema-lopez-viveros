ALTER TABLE "artwork" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "artwork" ALTER COLUMN "aspect_ratio" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "artwork" ALTER COLUMN "width" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "artwork" ALTER COLUMN "height" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "collection" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "artwork" ADD CONSTRAINT "artwork_slug_key" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "category" ADD CONSTRAINT "category_slug_key" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "collection" ADD CONSTRAINT "collection_slug_key" UNIQUE("slug");