import { AppError } from "@/shared/lib/errors";
import { CollectionInput } from "../schemas/collection-schema";
import {
  collectionRepository,
  IColectionRepository,
} from "./collections-repository";
import { Collection } from "../types/collections.types";

class CollectionsService {
  constructor(private collectionRepository: IColectionRepository) {}

  async createCollection(data: CollectionInput): Promise<void> {
    const dbCollection = await this.getCollectionBySlug(data.slug)

    if (dbCollection) throw new AppError("Ya existe una colección con ese slug, prueba un nombre distinto")

    await this.collectionRepository.insert(data);
  }

  async getCollectionBySlug(slug: string): Promise<Collection | null> {
    return await this.collectionRepository.getBySlug(slug);
  }
}

export const collectionsService = new CollectionsService(collectionRepository);
