import { collections, collectionStatus } from "@/db/schema";

export type CollectionStatus = (typeof collectionStatus.enumValues)[number];

export type Collection = typeof collections.$inferSelect;
export type NewCollection = typeof collections.$inferInsert;
