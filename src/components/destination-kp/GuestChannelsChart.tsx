"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Users } from "lucide-react";
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
import { getGuestChannel, GuestChannelData } from "@/lib/api/dkp";

const chartConfig = {
  digital: {
    label: "Digital",
    theme: {
      light: "#8b5cf6",
      dark: "#a78bfa",
    },
  },
  on_site: {
    label: "On-Site",
    theme: {
      light: "#ec4899",
      dark: "#f472b6",
    },
  },
} satisfies ChartConfig;

export const GuestChannelsChart = ({
  fixedView,
}: {
  fixedView?: "month" | "page";
}) => {
  const [data, setData] = React.useState<GuestChannelData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getGuestChannel();
        if (response.status && response.data) {
          setData(response.data);
        }
      } catch (err) {
        setError("Failed to load guest channel data");
        console.error("Error fetching guest channel data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalDigital = data.reduce((acc, item) => acc + item.digital, 0);
  const totalOnSite = data.reduce((acc, item) => acc + item.on_site, 0);
  const totalGuests = totalDigital + totalOnSite;

  return (
    <Card className="rounded-3xl border-border/40 shadow-sm h-full">
      <CardHeader className="flex flex-col gap-4 border-b py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-2xl">
            <Users className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <CardTitle className="text-xl">
              {fixedView === "month"
                ? "Guest Channels by Week"
                : fixedView === "page"
                  ? "Guest Channels Overview"
                  : "Guest Channels"}
            </CardTitle>
            <CardDescription>Digital vs On-Site visitors</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-muted-foreground">Digital</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-pink-500" />
            <span className="text-muted-foreground">On-Site</span>
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
            No guest channel data available
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">
                {totalGuests.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">
                total guests
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
                />
                <ChartTooltip
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="digital"
                  fill="var(--color-digital)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={30}
                />
                <Bar
                  dataKey="on_site"
                  fill="var(--color-on_site)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={30}
                />
              </BarChart>
            </ChartContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
};
