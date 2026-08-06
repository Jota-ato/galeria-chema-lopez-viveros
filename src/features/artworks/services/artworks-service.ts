import { generateSlug } from "@/shared/lib/slug";
import { ArtworkInput } from "../schema/artwork-schema";
import { Artwork, NewArtwork } from "../types/artworks.types";
import {
  artworksImagesRepository,
  IArtworksImagesRepository,
} from "./artworks-images-repository";
import { artworksRepository, IArtworksRepository } from "./artworks-repository";
import { AppError } from "@/shared/lib/errors";

class ArworksService {
  constructor(
    private artworksRepository: IArtworksRepository,
    private artworksImagesRepository: IArtworksImagesRepository,
  ) {}

  async getLastArtworks(limit: number, page: number) {
    return await this.artworksRepository.getLatest(limit, page);
  }

  async getArtworkBySlug(slug: string) {
    return await this.artworksRepository.getBySlug(slug);
  }

  async insertArtwork(
    data: ArtworkInput,
    images: {
      imageUrl: string;
      extraImages: string[];
    },
  ): Promise<Artwork> {
    const slug = generateSlug(data.title);

    const existingArtwork = await this.artworksRepository.getBySlug(slug);
    if (existingArtwork) {
      throw new AppError("Ya existe una obra con este título");
    }

    const payload: NewArtwork = {
      ...data,
      imageUrl: images.imageUrl,
      slug,
      price: data.price.toString(),
    };
    const artwork = await this.artworksRepository.insert(payload);
    if (images.extraImages.length) {
      await this.insertArtworkExtraImages(images.extraImages, artwork.id);
    }
    return artwork;
  }

  async editArtwork(
    data: ArtworkInput,
    images: {
      imageUrl: string;
      extraImages: string[];
    },
    slug: string
  ) {
    const dbArtwork = await this.artworksRepository.getBySlug(slug);
    if (!dbArtwork) {
      throw new AppError("No se encontró la obra");
    }

    const payload: NewArtwork = {
      ...data,
      imageUrl: images.imageUrl,
      slug,
      price: data.price.toString(),
    };
    const artwork = await this.artworksRepository.update(payload, slug);
    if (dbArtwork.images.length) {
      await this.artworksImagesRepository.deleteByArtworkId(artwork.id);
    }
    if (images.extraImages.length) {
      await this.insertArtworkExtraImages(images.extraImages, artwork.id);
    }
    return artwork;
  }

  async insertArtworkExtraImages(images: string[] | string, artworkId: string) {
    await this.artworksImagesRepository.insert(images, artworkId);
  }
}

export const artworksService = new ArworksService(
  artworksRepository,
  artworksImagesRepository,
);
