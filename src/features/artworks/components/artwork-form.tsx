"use client";

import { ArtworkRatio, ArtworkWithImages } from "../types/artworks.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { artworkSchema, ArtworkInput } from "../schema/artwork-schema";
import { FieldGroup, FieldSet } from "@/shared/components/ui/field";
import { FormSubmit } from "@/shared/components/form/form-submit";
import { FieldInput } from "@/shared/components/form/field-inputs.types";
import { FieldWLabel } from "@/shared/components/form/field-w-label";
import { CustomSelect } from "@/shared/components/form/custom-select";
import { artworksStatus, aspectRatio } from "@/db/schema";
import { TRANSLATE_STATUS_MAP } from "../utils/status";
import { useEffect, useMemo } from "react";
import {
  getClosestAspectRatio,
  TRANSLATED_RATIO_MAP,
} from "@/shared/utils/aspect-ration";
import { useArtworkStore } from "../stores/artwork-store";

const generalData: FieldInput<ArtworkInput>[] = [
  {
    name: "title",
    label: "Título",
    type: "text",
    placeholder: "Título de la obra",
  },
  {
    name: "description",
    label: "Descripción",
    placeholder: "Descripción de la obra",
    textarea: true,
  },
  {
    name: "price",
    label: "Precio",
    type: "number",
    placeholder: "Precio de la obra",
  },
  {
    name: "fullResolutionImageUrl",
    label: "Imagen en alta resolución",
    type: "text",
    placeholder: "URL de la imagen en alta resolución",
  },
];

const dimensionsData: FieldInput<ArtworkInput>[] = [
  {
    name: "width",
    label: "Ancho",
    type: "number",
    placeholder: "En cm",
  },
  {
    name: "height",
    label: "Alto",
    type: "number",
    placeholder: "En cm",
  },
];

export function ArtworkForm({ artwork }: { artwork?: ArtworkWithImages }) {
  const isEditing = !!artwork;
  const { setBasicInfo, setConfirmationDialogOpen, basicInfo } =
    useArtworkStore();

  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ArtworkInput>({
    resolver: zodResolver(artworkSchema),
    defaultValues: {
      status: "on_sale",
      aspectRatio: "square",
    },
  });

  useEffect(() => {
    if (basicInfo) {
      reset(basicInfo);
    }
  }, [basicInfo, reset]);

  const width = watch("width");
  const height = watch("height");

  const estimatedAspectRatio: ArtworkRatio = useMemo(() => {
    return width && height ? getClosestAspectRatio(width, height) : "square";
  }, [width, height]);

  useEffect(() => {
    setValue("aspectRatio", estimatedAspectRatio);
  }, [estimatedAspectRatio, setValue]);

  const onSubmit = async (data: ArtworkInput) => {
    setBasicInfo(data);
    setConfirmationDialogOpen(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          {generalData.map((input) => (
            <FieldWLabel
              key={input.name}
              register={register}
              error={errors[input.name as keyof typeof errors]?.message}
              {...input}
            />
          ))}
          <CustomSelect
            control={control}
            name="status"
            error={errors.status?.message}
            label="Status de la obra"
            options={artworksStatus.enumValues.map((status) => ({
              label: TRANSLATE_STATUS_MAP[status],
              value: status,
            }))}
          />
        </FieldGroup>
        <FieldGroup>
          <div className="flex gap-4">
            {dimensionsData.map((input) => (
              <FieldWLabel
                key={input.name}
                register={register}
                error={errors[input.name as keyof typeof errors]?.message}
                {...input}
              />
            ))}
          </div>
          <CustomSelect
            control={control}
            name="aspectRatio"
            label="Proporción"
            error={errors.aspectRatio?.message}
            options={aspectRatio.enumValues.map((ratio) => ({
              label: TRANSLATED_RATIO_MAP[ratio],
              value: ratio,
            }))}
          />
        </FieldGroup>
        <FormSubmit
          isSubmitting={isSubmitting}
          isSubmittingLabel={isEditing ? "Guardando..." : "Publicando..."}
          label={isEditing ? "Guardar obra" : "Publicar obra"}
        />
      </FieldSet>
    </form>
  );
}
