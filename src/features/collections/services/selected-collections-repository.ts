import { db } from "@/db";
import { selectedCollections } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  FeaturedCollection,
  FeaturedCollectionDetailed,
  NewSelectedCollection,
} from "../types/collections.types";

export interface ISelectedCollectionsRepository {
  insert(data: NewSelectedCollection): Promise<void>;
  updatePosition(collectionId: string, position: number): Promise<void>;
  delete(collectionId: string): Promise<void>;
  getAll(full: true): Promise<FeaturedCollectionDetailed[]>;
  getAll(full?: false): Promise<FeaturedCollection[]>;
  syncAll(data: NewSelectedCollection[]): Promise<void>;
}

class SelectedCollectionsRepository implements ISelectedCollectionsRepository {
  async insert(data: NewSelectedCollection): Promise<void> {
    await db.insert(selectedCollections).values(data);
  }

  async updatePosition(collectionId: string, position: number): Promise<void> {
    await db
      .update(selectedCollections)
      .set({ position })
      .where(eq(selectedCollections.collectionId, collectionId));
  }

  async delete(collectionId: string): Promise<void> {
    await db
      .delete(selectedCollections)
      .where(eq(selectedCollections.collectionId, collectionId));
  }

  async getAll(full: true): Promise<FeaturedCollectionDetailed[]>;
  async getAll(full?: false): Promise<FeaturedCollection[]>;
  async getAll(
    full?: boolean,
  ): Promise<FeaturedCollection[] | FeaturedCollectionDetailed[]> {
    const result = await db.query.selectedCollections.findMany({
      orderBy: (selectedCollection, { asc }) =>
        asc(selectedCollection.position),
      with: {
        collection: {
          with: full
            ? {
                artworks: true,
                categories: true,
              }
            : undefined,
        },
      },
    });
    return result as FeaturedCollection[] | FeaturedCollectionDetailed[];
  }

  async syncAll(data: NewSelectedCollection[]): Promise<void> {
    await db.delete(selectedCollections);
    if (data.length) await db.insert(selectedCollections).values(data);
  }
}

export const selectedCollectionsRepository =
  new SelectedCollectionsRepository();
