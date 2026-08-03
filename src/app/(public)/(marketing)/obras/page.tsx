import { ArtworkBentoAlbum } from "@/features/artworks/components/artwork-bento-album";
import { ArtworkInfiniteScroll } from "@/features/artworks/components/artworks-infinite-scroll";
import { artworksService } from "@/features/artworks/services/artworks-service";
import { Container } from "@/shared/components/layout/container";
import { Heading } from "@/shared/components/typography/heading";

export default async function ObrasPage() {
  const artworks = await artworksService.getLastArtworks(5, 1);

  return (
    <div>
      <Heading>Obras</Heading>

      <section className="bg-secondary min-h-screen my-8 md:my-12 py-8 flex items-center justify-center">
        <Container>
          <Heading>Mis obra más recientes</Heading>

          <ArtworkInfiniteScroll initialArtworks={artworks} />
        </Container>
      </section>
    </div>
  );
}
