import { db } from "@/db";
import { Collection, NewCollection } from "../types/collections.types";
import { collections } from "@/db/schema";

export interface IColectionRepository {
  insert: (collection: NewCollection) => Promise<Collection>;
  getBySlug: (slug: string) => Promise<Collection | null>;
  getById: (id: string) => Promise<Collection | null>;
}

class CollectionRepository implements IColectionRepository {
  async insert(collection: NewCollection): Promise<Collection> {
    const [inserted] = await db.insert(collections).values(collection).returning();
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
}

export const collectionRepository = new CollectionRepository();
