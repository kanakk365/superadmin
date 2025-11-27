"use client";

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
  { date: "Jan 1", reach: 45000 },
  { date: "Jan 8", reach: 52000 },
  { date: "Jan 15", reach: 61000 },
  { date: "Jan 22", reach: 58000 },
  { date: "Jan 29", reach: 67000 },
  { date: "Feb 5", reach: 73000 },
  { date: "Feb 12", reach: 81000 },
  { date: "Feb 19", reach: 89000 },
  { date: "Feb 26", reach: 95000 },
  { date: "Mar 5", reach: 102000 },
  { date: "Mar 12", reach: 115000 },
  { date: "Mar 19", reach: 128000 },
];

const chartConfig = {
  reach: {
    label: "Reach",
    theme: {
      light: "oklch(0.5417 0.1790 288.0332)",
      dark: "oklch(0.7162 0.1597 290.3962)",
    },
  },
} satisfies ChartConfig;

export const ReachChart = () => {
  return (
    <div className="rounded-3xl bg-card py-6 px-6 h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Reach</h3>
        <p className="text-3xl font-bold text-foreground">128K</p>
      </div>

      <div className="h-[200px] w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <RechartsLineChart
            data={chartData}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="fillReach" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-reach)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-reach)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--line-grid-stroke)"
            />
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Area
              type="monotone"
              dataKey="reach"
              stroke="none"
              fill="url(#fillReach)"
              fillOpacity={1}
            />

            <Line
              type="monotone"
              dataKey="reach"
              stroke="var(--color-reach)"
              strokeWidth={3}
              dot={false}
            />
          </RechartsLineChart>
        </ChartContainer>
      </div>
    </div>
  );
};
