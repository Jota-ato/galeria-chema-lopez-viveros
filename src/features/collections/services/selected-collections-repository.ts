import { db } from "@/db";
import { selectedCollections } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  NewSelectedCollection,
  SelectedCollection,
} from "../types/collections.types";

export interface ISelectedCollectionsRepository {
  insert(data: NewSelectedCollection): Promise<void>;
  updatePosition(collectionId: string, position: number): Promise<void>;
  delete(collectionId: string): Promise<void>;
  getAll(): Promise<SelectedCollection[]>;
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

  async getAll(): Promise<SelectedCollection[]> {
    return await db.query.selectedCollections.findMany({
      orderBy: (selectedCollection, { asc }) =>
        asc(selectedCollection.position),
    });
  }

  async syncAll(data: NewSelectedCollection[]): Promise<void> {
    await db.delete(selectedCollections);
    if (data.length) await db.insert(selectedCollections).values(data);
  }
}

export const selectedCollectionsRepository =
  new SelectedCollectionsRepository();
