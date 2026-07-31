"use client";

import { useUploadThing } from "@/lib/uploadthing";
import { compressImage } from "@/lib/image-compression";

interface UseArtworkImageUploadOptions {
  /** Called with the uploaded file URL(s) once uploadthing confirms the upload. */
  onSuccess: (urls: string[]) => void;
  /** Only used to label the console error, e.g. "imagen principal" / "imágenes extra". */
  logLabel: string;
}

/**
 * Thin wrapper around `useUploadThing("imageUploader", ...)` that compresses
 * every file client-side before sending it, and normalizes the success
 * callback down to a plain `string[]` of URLs.
 *
 * Both the main-image tile and the extra-images tile were duplicating this
 * exact `onBeforeUploadBegin` / `onUploadError` setup — factored out so
 * there's one place to change the upload behavior.
 */
export function useArtworkImageUpload({
  onSuccess,
  logLabel,
}: UseArtworkImageUploadOptions) {
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onBeforeUploadBegin: (files) =>
      Promise.all(files.map((file) => compressImage(file))),
    onClientUploadComplete: (res) => {
      if (res?.length) onSuccess(res.map((file) => file.ufsUrl));
    },
    onUploadError: (error) => {
      console.error(`Error subiendo ${logLabel}:`, error);
    },
  });

  return { startUpload, isUploading };
}
