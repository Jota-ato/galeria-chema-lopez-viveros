import { Collection, FeaturedCollection, FeaturedCollectionDetailed, NewSelectedCollection } from "../types/collections.types";
import {
  ISelectedCollectionsRepository,
  selectedCollectionsRepository,
} from "./selected-collections-repository";

class SelectedCollectionsService {
  constructor(
    private selectedCollectionsRepository: ISelectedCollectionsRepository,
  ) {}

  async getFeaturedCollections(full: true): Promise<FeaturedCollectionDetailed[]>;  
  async getFeaturedCollections(full?: false): Promise<FeaturedCollection[]>;
  async getFeaturedCollections(
    full?: boolean,
  ): Promise<FeaturedCollection[] | FeaturedCollectionDetailed[]> {
    if (full) {
      return await this.selectedCollectionsRepository.getAll(true);
    }
    
    return await this.selectedCollectionsRepository.getAll(false);
  }

  async updateFeaturedCollections(collections: Collection[]): Promise<void> {
    const newSelectedCollections: NewSelectedCollection[] = collections.map(
      (collection, idx) => ({
        collectionId: collection.id,
        position: idx + 1,
      }),
    );

    await this.selectedCollectionsRepository.syncAll(newSelectedCollections);
  }
}

export const selectedCollectionsService = new SelectedCollectionsService(
  selectedCollectionsRepository,
);
