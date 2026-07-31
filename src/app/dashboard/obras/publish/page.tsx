import { ArtworkForm } from "@/features/artworks/components/artwork-form";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function PublishPage() {
  const { session } = await requireAuth();
  if (!session) redirect("/auth/sign-in");

  return (
    <>
      <Heading>Publicar obra</Heading>

      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Detalles de la obra</CardTitle>
              <CardDescription>
                Aquí puedes agregar los detalles de la obra que deseas publicar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ArtworkForm />
            </CardContent>
          </Card>
        </aside>
        <main className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Vista previa</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src="/img/artwork1.jpeg"
                alt="Vista previa de la obra"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}
