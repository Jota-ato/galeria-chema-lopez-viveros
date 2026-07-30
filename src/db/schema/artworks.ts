import {
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  integer
} from "drizzle-orm/pg-core";
import { collections } from "./collections";

export const artworksStatus = pgEnum("artworks_status", [
  "on_sale",
  "reserved",
  "sold",
  "exhibition_only",
]);

export const aspectRatio = pgEnum("aspect_ratio", ["wide", "landscape", "portrait", "vertical"]);

export const artworks = pgTable("artwork", {
  id: uuid("id").primaryKey().defaultRandom(),
  collectionId: uuid("collection_id").references(() => collections.id, {
    onDelete: "set null",
  }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  aspectRatio: aspectRatio("aspect_ratio").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  fullResolutionImageUrl: text("full_resolution_image_url"),
  status: artworksStatus("status").default("on_sale").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
