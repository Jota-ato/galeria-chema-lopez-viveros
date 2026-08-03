import { Heading } from "@/shared/components/typography/heading";
import { artworksService } from "@/features/artworks/services/artworks-service";
import { ArtworkInfiniteScroll } from "@/features/artworks/components/artworks-infinite-scroll";

export default async function ArtworksPage() {
  const artworks = await artworksService.getLastArtworks(5, 1);

  return (
    <>
      <Heading>Obras más recientes</Heading>
      <ArtworkInfiniteScroll initialArtworks={artworks} />
    </>
  );
}
