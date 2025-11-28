"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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
      light: "oklch(0.715 0.143 215.221)", // cyan-500
      dark: "oklch(0.715 0.143 215.221)",
    },
  },
  fortnite: {
    label: "Fortnite",
    theme: {
      light: "oklch(0.738 0.132 237.251)", // sky-500
      dark: "oklch(0.738 0.132 237.251)",
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
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Popular Games</CardTitle>
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
              innerRadius={60}
              strokeWidth={5}
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
            <ChartLegend
              content={<ChartLegendContent />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

