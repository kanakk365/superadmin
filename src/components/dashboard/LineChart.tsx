"use client";

import { cn } from "@/lib/utils";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { month: "January", current: 12, currentProjection: null, previous: 9 },
  { month: "February", current: 10, currentProjection: null, previous: 16 },
  { month: "March", current: 9, currentProjection: null, previous: 13 },
  { month: "April", current: 11, currentProjection: null, previous: 10 },
  { month: "May", current: 14, currentProjection: 14, previous: 12 },
  { month: "June", current: null, currentProjection: 19, previous: 20 },
];

const chartConfig = {
  previous: {
    label: "Previous Week",
    theme: {
      light: "#91B7F9",
      dark: "#a8c5da",
    },
  },
  current: {
    label: "Current Week",
    theme: {
      light: "#111827",
      dark: "#a8c5da",
    },
  },
  currentProjection: {
    label: "Projected",
    theme: {
      light: "#111827",
      dark: "#c6c7f8",
    },
  },
} satisfies ChartConfig;

type RevenueLineChartProps = {
  className?: string;
};

export const LineChart = ({ className }: RevenueLineChartProps) => (
  <ChartContainer
    config={chartConfig}
    className={cn("h-full w-full ", className)}
  >
    <RechartsLineChart
      data={chartData}
      margin={{ top: 0, right: 0, bottom:0, left: 0 }}
    >
      <defs>
        <linearGradient id="previousWeekGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--line-gradient-start)" stopOpacity={0.7} />
          <stop offset="100%" stopColor="var(--line-gradient-start)" stopOpacity={0} />
        </linearGradient>
      </defs>

      <CartesianGrid stroke="var(--line-grid-stroke)" vertical={false} />
      <XAxis
        dataKey="month"
        axisLine={false}
        tickLine={false}
        tickMargin={12}
        tickFormatter={(value) => value.slice(0, 3)}
        padding={{ left: 30, right: 0 }}
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        ticks={[10, 20, 30]}
        domain={[0, 30]}
        tickMargin={16}
        tick={{ fill: "var(--line-tick-color)", fontSize: 12 }}
        tickFormatter={(value) => `${value}M`}
        padding={{ top: 0, bottom: 20 }}
      />
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent hideLabel />}
        formatter={(value: number) => [`$${value}M`]}
      />
      <Area
        type="monotone"
        dataKey="previous"
        stroke="none"
        fill="url(#previousWeekGradient)"
        fillOpacity={1}
        activeDot={false}
      />
      <Line
        type="monotone"
        dataKey="previous"
        stroke="var(--color-previous)"
        strokeWidth={3}
        dot={false}
      />
      <Line
        type="monotone"
        dataKey="current"
        stroke="var(--color-current)"
        strokeWidth={3}
        dot={false}
      />
      <Line
        type="monotone"
        dataKey="currentProjection"
        stroke="var(--color-currentProjection)"
        strokeWidth={3}
        dot={false}
        strokeDasharray="6 6"
        connectNulls
      />
    </RechartsLineChart>
  </ChartContainer>
);
