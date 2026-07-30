import { artworksRepository, IArtworksRepository } from "./artworks-repository";

class ArworksService {
  constructor(private artworksRepository: IArtworksRepository) {}
  
  async getLastArtworks(limit: number, page: number) {
    return await this.artworksRepository.getLast(limit, page);
  }
}

export const artworksService = new ArworksService(artworksRepository);