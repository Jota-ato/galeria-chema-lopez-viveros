"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ContactFormInput, contactFormSchema } from "../schema/contact-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FieldGroup, FieldSet } from "@/shared/components/ui/field";
import { FieldInput } from "@/shared/components/form/field-inputs.types";
import { FieldWLabel } from "@/shared/components/form/field-w-label";
import { FormSubmit } from "@/shared/components/form/form-submit";

const inputs: FieldInput<ContactFormInput>[] = [
  {
    name: "name",
    label: "Nombre",
    type: "text",
  },
  {
    name: "email",
    label: "Correo electrónico",
    type: "email",
  },
  {
    name: "message",
    label: "Mensaje",
    textarea: true,
  },
];

export function ContactForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: ContactFormInput) => {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ayúdame a ayudarte</CardTitle>
        <CardDescription>
          Por favor, completa el siguiente formulario y me pondré en contacto
          contigo lo antes posible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              label="Enviar"
              isSubmittingLabel="Enviando..."
            />
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
