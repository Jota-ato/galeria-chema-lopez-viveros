"use server"

import { adminAction } from "@/shared/lib/actions"
import { Artwork } from "../types/artworks.types"
import { selectedArtworksService } from "../services/selected-artworks-service"

export const syncSelectedArtworksAction = adminAction(async (artworks: Artwork[]) => {
    await selectedArtworksService.updateFeaturedArtworks(artworks)

    return "Obras destacadas actualizadas correctamente"
})