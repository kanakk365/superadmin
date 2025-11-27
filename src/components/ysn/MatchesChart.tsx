"use client";

import { cn } from "@/lib/utils";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "Jan", played: 45, scheduled: 50 },
  { month: "Feb", played: 52, scheduled: 60 },
  { month: "Mar", played: 48, scheduled: 55 },
  { month: "Apr", played: 60, scheduled: 65 },
  { month: "May", played: 55, scheduled: 60 },
  { month: "Jun", played: 70, scheduled: 75 },
];

const chartConfig = {
  played: {
    label: "Played",
    theme: {
      light: "oklch(0.5417 0.1790 288.0332)",
      dark: "oklch(0.7162 0.1597 290.3962)",
    },
  },
  scheduled: {
    label: "Scheduled",
    theme: {
      light: "oklch(0.5679 0.2113 276.7065)",
      dark: "oklch(0.7482 0.1235 244.7492)",
    },
  },
} satisfies ChartConfig;

export const MatchesChart = () => {
  return (
    <div className="rounded-3xl bg-card py-6 px-3 h-full">
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground px-3 mb-8">
        <p className="text-lg font-semibold text-foreground">
          Match Statistics
        </p>
        <span className="hidden h-4 w-px bg-border md:block" />
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-[var(--color-played)]" />
            <span className="text-sm text-foreground">Played</span>
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-[var(--color-scheduled)]" />
            <span className="text-sm text-foreground">Scheduled</span>
          </span>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            data={chartData}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--line-grid-stroke)"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={12}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={16}
              padding={{ top: 20, bottom: 20 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Bar
              dataKey="played"
              fill="var(--color-played)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="scheduled"
              fill="var(--color-scheduled)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};
