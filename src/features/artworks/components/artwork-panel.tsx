"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ArtworkForm } from "@/features/artworks/components/artwork-form";
import { ArtworkImages } from "@/features/artworks/components/artwork-images";
import { ConfirmationDialog } from "@/features/artworks/components/confirmation-dialog";
import { ArtworkWithImages } from "../types/artworks.types";
import { useArtworkStore } from "../stores/artwork-store";
import { useEffect } from "react";

export function ArtworkPanel({ artwork }: { artwork?: ArtworkWithImages }) {
  const { setBasicInfo, setImageUrl, setExtraImagesUrl } = useArtworkStore();

  useEffect(() => {
    if (artwork) {
      setBasicInfo({
        ...artwork,
        price: Number(artwork.price) ?? 0,
      });
      setImageUrl(artwork.imageUrl ?? null);
      setExtraImagesUrl(artwork.images.map((image) => image.imageUrl));
    }
  }, [artwork, setBasicInfo, setImageUrl, setExtraImagesUrl]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Detalles de la obra</CardTitle>
              <CardDescription>
                Aquí puedes agregar los detalles de la obra que deseas publicar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ArtworkForm />
            </CardContent>
          </Card>
        </aside>
        <main className="flex-1">
          <ArtworkImages />
        </main>
      </div>
      <ConfirmationDialog />
    </>
  );
}
