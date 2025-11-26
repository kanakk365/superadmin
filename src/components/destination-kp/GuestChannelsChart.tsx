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
  { date: "Apr 4", digital: 40, campus: 20 },
  { date: "Apr 10", digital: 120, campus: 40 },
  { date: "Apr 16", digital: 160, campus: 60 },
  { date: "Apr 22", digital: 180, campus: 110 },
  { date: "Apr 28", digital: 165, campus: 115 },
  { date: "May 4", digital: 155, campus: 85 },
  { date: "May 10", digital: 165, campus: 95 },
  { date: "May 16", digital: 160, campus: 60 },
  { date: "May 22", digital: 175, campus: 120 },
  { date: "May 28", digital: 165, campus: 110 },
  { date: "Jun 3", digital: 155, campus: 60 },
  { date: "Jun 9", digital: 150, campus: 50 },
  { date: "Jun 15", digital: 160, campus: 150 },
  { date: "Jun 21", digital: 168, campus: 160 },
  { date: "Jun 30", digital: 160, campus: 70 },
];

const chartConfig = {
  digital: {
    label: "Digital Interest",
    theme: {
      light: "#111827", // dark color
      dark: "#c6c7f8",
    },
  },
  campus: {
    label: "On-site",
    theme: {
      light: "#91B7F9", // light blue
      dark: "#a8c5da",
    },
  },
} satisfies ChartConfig;

export const GuestChannelsChart = () => {
  return (
    <div className="rounded-3xl bg-card py-6 px-3 h-full">
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground px-3 mb-8">
        <p className="text-lg font-semibold text-foreground">Guest Channels</p>
        <span className="hidden h-4 w-px bg-border md:block" />
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-[var(--color-digital)]" />
            <span className="text-sm text-foreground">Digital</span>
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-[var(--color-campus)]" />
            <span className="text-sm text-foreground">On-site</span>
          </span>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ChartContainer
            config={chartConfig}
            className="h-full w-full"
        >
            <RechartsLineChart
            data={chartData}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
            <defs>
                <linearGradient id="fillDigital" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-digital)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-digital)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillCampus" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-campus)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-campus)" stopOpacity={0.1} />
                </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--line-grid-stroke)" />
            <XAxis
                dataKey="date"
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
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
            />
            
            <Area
                type="monotone"
                dataKey="digital"
                stroke="none"
                fill="url(#fillDigital)"
                fillOpacity={0.6}
            />
            <Area
                type="monotone"
                dataKey="campus"
                stroke="none"
                fill="url(#fillCampus)"
                fillOpacity={0.6}
            />

            <Line
                type="monotone"
                dataKey="digital"
                stroke="var(--color-digital)"
                strokeWidth={2}
                dot={false}
            />
            <Line
                type="monotone"
                dataKey="campus"
                stroke="var(--color-campus)"
                strokeWidth={2}
                dot={false}
            />
            </RechartsLineChart>
        </ChartContainer>
      </div>
    </div>
  );
};

