import { artworks, artworksImages, aspectRatio } from "@/db/schema";

export type ArtworkRatio = (typeof aspectRatio.enumValues)[number];
export type Artwork = typeof artworks.$inferSelect;
export type NewArtwork = typeof artworks.$inferInsert;
export type UpdatedArtwork = Partial<Omit<Artwork, "id">>;
export type ArtworkImages = typeof artworksImages.$inferInsert;

export type ArtworkWithImages = Artwork & {
  images: ArtworkImages[];
};

export interface FeaturedArtwork {
  id: string;
  position: number;
  artworkId: string;
  artwork: Artwork;
}

export interface FeaturedArtworkDetailed extends FeaturedArtwork {
  artwork: Artwork & {
    images?: { id: string; imageUrl: string }[];
    collection?: { id: string; name: string } | null;
  };
}

export interface NewSelectedArtwork {
  artworkId: string;
  position: number;
}
