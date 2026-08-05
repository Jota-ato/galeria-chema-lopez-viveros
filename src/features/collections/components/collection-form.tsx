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
import { Upload, X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { generateSlug } from "@/shared/lib/slug";
import { useArtworkImageUpload } from "@/features/artworks/hooks/use-artwork-image-upload";
import { UploadTile } from "@/features/artworks/components/upload-tile";
import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import { FieldWLabel } from "@/shared/components/form/field-w-label";
import { FormSubmit } from "@/shared/components/form/form-submit";

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
  const banner = watch("banner");

  const slug = useMemo(() => {
    if (!name) return "";
    const slug = generateSlug(name);
    setValue("slug", slug);
    return slug;
  }, [name, setValue]);

  const onSubmit = async (data: CollectionInput) => {
    console.log("Submitting collection:", data);
  };

  const { startUpload: startBannerUpload, isUploading: isBannerUploading } =
    useArtworkImageUpload({
      logLabel: "banner",
      onSuccess: ([url]) => {
        if (url) setValue("banner", url);
      },
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <FieldWLabel
            register={register}
            label="Nombre de la colleción"
            name="name"
            error={errors.name?.message}
          />
          <Field>
            <FieldLabel>Slug</FieldLabel>
            <FieldDescription>
              Este es el identificador único de la colección, se genera
              automáticamente a partir del nombre.
            </FieldDescription>
            <div className="bg-muted text-muted-foreground p-1 px-2 rounded-md border border-border">
              {slug
                ? slug
                : "El slug se generará automáticamente a partir del nombre de la colección."}
            </div>
          </Field>
          <FieldWLabel
            label="Descripción"
            register={register}
            textarea
            name="description"
            error={errors.description?.message}
          />

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
            <UploadTile
              id="banner"
              isUploading={isBannerUploading}
              label="Imagen de banner"
              multiple={false}
              variant="compact"
              onFilesSelected={([file]) => file && startBannerUpload([file])}
              className="w-full"
            >
              {banner ? (
                <div className="relative h-full w-full">
                  <Image
                    src={banner}
                    alt="Banner de la colección"
                    fill
                    className="object-cover"
                  />
                  <Button
                    variant="outline"
                    size={"icon"}
                    className="absolute top-2 right-2 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setValue("banner", undefined);
                    }}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="size-4" />
                  <p className="text-sm">Subir imagen de banner</p>
                </div>
              )}
            </UploadTile>
          </div>
        </FieldGroup>
        <FormSubmit
          isSubmitting={isSubmitting}
          isSubmittingLabel="Creando..."
          label="Crear colección"
        />
      </FieldSet>
    </form>
  );
}
