import { integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { collections } from "./collections";

export const selectedCollections = pgTable("selected_collections", {
  id: uuid("id").primaryKey().defaultRandom(),
  position: integer("position").notNull().unique(),
  collectionId: uuid("collection_id")
    .notNull()
    .references(() => collections.id, { onDelete: "cascade" }),
});
