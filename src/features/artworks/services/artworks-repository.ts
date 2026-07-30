import { db } from "@/db";
import { Artwork } from "../types/artworks.types";

export interface IArtworksRepository {
  getLast: (limit: number, page: number) => Promise<Artwork[]>;
}

class ArtworksRepository implements IArtworksRepository {
  async getLast(limit: number, page: number): Promise<Artwork[]> {
    return await db.query.artworks.findMany({
      orderBy: (artwork, { desc }) => desc(artwork.createdAt),
      limit,
      offset: (page - 1) * limit,
    });
  }
}

export const artworksRepository = new ArtworksRepository();
