import { auth } from "@/lib/auth";
import { AppError } from "@/shared/lib/errors";
import { APIError } from "better-auth";
import { headers } from "next/headers";

class AuthService {
    async signIn(email: string, password: string) {
        try {
            await auth.api.signInEmail({
                body: {
                    email,
                    password,
                    callbackURL: "/dashboard"
                },
                headers: await headers()
            })
        } catch (err) {
            if (err instanceof APIError) {
                throw new AppError(err.message)
            }
            throw new AppError("Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.")
        }
    }
}

export const authService = new AuthService();