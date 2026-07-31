import { artworksStatus } from "@/db/schema";

export type Status = typeof artworksStatus.enumValues[number];

export const TRANSLATE_STATUS_MAP: Record<Status, string> = {
    sold: "Vendida",
    on_sale: "En venta",
    reserved: "Reservada",
    exhibition_only: "Solo en exposición",
}