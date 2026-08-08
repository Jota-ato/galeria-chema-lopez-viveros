import { AppError } from "@/shared/lib/errors";
import { CollectionInput } from "../schemas/collection-schema";
import {
  collectionRepository,
  IColectionRepository,
} from "./collections-repository";
import {
  Collection,
  CollectionWithArtworksCount,
  FullCollection,
} from "../types/collections.types";
import {
  artworksRepository,
  IArtworksRepository,
} from "@/features/artworks/services/artworks-repository";
import { ArtworkImages, ArtworkWithImages } from "@/features/artworks/types/artworks.types";

class CollectionsService {
  constructor(
    private collectionRepository: IColectionRepository,
    private artworksRepository: IArtworksRepository,
  ) { }

  async createCollection(data: CollectionInput): Promise<Collection> {
    const dbCollection = await this.getCollectionBySlug(data.slug);

    if (dbCollection)
      throw new AppError(
        "Ya existe una colección con ese slug, prueba un nombre distinto",
      );

    return await this.collectionRepository.insert(data);
  }

  async updateCollection(data: CollectionInput, slug: string): Promise<Collection> {
    const dbCollection = await this.getCollectionBySlug(slug);

    if (!dbCollection) {
      throw new AppError("Colección no encontrada");
    }

    return await this.collectionRepository.update(data, slug);
  }

  async getCollectionBySlug(slug: string, full: true): Promise<FullCollection | null>
  async getCollectionBySlug(slug: string, full?: false): Promise<Collection | null>
  async getCollectionBySlug(slug: string, full: boolean = false): Promise<Collection | null> {
    return await this.collectionRepository.getBySlug(slug, full);
  }

  async addArtworksToCollection(collectionId: string, artworksIds: string[]) {
    const dbCollection = await this.collectionRepository.getById(collectionId);

    if (!dbCollection) throw new AppError("Colección no encontrada");

    const safeArtworks = await this.getSafeArtworks(artworksIds);

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

  async removeArtworksFromCollection(collectionId: string) {
    const dbCollection = await this.collectionRepository.getById(collectionId);

    if (!dbCollection) throw new AppError("Colección no encontrada");
    return await this.artworksRepository.updateByCollectionId(
      {
        collectionId: null,
      },
      collectionId,
    );
  }

  async updateArtworksFromCollection(collectionId: string, artworksIds: string[]) {
    const dbCollection = await this.collectionRepository.getById(collectionId);

    if (!dbCollection) throw new AppError("Colección no encontrada");
    await this.removeArtworksFromCollection(collectionId);
    await this.addArtworksToCollection(collectionId, artworksIds);
  }

  async getSafeArtworks(artworksIds: string[]): Promise<ArtworkWithImages[]> {
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
    return safeArtworks;
  }

  async getAllCollections(
    limit: number,
    page: number,
  ): Promise<{
    total: number;
    collections: CollectionWithArtworksCount[];
  }> {
    if (limit <= 0 || page <= 0) {
      throw new AppError("El límite y la página deben ser mayores a 0");
    }
    return {
      total: await this.collectionRepository.getTotalCount(),
      collections: await this.collectionRepository.getAll(limit, page),
    };
  }
}

export const collectionsService = new CollectionsService(
  collectionRepository,
  artworksRepository,
);
