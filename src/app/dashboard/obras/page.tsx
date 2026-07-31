import { Heading } from "@/shared/components/typography/heading";
import { ArtworkBentoAlbum } from "@/features/artworks/components/artwork-bento-album";
import { artworksService } from "@/features/artworks/services/artworks-service";

export default async function ArtworksPage() {
  const artworks = await artworksService.getLastArtworks(5, 1);

  return (
    <>
      <Heading>Obras más recientes</Heading>

      <ArtworkBentoAlbum artworks={artworks} />

      <div className="flex justify-end mt-6">
        <a href="?page=2" className="btn">
          Siguiente página
        </a>
      </div>
    </>
  );
}
