import { CollectionForm } from "@/features/collections/components/collection-form";
import { Heading } from "@/shared/components/typography/heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export default async function CreateColection() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <Heading className="text-left text-lg! font-medium">
              Crear colección
            </Heading>
          </CardTitle>
          <CardDescription>
            Define el nombre y la información de la colección
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CollectionForm />
        </CardContent>
      </Card>
    </>
  );
}
