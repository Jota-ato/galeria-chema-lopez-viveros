import { pgTable, uuid } from "drizzle-orm/pg-core";
import { collections } from "./collections";

export const selectedCollections = pgTable("selected_collections", {
  id: uuid("id").primaryKey().defaultRandom(),
  collectionId: uuid("collection_id")
    .notNull()
    .references(() => collections.id, { onDelete: "cascade" }),
});
