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
import { useEffect, useMemo } from "react";
import { generateSlug } from "@/shared/lib/slug";

export function CollectionForm() {
  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CollectionInput>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      status: "draft",
    },
  });

  const status = watch("status");
  const name = watch("name");

  const slug = useMemo(() => {
    if (!name) return "";
    const slug = generateSlug(name);
    setValue("slug", slug);
    return slug;
  }, [name, setValue]);

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
            <div className="bg-muted text-muted-foreground p-1 px-2 rounded-md border border-border">
                {slug ? slug : "El slug se generará automáticamente a partir del nombre de la colección."}
            </div>
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
            <div className="border border-dashed rounded-md flex flex-col items-center justify-center gap-2 p-4 group hover:border-primary transition-all duration-250">
              <Upload className="group-hover:scale-110 transition-all duration-250" />
              <p className="text-xs text-muted-foreground hover:text-foreground duration-250 transition-all">
                Subir imagen de banner
              </p>
            </div>
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
