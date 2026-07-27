import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { artworks } from "./artworks";

export const artworksImages = pgTable("artwork_image", {
  id: uuid("id").primaryKey().defaultRandom(),
  artworkId: uuid("artwork_id").references(() => artworks.id, {
    onDelete: "cascade",
  }),
  imageUrl: text("image_url").notNull(),
});
