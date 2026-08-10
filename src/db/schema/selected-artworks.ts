import { pgTable, uuid } from "drizzle-orm/pg-core";
import { artworks } from "./artworks";

export const selectedArtworks = pgTable("selected_artworks", {
  id: uuid("id").primaryKey().defaultRandom(),
  artworkId: uuid("artwork_id")
    .notNull()
    .references(() => artworks.id, { onDelete: "cascade" }),
});
