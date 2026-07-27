"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";

const chartData = [
  { month: "Mayo", ventas: 18500, comisiones: 6200 },
  { month: "Junio", ventas: 23400, comisiones: 4100 },
  { month: "Julio", ventas: 27800, comisiones: 9300 },
];

const chartConfig = {
  ventas: {
    label: "Venta de cuadros",
    color: "var(--chart-1)",
  },
  comisiones: {
    label: "Comisiones / encargos",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function PainterIncomeChart() {
  return (
    <ChartContainer config={chartConfig} className="h-75 w-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{ left: 12, right: 12 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <defs>
          <linearGradient id="fillVentas" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-ventas)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-ventas)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillComisiones" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-comisiones)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-comisiones)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="comisiones"
          type="natural"
          fill="url(#fillComisiones)"
          fillOpacity={0.4}
          stroke="var(--color-comisiones)"
          stackId="a"
        />
        <Area
          dataKey="ventas"
          type="natural"
          fill="url(#fillVentas)"
          fillOpacity={0.4}
          stroke="var(--color-ventas)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
