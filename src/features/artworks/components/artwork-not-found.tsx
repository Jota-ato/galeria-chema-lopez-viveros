import Link from "next/link";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Container } from "@/shared/components/layout/container";

export function ArtworkNotFound({ slug }: { slug: string }) {
  return (
    <Container className="flex flex-col items-center gap-10 overflow-hidden text-center">
      <div className="relative motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-700">
        <div className="flex h-52 w-40 items-center justify-center border-3 border-secondary p-2 sm:h-64 sm:w-48">
          <div className="h-full w-full border border-secondary/60 bg-linear-to-br from-muted to-card" />
        </div>
      </div>

      <div className="flex w-full max-w-xs flex-col items-center gap-1 border-y border-border py-4">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          No disponible
        </span>
        <Heading level={2} className="text-center">
          Obra no encontrada
        </Heading>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          N.º de catálogo — {slug}
        </span>
      </div>

      <p className="max-w-md text-balance text-muted-foreground">
        No encontramos ninguna obra con esta referencia en la colección. Puede
        que se haya vendido, se haya retirado de la galería o que el enlace ya
        no esté vigente.
      </p>

      <Button render={<Link href="/obras" />} nativeButton={false}>
        Volver a la galería
      </Button>
    </Container>
  );
}
