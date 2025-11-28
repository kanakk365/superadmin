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
  { date: "2024-04-01", likes: 222, comments: 150 },
  { date: "2024-04-02", likes: 97, comments: 180 },
  { date: "2024-04-03", likes: 167, comments: 120 },
  { date: "2024-04-04", likes: 242, comments: 260 },
  { date: "2024-04-05", likes: 373, comments: 290 },
  { date: "2024-04-06", likes: 301, comments: 340 },
  { date: "2024-04-07", likes: 245, comments: 180 },
  { date: "2024-04-08", likes: 409, comments: 320 },
  { date: "2024-04-09", likes: 59, comments: 110 },
  { date: "2024-04-10", likes: 261, comments: 190 },
  { date: "2024-04-11", likes: 327, comments: 350 },
  { date: "2024-04-12", likes: 292, comments: 210 },
  { date: "2024-04-13", likes: 342, comments: 380 },
  { date: "2024-04-14", likes: 137, comments: 220 },
  { date: "2024-04-15", likes: 120, comments: 170 },
  { date: "2024-04-16", likes: 138, comments: 190 },
  { date: "2024-04-17", likes: 446, comments: 360 },
  { date: "2024-04-18", likes: 364, comments: 410 },
  { date: "2024-04-19", likes: 243, comments: 180 },
  { date: "2024-04-20", likes: 89, comments: 150 },
  { date: "2024-04-21", likes: 137, comments: 200 },
  { date: "2024-04-22", likes: 224, comments: 170 },
  { date: "2024-04-23", likes: 138, comments: 230 },
  { date: "2024-04-24", likes: 387, comments: 290 },
  { date: "2024-04-25", likes: 215, comments: 250 },
  { date: "2024-04-26", likes: 75, comments: 130 },
  { date: "2024-04-27", likes: 383, comments: 420 },
  { date: "2024-04-28", likes: 122, comments: 180 },
  { date: "2024-04-29", likes: 315, comments: 240 },
  { date: "2024-04-30", likes: 454, comments: 380 },
  { date: "2024-05-01", likes: 165, comments: 220 },
  { date: "2024-05-02", likes: 293, comments: 310 },
  { date: "2024-05-03", likes: 247, comments: 190 },
  { date: "2024-05-04", likes: 385, comments: 420 },
  { date: "2024-05-05", likes: 481, comments: 390 },
  { date: "2024-05-06", likes: 498, comments: 520 },
  { date: "2024-05-07", likes: 388, comments: 300 },
  { date: "2024-05-08", likes: 149, comments: 210 },
  { date: "2024-05-09", likes: 227, comments: 180 },
  { date: "2024-05-10", likes: 293, comments: 330 },
  { date: "2024-05-11", likes: 335, comments: 270 },
  { date: "2024-05-12", likes: 197, comments: 240 },
  { date: "2024-05-13", likes: 197, comments: 160 },
  { date: "2024-05-14", likes: 448, comments: 490 },
  { date: "2024-05-15", likes: 473, comments: 380 },
  { date: "2024-05-16", likes: 338, comments: 400 },
  { date: "2024-05-17", likes: 499, comments: 420 },
  { date: "2024-05-18", likes: 315, comments: 350 },
  { date: "2024-05-19", likes: 235, comments: 180 },
  { date: "2024-05-20", likes: 177, comments: 230 },
  { date: "2024-05-21", likes: 82, comments: 140 },
  { date: "2024-05-22", likes: 81, comments: 120 },
  { date: "2024-05-23", likes: 252, comments: 290 },
  { date: "2024-05-24", likes: 294, comments: 220 },
  { date: "2024-05-25", likes: 201, comments: 250 },
  { date: "2024-05-26", likes: 213, comments: 170 },
  { date: "2024-05-27", likes: 420, comments: 460 },
  { date: "2024-05-28", likes: 233, comments: 190 },
  { date: "2024-05-29", likes: 78, comments: 130 },
  { date: "2024-05-30", likes: 340, comments: 280 },
  { date: "2024-05-31", likes: 178, comments: 230 },
  { date: "2024-06-01", likes: 178, comments: 200 },
  { date: "2024-06-02", likes: 470, comments: 410 },
  { date: "2024-06-03", likes: 103, comments: 160 },
  { date: "2024-06-04", likes: 439, comments: 380 },
  { date: "2024-06-05", likes: 88, comments: 140 },
  { date: "2024-06-06", likes: 294, comments: 250 },
  { date: "2024-06-07", likes: 323, comments: 370 },
  { date: "2024-06-08", likes: 385, comments: 320 },
  { date: "2024-06-09", likes: 438, comments: 480 },
  { date: "2024-06-10", likes: 155, comments: 200 },
  { date: "2024-06-11", likes: 92, comments: 150 },
  { date: "2024-06-12", likes: 492, comments: 420 },
  { date: "2024-06-13", likes: 81, comments: 130 },
  { date: "2024-06-14", likes: 426, comments: 380 },
  { date: "2024-06-15", likes: 307, comments: 350 },
  { date: "2024-06-16", likes: 371, comments: 310 },
  { date: "2024-06-17", likes: 475, comments: 520 },
  { date: "2024-06-18", likes: 107, comments: 170 },
  { date: "2024-06-19", likes: 341, comments: 290 },
  { date: "2024-06-20", likes: 408, comments: 450 },
  { date: "2024-06-21", likes: 169, comments: 210 },
  { date: "2024-06-22", likes: 317, comments: 270 },
  { date: "2024-06-23", likes: 480, comments: 530 },
  { date: "2024-06-24", likes: 132, comments: 180 },
  { date: "2024-06-25", likes: 141, comments: 190 },
  { date: "2024-06-26", likes: 434, comments: 380 },
  { date: "2024-06-27", likes: 448, comments: 490 },
  { date: "2024-06-28", likes: 149, comments: 200 },
  { date: "2024-06-29", likes: 103, comments: 160 },
  { date: "2024-06-30", likes: 446, comments: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  likes: {
    label: "Likes",
    theme: {
      light: "oklch(0.546 0.245 291.338)", // purple-600
      dark: "oklch(0.546 0.245 291.338)",
    },
  },
  comments: {
    label: "Comments",
    theme: {
      light: "oklch(0.656 0.256 299.841)", // violet-400
      dark: "oklch(0.656 0.256 299.841)",
    },
  },
} satisfies ChartConfig;

export function EngagementAreaChart() {
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
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Engagement Overview</CardTitle>
          <CardDescription>
            Likes & Comments for the last 3 months
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
              <linearGradient id="fillLikes" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-likes)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-likes)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillComments" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-comments)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-comments)"
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
              dataKey="comments"
              type="natural"
              fill="url(#fillComments)"
              stroke="var(--color-comments)"
              stackId="a"
            />
            <Area
              dataKey="likes"
              type="natural"
              fill="url(#fillLikes)"
              stroke="var(--color-likes)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
