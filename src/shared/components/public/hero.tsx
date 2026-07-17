import { Container } from "@/shared/components/layout/container";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <div className="bg-[url('/img/hero.jpeg')] bg-center bg-no-repeat bg-cover min-h-screen">
      <Container className="bg-black/40 size-full min-h-screen flex flex-col gap-8 items-center justify-end text-white p-8 md:pb-12">
        <Heading className="sm:text-5xl! max-w-xs sm:max-w-xl">
          Pintura contemporánea
        </Heading>
        <div className="flex gap-4 flex-col md:flex-row w-full md:w-auto">
          <Button
            size="lg"
            render={
              <a
                href={`https://wa.me/${process.env.ARTIST_PHONE}`}
                target="_blank"
              />
            }
            nativeButton={false}
            className="cursor-pointer text-base md:text-xl font-bold px-8 py-6"
          >
            Contáctame
          </Button>
          <Button
            variant="secondary"
            size="lg"
            render={<Link href="/obras" />}
            nativeButton={false}
            className="cursor-pointer text-base md:text-xl font-bold px-8 py-6"
          >
            Mi trabajo
          </Button>
        </div>
      </Container>
    </div>
  );
}
