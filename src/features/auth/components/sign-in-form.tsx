"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, AuthInput } from "@/features/auth/schema/auth-schema";
import { FieldGroup, FieldSet } from "@/shared/components/ui/field";
import { FieldInput } from "@/shared/components/form/field-inputs.types";
import { FieldWLabel } from "@/shared/components/form/field-w-label";
import { FormSubmit } from "@/shared/components/form/form-submit";
import { showResponse } from "@/shared/lib/client-actions";
import { signInAction } from "../actions/auth-actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const inputs: FieldInput<AuthInput>[] = [
  {
    label: "Correo electrónico",
    name: "email",
    type: "email",
  },
  {
    label: "Contraseña",
    name: "password",
    type: "password",
  },
];

export function SignInForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<AuthInput>({
    resolver: zodResolver(authSchema),
  });

  const signIn = async (data: AuthInput) => {
    const { message, success } = await signInAction(data);

    if (success) {
        toast.success(message)
        redirect("/dashboard")
    } else {
        toast.error(message)
    }
  };

  return (
    <form onSubmit={handleSubmit(signIn)}>
      <FieldSet>
        <FieldGroup>
          {inputs.map((input) => (
            <FieldWLabel
              error={errors[input.name]?.message}
              key={input.name}
              register={register}
              {...input}
            />
          ))}
        </FieldGroup>
        <FormSubmit
          isSubmitting={isSubmitting}
          isSubmittingLabel="Iniciando sesión..."
          label="Iniciar sesión"
        />
      </FieldSet>
    </form>
  );
}
