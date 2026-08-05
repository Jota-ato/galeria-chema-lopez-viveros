"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CollectionInput,
  collectionSchema,
} from "@/features/collections/schemas/collection-schema";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { CustomSelect } from "@/shared/components/form/custom-select";
import { collectionStatus } from "@/db/schema";
import {
  STATUS_DESCRIPTION,
  TRANSLATED_COLLECTION_STATUS,
} from "../helpers/status";
import { Upload } from "lucide-react";

export function CollectionForm() {
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CollectionInput>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      status: "draft",
    },
  });

  const status = watch("status");

  const onSubmit = async (data: CollectionInput) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Nombre de la colección</FieldLabel>
            <Input id="name" placeholder="ej. Gatos" {...register("name")} />
          </Field>
          <Field>
            <FieldLabel>Slug</FieldLabel>
            <FieldDescription>
              Este es el identificador único de la colección, se genera
              automáticamente a partir del nombre.
            </FieldDescription>
            <Input disabled placeholder="ej. Gatos" />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Descripción</FieldLabel>
            <Textarea
              id="description"
              placeholder="ej. Colección de obras de gatos"
              {...register("description")}
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomSelect
              control={control}
              label="Estado"
              placeholder="Selecciona un estado"
              name="status"
              description={STATUS_DESCRIPTION[status]}
              options={collectionStatus.enumValues.map((status) => ({
                label: TRANSLATED_COLLECTION_STATUS[status],
                value: status,
              }))}
            />
            <div className="border border-dashed rounded-md flex flex-col items-center justify-center gap-2 p-4">
              <Upload />
              <p className="text-xs text-muted-foreground">
                Subir imagen de banner
              </p>
            </div>
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
