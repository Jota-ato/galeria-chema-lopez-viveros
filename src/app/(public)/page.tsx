import { Container } from "@/shared/components/layout/container";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";

export default function LandingPage() {
    return (
        <div className="bg-[url('/img/hero.jpeg')] bg-no-repeat bg-cover min-h-screen">
            <Container className="bg-black/40 size-full min-h-screen flex flex-col gap-8 items-center justify-center text-white">
                <Heading className="md:text-5xl! max-w-xs md:max-w-xl">Pintura y escultura contemporánea</Heading>
                <Button
                    size="lg"
                    render={<a href={`https://wa.me/${process.env.ARTIST_PHONE}`} target="_blank" />}
                    nativeButton={false}
                    className="cursor-pointer text-base md:text-xl font-bold px-8 py-6"
                >
                    Contáctame
                </Button>
            </Container>
        </div>
    )
}