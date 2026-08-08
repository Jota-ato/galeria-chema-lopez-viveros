import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useEffect } from "react";
import {
  CollectionInput,
  collectionSchema,
} from "@/features/collections/schemas/collection-schema";
import { generateSlug } from "@/shared/lib/slug";
import { useCollectionStore } from "../stores/collection-store";
import { showResponse } from "@/shared/lib/client-actions";
import { createCollectionAction } from "../actions/collections-actions";

export function useCollectionForm() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CollectionInput>({
    resolver: zodResolver(collectionSchema),
    defaultValues: { status: "draft" },
  });

  const setStep = useCollectionStore(state => state.setStep);
  const setData = useCollectionStore(state => state.setData);

  const name = useWatch({ control, name: "name" });
  const status = useWatch({ control, name: "status" });
  const banner = useWatch({ control, name: "banner" });

  useEffect(() => {
    const nextSlug = name ? generateSlug(name) : "";
    setValue("slug", nextSlug, { shouldValidate: false });
  }, [name, setValue]);

  const slugPreview = useMemo(() => {
    if (!name) return "";
    return generateSlug(name);
  }, [name]);

  const onSubmit = async (data: CollectionInput) => {

    const response = showResponse(await createCollectionAction(data))

    if (!response || !response.sucess) return
    
    setData(response.data);
    setStep(2);
  };

  return {
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
  };
}
