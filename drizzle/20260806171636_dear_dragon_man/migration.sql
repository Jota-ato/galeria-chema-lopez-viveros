CREATE TYPE "collection_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
ALTER TABLE "collection" ADD COLUMN "status" "collection_status";