import { artworksStatus } from "@/db/schema";

export type ArtworkStatus = typeof artworksStatus.enumValues[number];

export const TRANSLATE_STATUS_MAP: Record<ArtworkStatus, string> = {
    sold: "Vendida",
    on_sale: "Disponible",
    reserved: "Reservada",
    exhibition_only: "Solo en exposición",
}