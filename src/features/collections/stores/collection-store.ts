import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CollectionInput } from "../schemas/collection-schema";

export interface CollectionStore {
  collectionId: string | null;
  data: CollectionInput | null;
  imagesUrl: string[];
  step: number;
  setStep: (step: number) => void;
  setCollectionId: (id: string | null) => void;
  setData: (data: CollectionInput | null) => void;
  setImagesUrl: (imagesUrl: string[]) => void;
  addImageUrl: (imageUrl: string) => void;
  removeImageUrl: (imageUrl: string) => void;
  reset: () => void;
}

export const useCollectionStore = create<CollectionStore>()(
  persist(
    (set) => ({
      collectionId: null,
      data: null,
      imagesUrl: [],
      step: 1,
      setStep: (step) => set({ step }),
      setCollectionId: (id) => set({ collectionId: id }),
      setData: (data) => set({ data }),
      setImagesUrl: (imagesUrl) => set({ imagesUrl }),
      addImageUrl: (imageUrl) =>
        set((state) => ({ imagesUrl: [...state.imagesUrl, imageUrl] })),
      removeImageUrl: (imageUrl) =>
        set((state) => ({
          imagesUrl: state.imagesUrl.filter((url) => url !== imageUrl),
        })),
      reset: () => set({ collectionId: null, data: null, imagesUrl: [] }),
    }),
    {
      name: "artwork-store",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        data: state.data,
        imagesUrl: state.imagesUrl,
        collectionId: state.collectionId,
        step: state.step,
      }),
    },
  ),
);
