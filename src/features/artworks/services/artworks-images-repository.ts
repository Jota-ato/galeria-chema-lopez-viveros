import { db } from "@/db";
import { artworksImages } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface IArtworksImagesRepository {
  insert(images: string[] | string, artworkId: string): Promise<void>;
  deleteByArtworkId(artworkId: string): Promise<void>;
}

class ArtworksImagesRepository implements IArtworksImagesRepository {
  async insert(images: string[] | string, artworkId: string): Promise<void> {
    const imagesArray = Array.isArray(images) ? images : [images];
    await db.insert(artworksImages).values(
      imagesArray.map((image) => ({
        imageUrl: image,
        artworkId,
      })),
    );
  }

  async deleteByArtworkId(artworkId: string): Promise<void> {
    await db
      .delete(artworksImages)
      .where(eq(artworksImages.artworkId, artworkId));
  }
}

export const artworksImagesRepository = new ArtworksImagesRepository();
