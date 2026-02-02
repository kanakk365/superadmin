"use client";

import { useEffect, useState } from "react";
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
import { getEventAttendanceTrends, EventAttendanceTrend } from "@/lib/api/dkp";

const chartConfig = {
  attendees: {
    label: "Attendees",
    theme: {
      light: "oklch(0.5417 0.1790 288.0332)",
      dark: "oklch(0.7162 0.1597 290.3962)",
    },
  },
  projected: {
    label: "Projected",
    theme: {
      light: "oklch(0.5679 0.2113 276.7065)",
      dark: "oklch(0.7482 0.1235 244.7492)",
    },
  },
} satisfies ChartConfig;

export const EventsChart = () => {
  const [data, setData] = useState<EventAttendanceTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getEventAttendanceTrends();
        if (response.status && response.data) {
          setData(response.data);
        }
      } catch (err) {
        setError("Failed to load attendance data");
        console.error("Error fetching event attendance trends:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Transform data for chart (using 'label' as the x-axis key)
  const chartData = data.map((item) => ({
    month: item.label,
    attendees: item.attendees,
    projected: item.projected,
  }));

  return (
    <div className="rounded-3xl bg-card py-6 px-3 h-full">
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground px-3 mb-8">
        <p className="text-lg font-semibold text-foreground">
          Event Attendance Trends
        </p>
        <span className="hidden h-4 w-px bg-border md:block" />
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-[var(--color-attendees)]" />
            <span className="text-sm text-foreground">Attendees</span>
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-[var(--color-projected)]" />
            <span className="text-sm text-foreground">Projected</span>
          </span>
        </div>
      </div>

      <div className="h-[300px] w-full">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <div className="animate-pulse w-full h-full bg-muted/30 rounded-lg" />
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            {error}
          </div>
        ) : data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            No attendance data available
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-full w-full">
            <RechartsLineChart
              data={chartData}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient id="fillAttendees" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-attendees)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-attendees)"
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
                dataKey="attendees"
                stroke="none"
                fill="url(#fillAttendees)"
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
                dataKey="attendees"
                stroke="var(--color-attendees)"
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
        )}
      </div>
    </div>
  );
};
