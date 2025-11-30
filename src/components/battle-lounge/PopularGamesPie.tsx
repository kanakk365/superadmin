"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { Gamepad2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { game: "Call of Duty", players: 1500, fill: "var(--color-cod)" },
  { game: "Fortnite", players: 1200, fill: "var(--color-fortnite)" },
  { game: "Apex Legends", players: 800, fill: "var(--color-apex)" },
  { game: "Valorant", players: 600, fill: "var(--color-valorant)" },
  { game: "Other", players: 300, fill: "var(--color-other)" },
];

const chartConfig = {
  players: {
    label: "Players",
  },
  cod: {
    label: "Call of Duty",
    theme: {
      light: "#bd5bf1",
      dark: "#bd5bf1",
    },
  },
  fortnite: {
    label: "Fortnite",
    theme: {
      light: "#7a33e1",
      dark: "#7a33e1",
    },
  },
  apex: {
    label: "Apex Legends",
    theme: {
      light: "oklch(0.623 0.214 259.815)", // blue-500
      dark: "oklch(0.623 0.214 259.815)",
    },
  },
  valorant: {
    label: "Valorant",
    theme: {
      light: "oklch(0.552 0.096 245.331)", // indigo-500
      dark: "oklch(0.552 0.096 245.331)",
    },
  },
  other: {
    label: "Other",
    theme: {
      light: "oklch(0.704 0.04 256.7)", // slate-400
      dark: "oklch(0.704 0.04 256.7)",
    },
  },
} satisfies ChartConfig;

export function PopularGamesPie() {
  const totalPlayers = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.players, 0);
  }, []);

  return (
    <Card className="flex flex-col h-full gap-10 rounded-[32px] border-border/40 shadow-sm overflow-hidden">
      <CardHeader className="items-center pt-3">
        <CardTitle className="text-xl">Popular Games</CardTitle>
        <CardDescription>Most played titles this month</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="players"
              nameKey="game"
              innerRadius={90}
              outerRadius={120}
              strokeWidth={5}
              cy={125}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalPlayers.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs"
                        >
                          Players
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
