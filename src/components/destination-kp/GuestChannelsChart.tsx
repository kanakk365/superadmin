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
} from "@/components/ui/chart";
import {
  getMonthlyAdRevenue,
  getPageAdRevenue,
  MonthlyAdRevenue,
  PageAdRevenue,
} from "@/lib/api/dkp";

const chartConfig = {
  total: {
    label: "Revenue",
    theme: {
      light: "#bd5bf1",
      dark: "#bd5bf1",
    },
  },
} satisfies ChartConfig;

interface ChartDataPoint {
  label: string;
  total: number;
}

export const GuestChannelsChart = ({
  fixedView,
}: {
  fixedView?: "month" | "page";
}) => {
  const [data, setData] = React.useState<ChartDataPoint[]>([]);
  const [totalRevenue, setTotalRevenue] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (fixedView === "month") {
          const response = await getMonthlyAdRevenue();
          if (response.status && response.data) {
            setData(
              response.data.data.map((item) => ({
                label: item.label,
                total: item.total,
              })),
            );
            setTotalRevenue(response.data.total);
          }
        } else if (fixedView === "page") {
          const response = await getPageAdRevenue();
          if (response.status && response.data) {
            setData(
              response.data.data.map((item) => ({
                label: item.label.charAt(0).toUpperCase() + item.label.slice(1),
                total: parseFloat(item.total),
              })),
            );
            setTotalRevenue(response.data.total);
          }
        }
      } catch (err) {
        setError("Failed to load revenue data");
        console.error("Error fetching ad revenue data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fixedView]);

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  return (
    <Card className="rounded-3xl border-border/40 shadow-sm h-full">
      <CardHeader className="flex flex-col gap-4 border-b py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-2xl">
            <DollarSign className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <CardTitle className="text-xl">
              {fixedView === "month"
                ? "Monthly Ad Revenue"
                : fixedView === "page"
                  ? "Revenue by Category"
                  : "Ad Revenue Analytics"}
            </CardTitle>
            <CardDescription>
              {fixedView === "month"
                ? "Monthly advertising revenue breakdown"
                : fixedView === "page"
                  ? "Revenue breakdown by category"
                  : "Overview of ad revenue performance"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {loading ? (
          <div className="animate-pulse">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-20 h-8 bg-muted/50 rounded" />
              <div className="w-24 h-4 bg-muted/50 rounded" />
            </div>
            <div className="h-[300px] bg-muted/30 rounded-lg" />
          </div>
        ) : error ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            {error}
          </div>
        ) : data.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No revenue data available
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">
                {formatCurrency(totalRevenue)}
              </span>
              <span className="text-sm text-muted-foreground">
                total revenue
              </span>
            </div>

            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="label"
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
                  dataKey="total"
                  fill="var(--color-total)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                />
              </BarChart>
            </ChartContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
};
