"use client"
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-[url('/img/hero.jpeg')] bg-center bg-no-repeat bg-cover min-h-screen">
      <div className="relative inset-0 bg-black/40 size-full min-h-screen flex flex-col gap-8 items-center justify-center text-white p-8 md:pb-12">
        <Heading className="text-4xl! sm:text-6xl! max-w-xs md:max-w-2xl">
          Pintura contemporánea
        </Heading>
        <Button
          variant="ghost"
          size="lg"
          className="cursor-pointer text-base py-8 md:text-xl font-bold absolute bottom-4 flex-col animate-float animate-iteration-count-infinite animate-duration-3000"
          onClick={() => {
            document
              .getElementById("selected-artworks")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Mi trabajo
          <ChevronDown className="size-4" />
        </Button>
      </div>
    </section>
  );
}
