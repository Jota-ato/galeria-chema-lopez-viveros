import { collections, collectionStatus } from "@/db/schema";
import { Artwork } from "@/features/artworks/types/artworks.types";
import { Category } from "@/features/categories/types/categories.types";

export type CollectionStatus = (typeof collectionStatus.enumValues)[number];

export type Collection = typeof collections.$inferSelect
export type CollectionWithArtworksCount = Collection & { artworksCount: number };
export type NewCollection = typeof collections.$inferInsert;
export type FullCollection = Collection & {
    artworks: Artwork[]
    categories: Category[]
}
