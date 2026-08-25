import { Container } from "@/shared/components/layout/container";
import { Title } from "@/shared/components/public/title";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function AboutMePage() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative min-h-160 bg-[url('/img/sobre-mi-hero-image.webp')] bg-cover bg-bottom bg-no-repeat flex items-end">
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/20" />

        <Container className="relative z-10 pb-12 md:pb-16 h-full">
          <div className="max-w-3xl space-y-4">
            <Title
              className="[&>p]:text-neutral-200 [&>p]:text-base md:[&>p]:text-lg"
              textBelow="Chema López Viveros · 16 años · Pintor"
            >
              <Heading className="text-white text-3xl md:text-5xl lg:text-6xl font-serif font-normal">
                Pintura, expresión y el camino hacia un sueño internacional
              </Heading>
            </Title>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 border-b border-border/40">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  Trayectoria
                </span>
                <Heading level={2} className="text-2xl md:text-4xl font-serif">
                  Mi historia y la búsqueda del gesto
                </Heading>
              </div>

              <blockquote className="border-l-2 border-primary/60 pl-4 py-1 italic text-lg text-foreground/90 font-serif">
                "El dibujo me dio estructura a los 7 años, pero a los 12
                descubrí que mi verdadera voz habita en la libertad de la
                mancha."
              </blockquote>

              <div className="space-y-4 leading-relaxed text-base md:text-lg">
                <p>
                  Mi nombre es{" "}
                  <strong className="text-primary font-medium">
                    Chema López Viveros
                  </strong>
                  . A los 12 años, gracias a la guía de un gran maestro de
                  secundaria, di el salto formal a la pintura. Desde entonces,
                  exploré el poder expresivo de la mancha plástica, alejándome
                  de la línea rígida para construir atmósferas y emociones
                  directas en el lienzo.
                </p>
                <p>
                  Continúo formándome de manera constante a través de talleres y
                  práctica intensiva de estudio, explorando técnicas mixtas,
                  óleo y acrílico.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Aspiro a formarme en una facultad de arte en el extranjero.
                  Esta galería es el medio para solventar materiales de calidad
                  y recaudar los fondos necesarios para postular y costear mis
                  estudios internacionales.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm group">
                <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-muted shadow-xl border border-border/50">
                  <Image
                    src="/img/chema-actual.webp"
                    alt="Chema López Viveros"
                    fill
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-muted/30">
        <Container className="space-y-4">
          <Heading level={3} className="text-2xl md:text-3xl font-serif">
            Adquiere hoy una obra y apoya mi camino hacia la formación artística
            internacional
          </Heading>
          <p className="text-muted-foreground text-sm md:text-base">
            Cada lienzo adquirido apoya directamente la continuidad de este
            proyecto artístico y académico.
          </p>
          <div className="flex flex-wrap justify-start gap-4 pt-2">
            <Button
              nativeButton={false}
              render={<Link href="/obras" />}
              size="lg"
            >
              Explorar Galería
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/contacto" />}
              variant={"outline"}
              size="lg"
            >
              Contactar directamente
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
