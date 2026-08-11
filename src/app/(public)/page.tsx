import { SelectedColleccionsSection } from "@/features/landing/components/selected-coleccionts-section";
import { Hero } from "@/shared/components/public/hero";

export default async function LandingPage() {
  return (
    <main>
      <Hero />
      <SelectedColleccionsSection />
    </main>
  );
}
