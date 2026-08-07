import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Artwork } from "@/features/artworks/types/artworks.types";
import { Collection } from "../types/collections.types";

export interface CollectionStore {
  collectionId: string | null;
  data: Collection | null;
  artworks: Artwork[];
  step: number;
  setStep: (step: number) => void;
  setCollectionId: (id: string | null) => void;
  setData: (data: Collection | null) => void;
  setArtworks: (artworks: Artwork[]) => void;
  addArtwork: (artwork: Artwork) => void;
  removeArtwork: (artworkId: string) => void;
  reset: () => void;
}

export const useCollectionStore = create<CollectionStore>()(
  persist(
    (set) => ({
      collectionId: null,
      data: null,
      artworks: [],
      step: 1,
      setStep: (step) => set({ step }),
      setCollectionId: (id) => set({ collectionId: id }),
      setData: (data) => set({ data }),
      setArtworks: (artworks) => set({ artworks }),
      addArtwork: (artwork) =>
        set((state) => ({ artworks: [...state.artworks, artwork] })),
      removeArtwork: (artworkId) =>
        set((state) => ({
          artworks: state.artworks.filter(
            (artwork) => artwork.id !== artworkId,
          ),
        })),
      reset: () => set({ collectionId: null, data: null, artworks: [] }),
    }),
    {
      name: "collection-store",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        data: state.data,
        artworks: state.artworks,
        collectionId: state.collectionId,
        step: state.step,
      }),
    },
  ),
);
