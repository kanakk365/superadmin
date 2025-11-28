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
  { month: "Jan", revenue: 12000, projected: 10000 },
  { month: "Feb", revenue: 15000, projected: 13000 },
  { month: "Mar", revenue: 18000, projected: 17000 },
  { month: "Apr", revenue: 22000, projected: 20000 },
  { month: "May", revenue: 25000, projected: 24000 },
  { month: "Jun", revenue: 30000, projected: 28000 },
  { month: "Jul", revenue: 35000, projected: 32000 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    theme: {
      light: "oklch(0.488 0.148 179.659)", // teal-700
      dark: "oklch(0.488 0.148 179.659)",
    },
  },
  projected: {
    label: "Projected",
    theme: {
      light: "oklch(0.596 0.183 152.665)", // emerald-600
      dark: "oklch(0.596 0.183 152.665)",
    },
  },
} satisfies ChartConfig;

export const YSNRevenueChart = () => {
  return (
    <div className="rounded-3xl bg-card py-6 px-3 h-full">
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground px-3 mb-8">
        <p className="text-lg font-semibold text-foreground">Revenue Trends</p>
        <span className="hidden h-4 w-px bg-border md:block" />
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-[var(--color-revenue)]" />
            <span className="text-sm text-foreground">Revenue</span>
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-[var(--color-projected)]" />
            <span className="text-sm text-foreground">Projected</span>
          </span>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <RechartsLineChart
            data={chartData}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillProjected" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-projected)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-projected)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

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

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="none"
              fill="url(#fillRevenue)"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="projected"
              stroke="none"
              fill="url(#fillProjected)"
              fillOpacity={0.6}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="projected"
              stroke="var(--color-projected)"
              strokeWidth={2}
              dot={false}
            />
          </RechartsLineChart>
        </ChartContainer>
      </div>
    </div>
  );
};
