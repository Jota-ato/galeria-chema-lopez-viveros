import { db } from "@/db";
import { selectedArtworks } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  FeaturedArtwork,
  FeaturedArtworkDetailed,
  NewSelectedArtwork,
} from "../types/artworks.types";

export interface ISelectedArtworksRepository {
  insert(data: NewSelectedArtwork): Promise<void>;
  updatePosition(artworkId: string, position: number): Promise<void>;
  delete(artworkId: string): Promise<void>;
  getAll(full: true): Promise<FeaturedArtworkDetailed[]>;
  getAll(full?: false): Promise<FeaturedArtwork[]>;
  syncAll(data: NewSelectedArtwork[]): Promise<void>;
}

class SelectedArtworksRepository implements ISelectedArtworksRepository {
  async insert(data: NewSelectedArtwork): Promise<void> {
    await db.insert(selectedArtworks).values(data);
  }

  async updatePosition(artworkId: string, position: number): Promise<void> {
    await db
      .update(selectedArtworks)
      .set({ position })
      .where(eq(selectedArtworks.artworkId, artworkId));
  }

  async delete(artworkId: string): Promise<void> {
    await db
      .delete(selectedArtworks)
      .where(eq(selectedArtworks.artworkId, artworkId));
  }

  async getAll(full: true): Promise<FeaturedArtworkDetailed[]>;
  async getAll(full?: false): Promise<FeaturedArtwork[]>;
  async getAll(
    full?: boolean,
  ): Promise<FeaturedArtwork[] | FeaturedArtworkDetailed[]> {
    const result = await db.query.selectedArtworks.findMany({
      orderBy: (selectedArtwork, { asc }) =>
        asc(selectedArtwork.position),
      with: {
        artwork: {
          with: full
            ? {
                images: true,
                collection: true,
              }
            : undefined,
        },
      },
    });
    return result as FeaturedArtwork[] | FeaturedArtworkDetailed[];
  }

  async syncAll(data: NewSelectedArtwork[]): Promise<void> {
    await db.delete(selectedArtworks);
    if (data.length) await db.insert(selectedArtworks).values(data);
  }
}

export const selectedArtworksRepository =
  new SelectedArtworksRepository();