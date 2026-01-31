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
import { ReachImpressionData } from "@/lib/api/battle-lounge/organizer";

interface BattleLoungeReachChartProps {
  data?: ReachImpressionData;
}

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

export function BattleLoungeReachChart({ data }: BattleLoungeReachChartProps) {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = React.useMemo(() => {
    if (!data) return [];
    let currentData: any[] = [];
    switch (timeRange) {
      case "7d":
        currentData = data.last_7_days || [];
        break;
      case "30d":
        currentData = data.last_30_days || [];
        break;
      case "90d":
        currentData = data.last_3months || [];
        break;
      default:
        currentData = data.last_3months || [];
    }

    return currentData.map((item) => ({
      date: item.label,
      reach: item.reaches,
      impressions: item.impressions,
    }));
  }, [data, timeRange]);

  return (
    <Card className="pt-0 rounded-[32px]">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-8 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Reach & Impressions</CardTitle>
          <CardDescription>
            Showing reach and impressions statistics
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
        {filteredData.length > 0 ? (
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
                <linearGradient
                  id="fillImpressions"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
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
                tickFormatter={(value) => value}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => value}
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
        ) : (
          <div className="h-[250px] w-full flex items-center justify-center">
            <span className="text-muted-foreground">
              No reach data available
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
