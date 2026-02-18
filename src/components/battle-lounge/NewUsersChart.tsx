"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

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
import { NewUsersData } from "@/lib/api/battle-lounge/organizer";

const chartConfig = {
  newUsers: {
    label: "New Users",
    theme: {
      light: "#bd5bf1",
      dark: "#bd5bf1",
    },
  },
} satisfies ChartConfig;

type TimeRange = "day" | "week" | "month" | "year";

interface NewUsersChartProps {
  data?: NewUsersData;
}

export function NewUsersChart({ data }: NewUsersChartProps) {
  const [timeRange, setTimeRange] = React.useState<TimeRange>("month");

  const getChartData = () => {
    if (!data) return [];
    let periodData: any[] = [];
    switch (timeRange) {
      case "day":
        periodData = data.days?.data || [];
        break;
      case "week":
        periodData = data.weeks?.data || [];
        break;
      case "month":
        periodData = data.months?.data || [];
        break;
      case "year":
        periodData = data.years?.data || [];
        break;
      default:
        periodData = data.months?.data || [];
    }

    return periodData.map((item) => ({
      label: item.label,
      newUsers: item.total,
    }));
  };

  const getTotalNewUsers = () => {
    if (!data) return 0;
    switch (timeRange) {
      case "day":
        return data.days?.total_created || 0;
      case "week":
        return data.weeks?.total_created || 0;
      case "month":
        return data.months?.total_created || 0;
      case "year":
        return data.years?.total_created || 0;
      default:
        return data.months?.total_created || 0;
    }
  };

  const timeRangeOptions: { value: TimeRange; label: string }[] = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
  ];

  const chartData = getChartData();

  return (
    <Card className="rounded-[32px] border-border/40 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b py-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-2xl">
            <UserPlus className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <CardTitle className="text-xl">New Users</CardTitle>
            <CardDescription>
              Total:{" "}
              <span className="font-bold text-foreground">
                {getTotalNewUsers().toLocaleString()}
              </span>
            </CardDescription>
          </div>
        </div>
        <div className="flex gap-1 bg-muted/50 p-1 rounded-xl">
          {timeRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
                timeRange === option.value
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-4 pt-6 pb-0">
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-[370px] w-full">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillNewUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#bd5bf1" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#7a33e1" stopOpacity={0.9} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <ChartTooltip
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar
                dataKey="newUsers"
                fill="url(#fillNewUsers)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="h-[370px] w-full flex items-center justify-center">
            <span className="text-muted-foreground">No data available</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
