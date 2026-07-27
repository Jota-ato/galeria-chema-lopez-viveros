CREATE TYPE "artworks_status" AS ENUM('on_sale', 'reserved', 'sold', 'exhibition_only');--> statement-breakpoint
ALTER TABLE "artwork" ADD COLUMN "price" numeric(10,2) NOT NULL;--> statement-breakpoint
ALTER TABLE "artwork" ADD COLUMN "status" "artworks_status" DEFAULT 'on_sale'::"artworks_status" NOT NULL;