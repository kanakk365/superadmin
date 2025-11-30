"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { date: "2024-04-01", reach: 222, impressions: 150 },
  { date: "2024-04-02", reach: 97, impressions: 180 },
  { date: "2024-04-03", reach: 167, impressions: 120 },
  { date: "2024-04-04", reach: 242, impressions: 260 },
  { date: "2024-04-05", reach: 373, impressions: 290 },
  { date: "2024-04-06", reach: 301, impressions: 340 },
  { date: "2024-04-07", reach: 245, impressions: 180 },
  { date: "2024-04-08", reach: 409, impressions: 320 },
  { date: "2024-04-09", reach: 59, impressions: 110 },
  { date: "2024-04-10", reach: 261, impressions: 190 },
  { date: "2024-04-11", reach: 327, impressions: 350 },
  { date: "2024-04-12", reach: 292, impressions: 210 },
  { date: "2024-04-13", reach: 342, impressions: 380 },
  { date: "2024-04-14", reach: 137, impressions: 220 },
  { date: "2024-04-15", reach: 120, impressions: 170 },
  { date: "2024-04-16", reach: 138, impressions: 190 },
  { date: "2024-04-17", reach: 446, impressions: 360 },
  { date: "2024-04-18", reach: 364, impressions: 410 },
  { date: "2024-04-19", reach: 243, impressions: 180 },
  { date: "2024-04-20", reach: 89, impressions: 150 },
  { date: "2024-04-21", reach: 137, impressions: 200 },
  { date: "2024-04-22", reach: 224, impressions: 170 },
  { date: "2024-04-23", reach: 138, impressions: 230 },
  { date: "2024-04-24", reach: 387, impressions: 290 },
  { date: "2024-04-25", reach: 215, impressions: 250 },
  { date: "2024-04-26", reach: 75, impressions: 130 },
  { date: "2024-04-27", reach: 383, impressions: 420 },
  { date: "2024-04-28", reach: 122, impressions: 180 },
  { date: "2024-04-29", reach: 315, impressions: 240 },
  { date: "2024-04-30", reach: 454, impressions: 380 },
  { date: "2024-05-01", reach: 165, impressions: 220 },
  { date: "2024-05-02", reach: 293, impressions: 310 },
  { date: "2024-05-03", reach: 247, impressions: 190 },
  { date: "2024-05-04", reach: 385, impressions: 420 },
  { date: "2024-05-05", reach: 481, impressions: 390 },
  { date: "2024-05-06", reach: 498, impressions: 520 },
  { date: "2024-05-07", reach: 388, impressions: 300 },
  { date: "2024-05-08", reach: 149, impressions: 210 },
  { date: "2024-05-09", reach: 227, impressions: 180 },
  { date: "2024-05-10", reach: 293, impressions: 330 },
  { date: "2024-05-11", reach: 335, impressions: 270 },
  { date: "2024-05-12", reach: 197, impressions: 240 },
  { date: "2024-05-13", reach: 197, impressions: 160 },
  { date: "2024-05-14", reach: 448, impressions: 490 },
  { date: "2024-05-15", reach: 473, impressions: 380 },
  { date: "2024-05-16", reach: 338, impressions: 400 },
  { date: "2024-05-17", reach: 499, impressions: 420 },
  { date: "2024-05-18", reach: 315, impressions: 350 },
  { date: "2024-05-19", reach: 235, impressions: 180 },
  { date: "2024-05-20", reach: 177, impressions: 230 },
  { date: "2024-05-21", reach: 82, impressions: 140 },
  { date: "2024-05-22", reach: 81, impressions: 120 },
  { date: "2024-05-23", reach: 252, impressions: 290 },
  { date: "2024-05-24", reach: 294, impressions: 220 },
  { date: "2024-05-25", reach: 201, impressions: 250 },
  { date: "2024-05-26", reach: 213, impressions: 170 },
  { date: "2024-05-27", reach: 420, impressions: 460 },
  { date: "2024-05-28", reach: 233, impressions: 190 },
  { date: "2024-05-29", reach: 78, impressions: 130 },
  { date: "2024-05-30", reach: 340, impressions: 280 },
  { date: "2024-05-31", reach: 178, impressions: 230 },
  { date: "2024-06-01", reach: 178, impressions: 200 },
  { date: "2024-06-02", reach: 470, impressions: 410 },
  { date: "2024-06-03", reach: 103, impressions: 160 },
  { date: "2024-06-04", reach: 439, impressions: 380 },
  { date: "2024-06-05", reach: 88, impressions: 140 },
  { date: "2024-06-06", reach: 294, impressions: 250 },
  { date: "2024-06-07", reach: 323, impressions: 370 },
  { date: "2024-06-08", reach: 385, impressions: 320 },
  { date: "2024-06-09", reach: 438, impressions: 480 },
  { date: "2024-06-10", reach: 155, impressions: 200 },
  { date: "2024-06-11", reach: 92, impressions: 150 },
  { date: "2024-06-12", reach: 492, impressions: 420 },
  { date: "2024-06-13", reach: 81, impressions: 130 },
  { date: "2024-06-14", reach: 426, impressions: 380 },
  { date: "2024-06-15", reach: 307, impressions: 350 },
  { date: "2024-06-16", reach: 371, impressions: 310 },
  { date: "2024-06-17", reach: 475, impressions: 520 },
  { date: "2024-06-18", reach: 107, impressions: 170 },
  { date: "2024-06-19", reach: 341, impressions: 290 },
  { date: "2024-06-20", reach: 408, impressions: 450 },
  { date: "2024-06-21", reach: 169, impressions: 210 },
  { date: "2024-06-22", reach: 317, impressions: 270 },
  { date: "2024-06-23", reach: 480, impressions: 530 },
  { date: "2024-06-24", reach: 132, impressions: 180 },
  { date: "2024-06-25", reach: 141, impressions: 190 },
  { date: "2024-06-26", reach: 434, impressions: 380 },
  { date: "2024-06-27", reach: 448, impressions: 490 },
  { date: "2024-06-28", reach: 149, impressions: 200 },
  { date: "2024-06-29", reach: 103, impressions: 160 },
  { date: "2024-06-30", reach: 446, impressions: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  reach: {
    label: "Reach",
    theme: {
      light: "#bd5bf1",
      dark: "#bd5bf1",
    },
  },
  impressions: {
    label: "Impressions",
    theme: {
      light: "#7a33e1",
      dark: "#7a33e1",
    },
  },
} satisfies ChartConfig;

export function BattleLoungeReachChart() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="pt-0 rounded-[32px] ">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-8 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Reach & Impressions</CardTitle>
          <CardDescription>
            Showing reach and impressions for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillReach" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-reach)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-reach)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillImpressions" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-impressions)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-impressions)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
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
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="impressions"
              type="natural"
              fill="url(#fillImpressions)"
              stroke="var(--color-impressions)"
              stackId="a"
            />
            <Area
              dataKey="reach"
              type="natural"
              fill="url(#fillReach)"
              stroke="var(--color-reach)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
