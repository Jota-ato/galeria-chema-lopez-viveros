import { Container } from "@/shared/components/layout/container";
import { Title } from "@/shared/components/public/title";
import { Heading } from "@/shared/components/typography/heading";

export default function AboutMePage() {
  return (
    <div>
      <section className="bg-[url('/img/sobre-mi-hero-image.webp')] min-h-160 bg-cover bg-no-repeat bg-bottom relative">
        <div className="absolute top-0 left-0 size-full bg-black/20">
          <Container className="flex flex-col items-center justify-end pb-12 h-full">
            <Title
              className="[&>p]:text-primary-foreground!"
              textBelow="Chema López Viveros · 16 años · Pintor"
            >
              <Heading className="text-primary-foreground">
                Pintura, expresión y el camino hacia un sueño internacional
              </Heading>
            </Title>
          </Container>
        </div>
      </section>
    </div>
  );
}
