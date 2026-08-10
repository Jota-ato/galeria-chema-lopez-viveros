import { Collection, NewSelectedCollection } from "../types/collections.types";
import {
  ISelectedCollectionsRepository,
  selectedCollectionsRepository,
} from "./selected-collections-repository";

class SelectedCollectionsService {
  constructor(
    private selectedCollectionsRepository: ISelectedCollectionsRepository,
  ) {}

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
