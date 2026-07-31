import { create } from "zustand";

interface ArtworkStore {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
  extraImagesUrl: string[] | null;
  setExtraImagesUrl: (urls: string[] | null) => void;
  addExtraImageUrl: (url: string) => void;
  removeExtraImageUrl: (url: string) => void;
}

export const useArtworkStore = create<ArtworkStore>((set) => ({
  imageUrl: null,
  setImageUrl: (url) => set({ imageUrl: url }),
  extraImagesUrl: null,
  setExtraImagesUrl: (urls) => set({ extraImagesUrl: urls }),
  addExtraImageUrl: (url) =>
    set((state) => ({
      extraImagesUrl: state.extraImagesUrl
        ? [...state.extraImagesUrl, url]
        : [url],
    })),
  removeExtraImageUrl: (url) =>
    set((state) => ({
      extraImagesUrl: state.extraImagesUrl
        ? state.extraImagesUrl.filter((u) => u !== url)
        : null,
    })),
}));
