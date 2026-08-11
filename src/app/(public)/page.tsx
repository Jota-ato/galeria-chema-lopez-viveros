import { Container } from "@/shared/components/layout/container";
import { Hero } from "@/shared/components/public/hero";
import { Heading } from "@/shared/components/typography/heading";

export default function LandingPage() {
  return (
    <main className="">
      <Hero />
      <section className="min-h-screen py-8 md:py-12">
        <Container>
          <Heading>Ve mis obras más destacadas</Heading>
        </Container>
      </section>
    </main>
  );
}
