import { AppError } from "@/shared/lib/errors";
import { CollectionInput } from "../schemas/collection-schema";
import {
  collectionRepository,
  IColectionRepository,
} from "./collections-repository";
import { Collection } from "../types/collections.types";
import {
  artworksRepository,
  IArtworksRepository,
} from "@/features/artworks/services/artworks-repository";

class CollectionsService {
  constructor(
    private collectionRepository: IColectionRepository,
    private artworksRepository: IArtworksRepository,
  ) {}

  async createCollection(data: CollectionInput): Promise<Collection> {
    const dbCollection = await this.getCollectionBySlug(data.slug);

    if (dbCollection)
      throw new AppError(
        "Ya existe una colección con ese slug, prueba un nombre distinto",
      );

    return await this.collectionRepository.insert(data);
  }

  async getCollectionBySlug(slug: string): Promise<Collection | null> {
    return await this.collectionRepository.getBySlug(slug);
  }

  async addArtworksToCollection(collectionId: string, artworksIds: string[]) {
    const dbCollection = await this.collectionRepository.getById(collectionId);

    if (!dbCollection) throw new AppError("Colección no encontrada");

    const artworks = await Promise.all(
      artworksIds.map(
        async (artworkId) => await this.artworksRepository.getById(artworkId),
      ),
    );

    const safeArtworks = artworks.filter(
      (artwork) => artwork !== null,
    ) as NonNullable<(typeof artworks)[number]>[];

    if (safeArtworks.length !== artworksIds.length) {
      throw new AppError("Algunas obras no fueron encontradas");
    }

    const updatedArtworks = await Promise.all(
      safeArtworks.map(
        async (artwork) =>
          await this.artworksRepository.update(
            {
              ...artwork,
              collectionId: dbCollection.id,
            },
            artwork.slug,
          ),
      ),
    );

    return updatedArtworks;
  }
}

export const collectionsService = new CollectionsService(
  collectionRepository,
  artworksRepository,
);
