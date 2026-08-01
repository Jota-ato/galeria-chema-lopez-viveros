import { db } from "@/db";
import { Artwork, NewArtwork } from "../types/artworks.types";
import { artworks } from "@/db/schema/artworks";

export interface IArtworksRepository {
  getLatest(limit: number, page: number): Promise<Artwork[]>;
  getBySlug(slug: string): Promise<Artwork | null>;
  insert(data: NewArtwork): Promise<Artwork>;
}

class ArtworksRepository implements IArtworksRepository {
  async getLatest(limit: number, page: number): Promise<Artwork[]> {
    return await db.query.artworks.findMany({
      orderBy: (artwork, { desc }) => desc(artwork.createdAt),
      limit,
      offset: (page - 1) * limit,
    });
  }

  async getBySlug(slug: string): Promise<Artwork | null> {
    return (
      (await db.query.artworks.findFirst({
        where: { slug },
      })) || null
    );
  }

  async insert(data: NewArtwork): Promise<Artwork> {
    return (await db.insert(artworks).values(data).returning())[0];
  }
}

export const artworksRepository = new ArtworksRepository();
