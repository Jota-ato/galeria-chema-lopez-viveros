import Link from "next/link";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Container } from "@/shared/components/layout/container";

export function ArtworkNotFound({ slug }: { slug: string }) {
  return (
    <Container className="relative flex flex-col items-center gap-10 overflow-hidden text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-95 w-140 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent),transparent_70%)] opacity-30 blur-3xl"
      />

      <div className="relative motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-700">
        <svg
          aria-hidden
          viewBox="0 0 40 20"
          className="absolute -top-5 left-1/2 h-5 w-10 -translate-x-1/2 text-secondary"
        >
          <path
            d="M2 20 L20 3 L38 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        <div className="relative flex h-52 w-40 items-center justify-center border-[3px] border-secondary p-2 sm:h-64 sm:w-48">
          <div className="h-full w-full border border-secondary/60 bg-linear-to-br from-muted to-card" />
        </div>
      </div>

      {/* Cédula museográfica */}
      <div className="flex w-full max-w-xs flex-col items-center gap-1 border-y border-border py-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          No disponible
        </span>
        <Heading level={2} className="text-center">
          Obra no encontrada
        </Heading>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
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
