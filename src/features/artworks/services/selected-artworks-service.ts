import { Artwork, FeaturedArtwork, FeaturedArtworkDetailed, NewSelectedArtwork } from "../types/artworks.types";
import {
  ISelectedArtworksRepository,
  selectedArtworksRepository,
} from "./selected-artworks-repository";

class SelectedArtworksService {
  constructor(
    private selectedArtworksRepository: ISelectedArtworksRepository,
  ) {}

  async getFeaturedArtworks(full: true): Promise<FeaturedArtworkDetailed[]>;  
  async getFeaturedArtworks(full?: false): Promise<FeaturedArtwork[]>;
  async getFeaturedArtworks(
    full?: boolean,
  ): Promise<FeaturedArtwork[] | FeaturedArtworkDetailed[]> {
    if (full) {
      return await this.selectedArtworksRepository.getAll(true);
    }

    return await this.selectedArtworksRepository.getAll(false);
  }

  async updateFeaturedArtworks(artworks: Artwork[]): Promise<void> {
    const newSelectedArtworks: NewSelectedArtwork[] = artworks.map(
      (artwork, idx) => ({
        artworkId: artwork.id,
        position: idx + 1,
      }),
    );

    await this.selectedArtworksRepository.syncAll(newSelectedArtworks);
  }
}

export const selectedArtworksService = new SelectedArtworksService(
  selectedArtworksRepository,
);