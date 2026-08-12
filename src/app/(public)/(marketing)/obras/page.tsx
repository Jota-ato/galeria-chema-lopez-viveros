import { ArtworkBentoAlbum } from "@/features/artworks/components/artwork-bento-album";
import { ArtworkInfiniteScroll } from "@/features/artworks/components/artworks-infinite-scroll";
import { artworksService } from "@/features/artworks/services/artworks-service";
import { SelectedArtworksSection } from "@/features/landing/components/selected-artworks-section";
import { Container } from "@/shared/components/layout/container";
import { Heading } from "@/shared/components/typography/heading";

export default async function ObrasPage() {
  const artworks = await artworksService.getLastArtworks(5, 1);

  return (
    <div>
      <Container>
        <Heading>Mi obra</Heading>
      </Container>
      <section className="bg-secondary my-8 md:my-12 py-8 flex items-center justify-center">
        <Container>
          <Heading level={2} className="text-left mb-8">
            Mis obra más recientes
          </Heading>
          <ArtworkBentoAlbum artworks={artworks} />
        </Container>
      </section>
      <SelectedArtworksSection />
      <section className="bg-primary my-8 md:my-12 py-8 flex items-center justify-center text-primary-foreground">
        <Container>
          <Heading level={2} className="text-left mb-8">
            Todas mis obras
          </Heading>
          <ArtworkInfiniteScroll initialArtworks={artworks} />
        </Container>
      </section>
    </div>
  );
}
