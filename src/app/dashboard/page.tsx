import { PainterIncomeChart } from "@/shared/components/dashboard/charts/main-chart";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import Link from "next/link";

export default async function DashboardHomePage() {
  return (
    <>
      <Heading>Inicio</Heading>
      <div className="grid md:grid-cols-4 gap-4 md:grid-rows-3">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Publicar nueva obra</CardTitle>
            <CardDescription>
              Publica una nueva obra en la galería. Asegúrate de tener todos los
              detalles y la imagen de la obra listos antes de proceder.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1" />
          <CardFooter>
            <Button
              render={<Link href="/dashboard/obras/publish" />}
              nativeButton={false}
            >
              Publicar obra
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Crear una nueva colección</CardTitle>
            <CardDescription>
              Agrega obras ya existentes a la colección.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1" />
          <CardFooter>
            <Button>Crear colección</Button>
          </CardFooter>
        </Card>
        <Card className="md:col-span-full md:row-span-2">
          <CardHeader>
            <CardTitle>Ingresos estimados</CardTitle>
            <CardDescription>
              Visualiza tus ingresos estimados y el rendimiento de tus obras en
              el tiempo. Mantente informado sobre cómo tus obras están generando
              ingresos y ajusta tu estrategia según sea necesario.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <PainterIncomeChart />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
