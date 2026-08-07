import { collections, collectionStatus } from "@/db/schema";

export type CollectionStatus = (typeof collectionStatus.enumValues)[number];

export type Collection = typeof collections.$inferSelect
export type CollectionWithArtworksCount = Collection & { artworksCount: number };
export type NewCollection = typeof collections.$inferInsert;
