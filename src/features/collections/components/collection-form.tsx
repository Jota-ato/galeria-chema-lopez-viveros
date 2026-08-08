"use client";

import { useEffect, useMemo } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { CustomSelect } from "@/shared/components/form/custom-select";
import { collectionStatus } from "@/db/schema";
import {
  STATUS_DESCRIPTION,
  TRANSLATED_COLLECTION_STATUS,
} from "../helpers/status";
import { useArtworkImageUpload } from "@/features/artworks/hooks/use-artwork-image-upload";
import { UploadTile } from "@/features/artworks/components/upload-tile";
import { Button } from "@/shared/components/ui/button";
import { FieldWLabel } from "@/shared/components/form/field-w-label";
import { FormSubmit } from "@/shared/components/form/form-submit";
import { useCollectionForm } from "../hooks/useCollectionForm";
import { useCollectionStore } from "../stores/collection-store";

interface BannerFieldProps {
  value?: string | null;
  onChange: (value?: string | null) => void;
}

function BannerField({ value, onChange }: BannerFieldProps) {
  const { startUpload, isUploading } = useArtworkImageUpload({
    logLabel: "banner",
    onSuccess: ([url]) => {
      if (url) onChange(url);
    },
  });

  return (
    <UploadTile
      id="banner"
      isUploading={isUploading}
      label="Imagen de banner"
      multiple={false}
      variant="compact"
      onFilesSelected={([file]) => file && startUpload([file])}
      className="w-full"
    >
      {value ? (
        <div className="relative h-full w-full">
          <Image
            src={value}
            alt="Banner de la colección"
            fill
            className="object-cover"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={(e) => {
              e.stopPropagation();
              onChange(undefined);
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
  );
}

export function CollectionForm({
  isEditting = false,
}: {
  isEditting?: boolean;
}) {
  const { data } = useCollectionStore();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    status,
    banner,
    slugPreview,
    onSubmit,
    reset,
  } = useCollectionForm(data ? true : isEditting, data?.slug);

  useEffect(() => {
    if (data) {
      reset({
        ...data
      })
    };
  }, [data, reset]);

  const statusOptions = useMemo(
    () =>
      collectionStatus.enumValues.map((s) => ({
        label: TRANSLATED_COLLECTION_STATUS[s],
        value: s,
      })),
    [],
  );

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
              {slugPreview ||
                "El slug se generará automáticamente a partir del nombre de la colección."}
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
              options={statusOptions}
            />

            <BannerField
              value={banner}
              onChange={(url) => setValue("banner", url)}
            />
          </div>
        </FieldGroup>

        <FormSubmit
          isSubmitting={isSubmitting}
          isSubmittingLabel={(data ? true : isEditting) ? "Actualizando colección..." : "Creando colección..."}
          label={(data ? true : isEditting) ? "Actualizar colección" : "Crear colección"}
        />
      </FieldSet>
    </form>
  );
}
