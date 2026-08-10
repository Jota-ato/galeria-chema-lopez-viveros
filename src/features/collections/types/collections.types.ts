import {
  collections,
  collectionStatus,
  selectedCollections,
} from "@/db/schema";
import { Artwork } from "@/features/artworks/types/artworks.types";
import { Category } from "@/features/categories/types/categories.types";

export type CollectionStatus = (typeof collectionStatus.enumValues)[number];

export type Collection = typeof collections.$inferSelect;
export type CollectionWithArtworksCount = Collection & {
  artworksCount: number;
};
export type NewCollection = typeof collections.$inferInsert;
export type UpdateCollection = Partial<Omit<Collection, "id">>;
export type FullCollection = Collection & {
  artworks: Artwork[];
  categories: Category[];
};

export type SelectedCollection = typeof selectedCollections.$inferSelect;
export type NewSelectedCollection = typeof selectedCollections.$inferInsert;
export type FeaturedCollection = SelectedCollection & {
  collection: Collection;
};

export type FeaturedCollectionDetailed = SelectedCollection & {
  collection: FullCollection;
};
