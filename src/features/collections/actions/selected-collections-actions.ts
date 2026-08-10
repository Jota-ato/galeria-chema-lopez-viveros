"use server"

import { adminAction } from "@/shared/lib/actions"
import { Collection } from "../types/collections.types"
import { selectedCollectionsService } from "../services/selected-collections-service"

export const syncSelectedCollectionsAction = adminAction(async (collections: Collection[]) => {
    await selectedCollectionsService.updateFeaturedCollections(collections)

    return "Colecciones destacadas actualizadas correctamente"
})