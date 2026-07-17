"use server";

import { notLoggedAction } from "@/shared/lib/actions";
import { AuthInput, authSchema } from "../schema/auth-schema";
import { authService } from "../services/auth-service";
import { AppError } from "@/shared/lib/errors";

export const signInAction = notLoggedAction(async (data: AuthInput) => {
  const zodResponse = authSchema.safeDecode(data);

  if (!zodResponse.success) {
    throw new AppError("Invalid input data");
  }

  await authService.signIn(data.email, data.password);
  return "Sesión iniciada correctamente";
});
