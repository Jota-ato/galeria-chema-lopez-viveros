import { artworksRepository, IArtworksRepository } from "./artworks-repository";

class ArworksService {
  constructor(private artworksRepository: IArtworksRepository) {}
  
  async getLastArtworks(limit: number, page: number) {
    return await this.artworksRepository.getLatest(limit, page);
  }

  async getArtworkBySlug(slug: string) {
    return await this.artworksRepository.getBySlug(slug);
  }
}

export const artworksService = new ArworksService(artworksRepository);