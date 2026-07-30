// app/dashboard/obras/page.tsx
import { Heading } from "@/shared/components/typography/heading";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { ArtworkBentoAlbum } from "@/features/artworks/components/artwork-bento-album";
import { artworksService } from "@/features/artworks/services/artworks-service";

export default async function ArtworksPage() {
  const artworks = await artworksService.getLastArtworks(5, 1);

  return (
    <>
      <Heading>Obras</Heading>

      <Card>
        <CardHeader>
          <CardTitle>Nueva obra</CardTitle>
          <CardDescription>
            Publica una nueva obra en la galería
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>
            Agregar obra <Plus className="size-4" />
          </Button>
        </CardContent>
      </Card>

      <ArtworkBentoAlbum artworks={artworks} />

      <div className="flex justify-end mt-6">
        <a href="?page=2" className="btn">
          Siguiente página
        </a>
      </div>
    </>
  );
}
