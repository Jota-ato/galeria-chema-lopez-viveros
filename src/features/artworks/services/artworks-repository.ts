import { db } from "@/db";
import {
  Artwork,
  ArtworkWithImages,
  NewArtwork,
  UpdatedArtwork,
} from "../types/artworks.types";
import { artworks } from "@/db/schema/artworks";
import { eq } from "drizzle-orm";

export interface IArtworksRepository {
  getLatest(limit: number, page: number): Promise<Artwork[]>;
  getBySlug(slug: string): Promise<ArtworkWithImages | null>;
  getById(id: string): Promise<ArtworkWithImages | null>;
  insert(data: NewArtwork): Promise<Artwork>;
  update(data: UpdatedArtwork, slug: string): Promise<Artwork>;
  delete(slug: string): Promise<void>;
  deleteByCollectionId(collectionId: string): Promise<void>;
  updateByCollectionId(
    data: UpdatedArtwork,
    collectionId: string,
  ): Promise<Artwork[]>;
  search(query: string): Promise<ArtworkWithImages[]>;
}

class ArtworksRepository implements IArtworksRepository {
  async getLatest(limit: number, page: number): Promise<Artwork[]> {
    return await db.query.artworks.findMany({
      orderBy: (artwork, { desc }) => desc(artwork.createdAt),
      limit,
      offset: (page - 1) * limit,
    });
  }

  async getBySlug(slug: string): Promise<ArtworkWithImages | null> {
    return (
      (await db.query.artworks.findFirst({
        where: { slug },
        with: {
          images: true,
        },
      })) || null
    );
  }

  async getById(id: string): Promise<ArtworkWithImages | null> {
    return (
      (await db.query.artworks.findFirst({
        where: { id },
        with: {
          images: true,
        },
      })) || null
    );
  }

  async insert(data: NewArtwork): Promise<Artwork> {
    return (await db.insert(artworks).values(data).returning())[0];
  }

  async update(data: UpdatedArtwork, slug: string): Promise<Artwork> {
    return (
      await db
        .update(artworks)
        .set(data)
        .where(eq(artworks.slug, slug))
        .returning()
    )[0];
  }

  async delete(slug: string): Promise<void> {
    await db.delete(artworks).where(eq(artworks.slug, slug));
  }

  async deleteByCollectionId(collectionId: string): Promise<void> {
    await db.delete(artworks).where(eq(artworks.collectionId, collectionId));
  }

  async updateByCollectionId(
    data: UpdatedArtwork,
    collectionId: string,
  ): Promise<Artwork[]> {
    return await db
      .update(artworks)
      .set(data)
      .where(eq(artworks.collectionId, collectionId))
      .returning();
  }

  async search(query: string): Promise<ArtworkWithImages[]> {
    return await db.query.artworks.findMany({
      where: {
        title: { ilike: `%${query}%` },
      },
      with: {
        images: true,
      },
      limit: 10,
    });
  }
}

export const artworksRepository = new ArtworksRepository();
