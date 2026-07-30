import { artworks, aspectRatio } from "@/db/schema";

export type ArtworkRatio = typeof aspectRatio.enumValues[number]
export type Artwork = typeof artworks.$inferSelect
export type NewArtwork = typeof artworks.$inferInsert
export type UpdatedArtwork = Partial<Omit<Artwork, "id">>