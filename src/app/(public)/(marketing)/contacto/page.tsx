import { ContactForm } from "@/features/contact/components/contact-form";
import { Instagram } from "@/features/contact/components/instagram";
import { Container } from "@/shared/components/layout/container";
import { Title } from "@/shared/components/public/title";
import { Heading } from "@/shared/components/typography/heading";
import Image from "next/image";

export default function ContactPage() {
  return (
    <Container className="space-y-12 pt-12">
      <div className="flex flex-col gap-2">
        <Title
          textAbove="Escríbeme"
          textBelow="Para adquirir una pieza, encargar una obra o platicar sobre una exhibición, este es el lugar."
        >
          <Heading>Contáctame</Heading>
        </Title>
        <div>
          <a
            href="https://www.instagram.com/chemalv_art/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-wide px-3 py-1.5 rounded-full border border-stone-300 text-stone-700 hover:border-stone-400 transition-colors"
          >
            <Instagram className="size-4" />
            chemalv_art
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12 md:gap-16">
        <div className="flex-1 border-t md:border-t-0 md:border-r border-stone-200 pt-10 md:pt-0 md:pr-16">
          <ContactForm />
        </div>
        <div className="md:w-2/5 shrink-0">
          <div className="relative w-full aspect-5/8 overflow-hidden rounded-sm">
            <Image
              src="/img/artwork4.jpeg"
              alt="Gato"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
