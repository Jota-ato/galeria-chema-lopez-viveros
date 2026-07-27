import { pgTable, uuid } from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { collections } from "./collections";

export const collectionToCategory = pgTable("collection_to_category", {
  collectionId: uuid("collection_id").references(() => collections.id, {
    onDelete: "cascade",
  }),
  categoryId: uuid("category_id").references(() => categories.id, {
    onDelete: "cascade",
  }),
});
