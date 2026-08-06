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
  insert(data: NewArtwork): Promise<Artwork>;
  update(data: UpdatedArtwork, slug: string): Promise<Artwork>;
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
}

export const artworksRepository = new ArtworksRepository();
