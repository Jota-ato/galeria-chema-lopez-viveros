import { defineRelations } from "drizzle-orm";
import * as schema from "./index";

export const relations = defineRelations(schema, (r) => ({
  collections: {
    artworks: r.many.artworks({
      from: r.collections.id,
      to: r.artworks.collectionId,
    }),
    categories: r.many.collectionToCategory({
      from: r.collections.id,
      to: r.collectionToCategory.collectionId,
    }),
    selectedCollections: r.many.selectedCollections({
      from: r.collections.id,
      to: r.selectedCollections.collectionId,
    })
  },
  artworks: {
    collection: r.one.collections({
      from: r.artworks.collectionId,
      to: r.collections.id,
    }),
    images: r.many.artworksImages({
      from: r.artworks.id,
      to: r.artworksImages.artworkId,
    }),
    categories: r.many.artworksToCategory({
      from: r.artworks.id,
      to: r.artworksToCategory.artworkId,
    }),
    selectedArtworks: r.many.selectedArtworks({
      from: r.artworks.id,
      to: r.selectedArtworks.artworkId,
    })
  },
  users: {
    sessions: r.many.sessions({
      from: r.users.id,
      to: r.sessions.userId,
    }),
    accounts: r.many.accounts({
      from: r.users.id,
      to: r.accounts.userId,
    }),
  },
  sessions: {
    user: r.one.users({
      from: r.sessions.userId,
      to: r.users.id,
    }),
  },
  accounts: {
    user: r.one.users({
      from: r.accounts.userId,
      to: r.users.id,
    }),
  },
}));
