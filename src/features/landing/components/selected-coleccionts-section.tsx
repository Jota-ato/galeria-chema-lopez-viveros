import { Heading } from "@/shared/components/typography/heading";
import Image from "next/image";
import { ArtworkBentoAlbum } from "@/features/artworks/components/artwork-bento-album";
import { selectedCollectionsService } from "@/features/collections/services/selected-collections-service";
import { Container } from "@/shared/components/layout/container";
import { Title } from "@/shared/components/public/title";

const toRoman = (num: number) => {
  const map: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let n = num;
  let out = "";
  for (const [val, sym] of map) {
    while (n >= val) {
      out += sym;
      n -= val;
    }
  }
  return out;
};

export async function SelectedColleccionsSection() {
  const featuredCollections =
    await selectedCollectionsService.getFeaturedCollections(true);

  return (
    <section className="py-20 md:py-32">
      <Container>
        <Title textAbove="Colecciones destacadas">
          <Heading level={2} className="font-serif text-4xl md:text-5xl">
            Ve mis obras más destacadas
          </Heading>
        </Title>

        <div className="flex flex-col">
          {featuredCollections.map((featuredCollection, index) => (
            <article
              key={featuredCollection.id}
              className="border-t border-stone-200 first:border-t-0 py-16 md:py-24"
            >
              <header className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start mb-10">
                <span className="font-serif text-2xl text-stone-400 tabular-nums">
                  {toRoman(index + 1)}
                </span>
                <Title textBelow={featuredCollection.collection.description}>
                  <Heading
                    level={3}
                    className="font-serif text-3xl md:text-4xl"
                  >
                    {featuredCollection.collection.name}
                  </Heading>
                </Title>
              </header>

              <div className="relative w-full aspect-21/9 rounded-sm overflow-hidden mb-10">
                <Image
                  src={featuredCollection.collection.banner!}
                  alt={featuredCollection.collection.name}
                  fill
                  sizes="(min-width: 768px) 1200px, 100vw"
                  className="object-cover transition-transform duration-700 motion-reduce:transition-none"
                  priority={index === 0}
                />
              </div>

              <ArtworkBentoAlbum
                artworks={featuredCollection.collection.artworks}
              />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
