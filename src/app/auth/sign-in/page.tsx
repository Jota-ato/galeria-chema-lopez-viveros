import { requireAuth } from "@/lib/auth-server"
import { redirect } from "next/navigation"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/shared/components/ui/card"
import { Heading } from "@/shared/components/typography/heading"
import { SignInForm } from "@/features/auth/components/sign-in-form"

export default async function SignInPage() {

    const { session } = await requireAuth()
    if (session) redirect("/dashboard")

  return (
    <div className="min-h-screen flex flex-col gap-8 items-center justify-center">
        <Heading>Ingresa al panel de control</Heading>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Inicia sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder al panel de control.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  )
}