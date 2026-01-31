"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { DollarSign } from "lucide-react";
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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const monthData = [
  { name: "Jan", revenue: 4500 },
  { name: "Feb", revenue: 5200 },
  { name: "Mar", revenue: 4800 },
  { name: "Apr", revenue: 6100 },
  { name: "May", revenue: 5500 },
  { name: "Jun", revenue: 6700 },
  { name: "Jul", revenue: 7200 },
  { name: "Aug", revenue: 6900 },
  { name: "Sep", revenue: 7800 },
  { name: "Oct", revenue: 8500 },
  { name: "Nov", revenue: 9100 },
  { name: "Dec", revenue: 9800 },
];

const pageData = [
  { name: "Home", revenue: 12500 },
  { name: "Dashboard", revenue: 8400 },
  { name: "Marketplace", revenue: 15600 },
  { name: "Battle Lounge", revenue: 9200 },
  { name: "Profile", revenue: 4300 },
  { name: "Settings", revenue: 2100 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    theme: {
      light: "#bd5bf1",
      dark: "#bd5bf1",
    },
  },
} satisfies ChartConfig;

export const GuestChannelsChart = () => {
  const [viewBy, setViewBy] = React.useState<"month" | "page">("month");

  const currentData = viewBy === "month" ? monthData : pageData;

  const totalRevenue = currentData.reduce((acc, item) => acc + item.revenue, 0);

  return (
    <Card className="rounded-3xl border-border/40 shadow-sm h-full">
      <CardHeader className="flex flex-col gap-4 border-b py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-2xl">
            <DollarSign className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <CardTitle className="text-xl">Revenue Analytics</CardTitle>
            <CardDescription>Overview of revenue performance</CardDescription>
          </div>
        </div>
        <Select
          value={viewBy}
          onValueChange={(value) => setViewBy(value as "month" | "page")}
        >
          <SelectTrigger className="w-[120px] h-9 bg-muted/50 border-0 focus:ring-0 rounded-lg">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Monthly</SelectItem>
            <SelectItem value="page">Page Wise</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-6 flex items-center gap-2">
          <span className="text-2xl font-bold text-foreground">
            ${totalRevenue.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">total revenue</span>
        </div>

        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            data={currentData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="revenue"
              fill="var(--color-revenue)"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
