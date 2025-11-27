"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { date: "2024-06-24", impressions: 214 },
  { date: "2024-06-25", impressions: 185 },
  { date: "2024-06-26", impressions: 320 },
  { date: "2024-06-27", impressions: 450 },
  { date: "2024-06-28", impressions: 380 },
  { date: "2024-06-29", impressions: 420 },
  { date: "2024-06-30", impressions: 390 },
  { date: "2024-07-01", impressions: 410 },
  { date: "2024-07-02", impressions: 520 },
  { date: "2024-07-03", impressions: 480 },
  { date: "2024-07-04", impressions: 350 },
  { date: "2024-07-05", impressions: 290 },
  { date: "2024-07-06", impressions: 410 },
  { date: "2024-07-07", impressions: 450 },
  { date: "2024-07-08", impressions: 380 },
  { date: "2024-07-09", impressions: 320 },
  { date: "2024-07-10", impressions: 420 },
];

const chartConfig = {
  impressions: {
    label: "Impressions",
    theme: {
      light: "oklch(0.5417 0.1790 288.0332)",
      dark: "oklch(0.7162 0.1597 290.3962)",
    },
  },
} satisfies ChartConfig;

export function ImpressionsBarChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("impressions");

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Daily Impressions</CardTitle>
          <CardDescription>
            Showing total impressions for the last 30 days
          </CardDescription>
        </div>
        <div className="flex">
          <div
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
            data-active={true}
          >
            <span className="text-xs text-muted-foreground">
              {chartConfig.impressions.label}
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {chartData
                .reduce((acc, curr) => acc + curr.impressions, 0)
                .toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="impressions"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey="impressions"
              fill={`var(--color-impressions)`}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
