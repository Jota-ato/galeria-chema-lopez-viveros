-- 1. Elimina la FK antes de cambiar cualquier tipo
ALTER TABLE "artwork" DROP CONSTRAINT "artwork_collection_id_collection_id_fkey";--> statement-breakpoint

-- 2. Convierte la tabla padre
ALTER TABLE "collection" ALTER COLUMN "id" SET DATA TYPE uuid USING "id"::uuid;--> statement-breakpoint
ALTER TABLE "collection" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "collection" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint

-- 3. Convierte la tabla hija (PK propia y luego la FK)
ALTER TABLE "artwork" ALTER COLUMN "id" SET DATA TYPE uuid USING "id"::uuid;--> statement-breakpoint
ALTER TABLE "artwork" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "artwork" ALTER COLUMN "collection_id" SET DATA TYPE uuid USING "collection_id"::uuid;--> statement-breakpoint
ALTER TABLE "artwork" ALTER COLUMN "image_url" SET NOT NULL;--> statement-breakpoint

-- 4. Vuelve a crear la FK, ya con ambos lados en uuid
ALTER TABLE "artwork" ADD CONSTRAINT "artwork_collection_id_collection_id_fkey"
  FOREIGN KEY ("collection_id") REFERENCES "collection"("id");