import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel";
import { ArtworkWithImages } from "../types/artworks.types";
import { RATIO_MAP } from "@/shared/utils/aspect-ration";
import { ArtworkImage } from "./artwork-image";

export function ImagesCarousel({ artwork }: { artwork: ArtworkWithImages }) {
  const ratio = RATIO_MAP[artwork.aspectRatio];
  return (
    <Carousel
      opts={{
        loop: true,
        align: "start",
        active: true,
      }}
      className="max-w-3xl"
    >
      <CarouselContent>
        <CarouselItem key={artwork.id}>
          <ArtworkImage ratio={ratio} image={artwork.imageUrl} />
        </CarouselItem>
        {artwork.images.map((image) => (
          <CarouselItem
            className="max-h-60 md:max-h-120 overflow-auto [&>img]:h-full"
            key={image.id}
          >
            <ArtworkImage ratio={ratio} image={image.imageUrl} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2" />
      <CarouselNext className="absolute right-2" />
    </Carousel>
  );
}
