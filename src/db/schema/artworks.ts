import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { collections } from "./collections";

export const artworks = pgTable("artwork", {
  id: text("id").primaryKey(),
  collectionId: text("collection_id")
    .references(() => collections.id, { onDelete: "set null" }),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  fullResolutionImageUrl: text("full_resolution_image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
