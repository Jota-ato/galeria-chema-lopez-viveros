import { CollectionStatus } from "../types/collections.types";

export const TRANSLATED_COLLECTION_STATUS: Record<CollectionStatus, string> = {
  archived: "Archivada",
  draft: "Borrador",
  published: "Publicada",
};

export const STATUS_DESCRIPTION: Record<CollectionStatus, string> = {
  archived: "Esta colección está archivada y no es visible para el público.",
  draft: "Esta colección está en borrador y no es visible para el público.",
  published: "Esta colección está publicada y es visible para el público.",
}