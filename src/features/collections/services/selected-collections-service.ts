import { NewSelectedCollection } from "../types/collections.types";
import {
  ISelectedCollectionsRepository,
  selectedCollectionsRepository,
} from "./selected-collections-repository";

class SelectedCollectionsService {
  constructor(
    private selectedCollectionsRepository: ISelectedCollectionsRepository,
  ) {}

  async updateFeaturedCollections(
    collections: { id: string; position: number }[],
  ): Promise<void> {
    const newSelectedCollections: NewSelectedCollection[] = collections.map(
      (collection) => ({
        collectionId: collection.id,
        position: collection.position,
      }),
    );

    await this.selectedCollectionsRepository.syncAll(newSelectedCollections);
  }
}

export const selectedCollectionsService = new SelectedCollectionsService(
  selectedCollectionsRepository,
);
