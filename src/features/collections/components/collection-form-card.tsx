import { Heading } from "@/shared/components/typography/heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { CollectionForm } from "@/features/collections/components/collection-form";

export function CollectionFormCard({ isEditting }: { isEditting?: boolean }) {
  return (
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
        <CollectionForm isEditting={isEditting} />
      </CardContent>
    </Card>
  )
}