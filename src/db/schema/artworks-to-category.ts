import { pgTable, uuid } from "drizzle-orm/pg-core";
import { artworks } from "./artworks";
import { categories } from "./categories";

export const artworksToCategory = pgTable("artworks_to_category", {
  artworkId: uuid("artwork_id").references(() => artworks.id, {
    onDelete: "cascade",
  }),
  categoryId: uuid("category_id").references(() => categories.id, {
    onDelete: "cascade",
  }),
});
