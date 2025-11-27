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
      light: "oklch(0.5417 0.1790 288.0332)",
      dark: "oklch(0.7162 0.1597 290.3962)",
    },
  },
  fortnite: {
    label: "Fortnite",
    theme: {
      light: "oklch(0.5679 0.2113 276.7065)",
      dark: "oklch(0.7482 0.1235 244.7492)",
    },
  },
  apex: {
    label: "Apex Legends",
    theme: {
      light: "oklch(0.7042 0.1602 288.9880)",
      dark: "oklch(0.6382 0.1047 274.9117)",
    },
  },
  valorant: {
    label: "Valorant",
    theme: {
      light: "oklch(0.488 0.243 264.376)",
      dark: "oklch(0.488 0.243 264.376)",
    },
  },
  other: {
    label: "Other",
    theme: {
      light: "oklch(0.87 0.02 240)",
      dark: "oklch(0.87 0.02 240)",
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

