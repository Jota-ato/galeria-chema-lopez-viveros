import {
  collectionRepository,
  IColectionRepository,
} from "./collections-repository";

class CollectionsService {
  constructor(private collectionRepository: IColectionRepository) {}
}

export const collectionsService = new CollectionsService(collectionRepository);
