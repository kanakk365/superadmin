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

import { PopularGamesData } from "@/lib/api/battle-lounge/organizer";

interface PopularGamesPieProps {
  data?: PopularGamesData;
}

const COLORS = [
  "var(--color-cod)",
  "var(--color-fortnite)",
  "var(--color-apex)",
  "var(--color-valorant)",
  "var(--color-other)",
];

const DEFAULT_CHART_CONFIG = {
  players: { label: "Players" },
  cod: { label: "Call of Duty", theme: { light: "#bd5bf1", dark: "#bd5bf1" } },
  fortnite: { label: "Fortnite", theme: { light: "#7a33e1", dark: "#7a33e1" } },
  apex: {
    label: "Apex Legends",
    theme: {
      light: "oklch(0.623 0.214 259.815)",
      dark: "oklch(0.623 0.214 259.815)",
    },
  },
  valorant: {
    label: "Valorant",
    theme: {
      light: "oklch(0.552 0.096 245.331)",
      dark: "oklch(0.552 0.096 245.331)",
    },
  },
  other: {
    label: "Other",
    theme: {
      light: "oklch(0.704 0.04 256.7)",
      dark: "oklch(0.704 0.04 256.7)",
    },
  },
} satisfies ChartConfig;

export function PopularGamesPie({ data }: PopularGamesPieProps) {
  const chartData = React.useMemo(() => {
    if (!data || !data.games || data.games.length === 0) return [];

    // Assuming game object has name/game and players count.
    // Since we don't know exact structure, we try common fields.
    return data.games.map((g: any, index) => ({
      game: g.game_name || g.name || "Unknown",
      players: g.players || 0,
      fill: COLORS[index % COLORS.length],
    }));
  }, [data]);

  const totalPlayers = React.useMemo(() => {
    return (
      data?.total_players ||
      chartData.reduce((acc, curr) => acc + curr.players, 0)
    );
  }, [data, chartData]);

  return (
    <Card className="flex flex-col h-full gap-10 rounded-[32px] border-border/40 shadow-sm overflow-hidden">
      <CardHeader className="items-center pt-3">
        <CardTitle className="text-xl">Popular Games</CardTitle>
        <CardDescription>Most played titles this month</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {chartData.length > 0 ? (
          <ChartContainer
            config={DEFAULT_CHART_CONFIG}
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
        ) : (
          <div className="h-[250px] flex items-center justify-center">
            <span className="text-muted-foreground">
              No popular games data available
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
