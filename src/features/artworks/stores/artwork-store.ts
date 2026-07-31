import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ArtworkInput } from "../schema/artwork-schema";

interface ArtworkStore {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;

  extraImagesUrl: string[] | null;
  setExtraImagesUrl: (urls: string[] | null) => void;
  addExtraImageUrl: (url: string) => void;
  removeExtraImageUrl: (url: string) => void;

  basicInfo: ArtworkInput | null;
  setBasicInfo: (info: ArtworkInput | null) => void;

  confirmationDialogOpen: boolean;
  setConfirmationDialogOpen: (open: boolean) => void;
}

export const useArtworkStore = create<ArtworkStore>()(
  persist(
    (set) => ({
      imageUrl: null,
      extraImagesUrl: null,
      basicInfo: null,
      confirmationDialogOpen: false,

      setImageUrl: (url) => set({ imageUrl: url }),

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

      setBasicInfo: (info) => set({ basicInfo: info }),

      setConfirmationDialogOpen: (open) =>
        set({ confirmationDialogOpen: open }),
    }),
    {
      name: "artwork-store",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        imageUrl: state.imageUrl,
        extraImagesUrl: state.extraImagesUrl,
        basicInfo: state.basicInfo,
      }),
    },
  ),
);
