import { create } from "zustand";
import { Collection } from "../types/collections.types";

interface DeleteCollectionStore {
  open: boolean;
  setOpen: (open: boolean) => void;
  collection: Collection | null;
  setCollection: (collection: Collection | null) => void;
}

export const useDeleteCollectionStore = create<DeleteCollectionStore>(
  (set) => ({
    open: false,
    setOpen: (open) => set({ open }),
    collection: null,
    setCollection: (collection) => set({ collection }),
  }),
);
