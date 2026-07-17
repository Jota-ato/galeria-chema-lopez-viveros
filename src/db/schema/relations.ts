import { defineRelations } from "drizzle-orm";
import { artworks } from "./artworks";
import { collections } from "./collections";

export const collectionsRelations = defineRelations({ collections, artworks }, (r) => ({
    collections: {
        artworks: r.many.artworks({
            from: r.collections.id,
            to: r.artworks.collectionId,
        }),
    },
    artworks: {
        collection: r.one.collections({
            from: r.artworks.collectionId,
            to: r.collections.id,
        }),
    },
}));