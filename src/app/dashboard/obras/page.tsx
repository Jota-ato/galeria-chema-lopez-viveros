import { Heading } from "@/shared/components/typography/heading";
import {
    BentoGrid,
    BentoCard
} from "@/shared/components/ui/bento-grid";
import { Plus } from "lucide-react";

export default async function ArtworksPage() {
  return (
    <>
      <Heading>Obras</Heading>

      <BentoGrid className="md:grid-cols-4 w-full md:grid-rows-3 min-h-screen">
            <BentoCard 
                href="/dashboard/obras/publish"
                Icon={Plus}
                name="Nueva obra"
                description="Publica una nueva obra a la galería"
                className="relative border md:col-start-1 md:col-end-2"
                background={<div className="bg-card size-full top-0 left-0" />}
                cta="Publicar"
            />
      </BentoGrid>

    </>
  )
}