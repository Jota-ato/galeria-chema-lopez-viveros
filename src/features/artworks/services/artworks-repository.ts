import { db } from "@/db";
import { Artwork } from "../types/artworks.types";

export interface IArtworksRepository {
  getLatest: (limit: number, page: number) => Promise<Artwork[]>;
  getBySlug: (slug: string) => Promise<Artwork | null>;
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
}

export const artworksRepository = new ArtworksRepository();
