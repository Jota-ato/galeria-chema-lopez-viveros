import { integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { artworks } from "./artworks";

export const selectedArtworks = pgTable("selected_artworks", {
  id: uuid("id").primaryKey().defaultRandom(),
  position: integer("position").notNull().unique(),
  artworkId: uuid("artwork_id")
    .notNull()
    .references(() => artworks.id, { onDelete: "cascade" }),
});
