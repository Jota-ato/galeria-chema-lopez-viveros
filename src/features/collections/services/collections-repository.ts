import { db } from "@/db";
import {
  Collection,
  CollectionWithArtworksCount,
  NewCollection,
} from "../types/collections.types";
import { artworks, collections } from "@/db/schema";
import { count, eq, getColumns } from "drizzle-orm";

export interface IColectionRepository {
  insert: (collection: NewCollection) => Promise<Collection>;
  getBySlug: (slug: string) => Promise<Collection | null>;
  getById: (id: string) => Promise<Collection | null>;
  getAll: (
    limit: number,
    page: number,
  ) => Promise<CollectionWithArtworksCount[]>;
  getTotalCount: () => Promise<number>;
}

class CollectionRepository implements IColectionRepository {
  async insert(collection: NewCollection): Promise<Collection> {
    const [inserted] = await db
      .insert(collections)
      .values(collection)
      .returning();
    return inserted;
  }

  async getBySlug(slug: string): Promise<Collection | null> {
    return (
      (await db.query.collections.findFirst({
        where: { slug },
      })) || null
    );
  }

  async getById(id: string): Promise<Collection | null> {
    return (
      (await db.query.collections.findFirst({
        where: { id },
      })) || null
    );
  }

  async getAll(
    limit: number,
    page: number,
  ): Promise<CollectionWithArtworksCount[]> {
    const offset = (page - 1) * limit;

    const result = await db
      .select({
        ...getColumns(collections),
        artworksCount: count(artworks.id),
      })
      .from(collections)
      .leftJoin(artworks, eq(artworks.collectionId, collections.id))
      .groupBy(collections.id)
      .limit(limit)
      .offset(offset);

    return result;
  }

  async getTotalCount(): Promise<number> {
    return await db.$count(collections);
  }
}

export const collectionRepository = new CollectionRepository();
