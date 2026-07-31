"use client";

import { Artwork } from "../types/artworks.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { artworkSchema, ArtworkInput } from "../schema/artwork-schema";
import { FieldGroup, FieldSet } from "@/shared/components/ui/field";
import { FormSubmit } from "@/shared/components/form/form-submit";
import { FieldInput } from "@/shared/components/form/field-inputs.types";
import { FieldWLabel } from "@/shared/components/form/field-w-label";
import { CustomSelect } from "@/shared/components/form/custom-select";
import { artworksStatus } from "@/db/schema";
import { TRANSLATE_STATUS_MAP } from "../utils/status";

const inputs: FieldInput<ArtworkInput>[] = [
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
];

export function ArtworkForm({ artwork }: { artwork?: Artwork }) {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ArtworkInput>({
    resolver: zodResolver(artworkSchema),
  });

  const onSubmit = async (data: ArtworkInput) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          {inputs.map((input) => (
            <FieldWLabel
              key={input.name}
              register={register}
              {...input}
            />
          ))}
          <CustomSelect
            control={control}
            name="status"
            label="Status de la obra"
            options={artworksStatus.enumValues.map((status) => ({
              label: TRANSLATE_STATUS_MAP[status],
              value: status,
            }))}
          />
        </FieldGroup>
        <FormSubmit
          isSubmitting={isSubmitting}
          isSubmittingLabel="Publicando obra..."
          label="Publicar obra"
        />
      </FieldSet>
    </form>
  );
}
