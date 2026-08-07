import { CollectionWithArtworksCount } from "@/features/collections/types/collections.types";

export const collections: CollectionWithArtworksCount[] = [
  {
    id: "1",
    name: "Gatos",
    slug: "gatos",
    description: "Colección de retratos felinos en distintas técnicas y estilos",
    banner: "https://picsum.photos/seed/gatos/800/450",
    status: "published",
    createdAt: new Date("2026-06-02"),
    updatedAt: new Date("2026-08-02"),
    artworksCount: 12,
  },
  {
    id: "2",
    name: "Retratos silenciosos",
    slug: "retratos-silenciosos",
    description: "Rostros y expresiones capturadas en óleo y carboncillo",
    banner: "https://picsum.photos/seed/retratos-silenciosos/800/450",
    status: "published",
    createdAt: new Date("2026-05-14"),
    updatedAt: new Date("2026-07-28"),
    artworksCount: 8,
  },
  {
    id: "3",
    name: "Obra en papel",
    slug: "obra-en-papel",
    description: "Piezas sobre papel: acuarela, tinta y técnicas mixtas",
    banner: "https://picsum.photos/seed/obra-en-papel/800/450",
    status: "draft",
    createdAt: new Date("2026-07-10"),
    updatedAt: new Date("2026-07-15"),
    artworksCount: 5,
  },
];
