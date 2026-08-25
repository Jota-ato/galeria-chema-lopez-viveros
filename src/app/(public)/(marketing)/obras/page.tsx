import { ArtworkBentoAlbum } from "@/features/artworks/components/artwork-bento-album";
import { ArtworkInfiniteScroll } from "@/features/artworks/components/artworks-infinite-scroll";
import { artworksService } from "@/features/artworks/services/artworks-service";
import { SelectedArtworksSection } from "@/features/landing/components/selected-artworks-section";
import { Container } from "@/shared/components/layout/container";
import { Title } from "@/shared/components/public/title";
import { Heading } from "@/shared/components/typography/heading";

export default async function ObrasPage() {
  const artworks = await artworksService.getLastArtworks(5, 1);

  return (
    <div className="pt-12">
      <Container>
        <Title
          textAbove="Más de una década de práctica artística"
          textBelow="Piezas, colecciones y procesos que definen mi trabajo hasta hoy."
        >
          <Heading>Mi obra</Heading>
        </Title>
      </Container>

      <section className="bg-secondary my-8 md:my-12 py-8 flex items-center justify-center">
        <Container>
          <Title
            textAbove="Recién salidas del taller"
            className="[&>span]:text-secondary-foreground mb-8"
          >
            <Heading level={2}>Mis obras más recientes</Heading>
          </Title>
          <ArtworkBentoAlbum artworks={artworks} />
        </Container>
      </section>

      <SelectedArtworksSection />

      <section className="bg-primary mt-8 md:mt-12 py-8 flex items-center justify-center text-primary-foreground">
        <Container>
          <Title
            className="mb-8 [&>p]:text-primary-foreground [&>span]:text-primary-foreground"
            textAbove="Catálogo completo"
            textBelow="Desplázate para ver todas las piezas disponibles."
          >
            <Heading level={2}>Todas mis obras</Heading>
          </Title>
          <ArtworkInfiniteScroll initialArtworks={artworks} />
        </Container>
      </section>
    </div>
  );
}
