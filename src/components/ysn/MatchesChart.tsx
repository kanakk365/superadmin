"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Loader2, BarChart3 } from "lucide-react";
import {
  getYSNOrganizerMatchStatistics,
  type MatchStatisticsData,
} from "@/lib/api/ysn-organizer";

// Fallback mock data removed

const chartConfig = {
  played: {
    label: "Played",
    theme: {
      light: "oklch(0.718 0.202 349.761)", // pink-400
      dark: "oklch(0.718 0.202 349.761)",
    },
  },
  scheduled: {
    label: "Scheduled",
    theme: {
      light: "oklch(0.696 0.17 291.124)", // purple-400
      dark: "oklch(0.696 0.17 291.124)",
    },
  },
} satisfies ChartConfig;

export const MatchesChart = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getYSNOrganizerMatchStatistics();
        if (response.status && response.data && response.data.length > 0) {
          // Transform API data to chart format
          const transformedData = response.data.map((item) => ({
            month: item.label,
            played: item.played || item.count || 0,
            scheduled: item.scheduled || 0,
          }));
          setChartData(transformedData);
          setHasData(true);
        } else {
          setHasData(false);
          setChartData([]);
        }
      } catch (error) {
        console.error("Failed to fetch match statistics:", error);
        setHasData(false);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPlayed = chartData.reduce(
    (sum, item) => sum + (item.played || 0),
    0,
  );
  const totalScheduled = chartData.reduce(
    (sum, item) => sum + (item.scheduled || 0),
    0,
  );

  return (
    <div className="rounded-3xl bg-card py-6 px-3 h-full border border-border/40 shadow-sm">
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground px-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-pink-500/10">
            <BarChart3 className="w-5 h-5 text-pink-500" />
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">
              Match Statistics
            </p>
            <p className="text-xs text-muted-foreground">
              {hasData ? "Live data from API" : "No data available"}
            </p>
          </div>
        </div>
        <span className="hidden h-4 w-px bg-border md:block" />
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-[var(--color-played)]" />
            <span className="text-sm text-foreground">
              Played ({totalPlayed})
            </span>
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-[var(--color-scheduled)]" />
            <span className="text-sm text-foreground">
              Scheduled ({totalScheduled})
            </span>
          </span>
        </div>
      </div>

      <div className="h-[300px] w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <BarChart3 className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No data available</p>
            <p className="text-sm">Match statistics will appear here</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              data={chartData}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
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

              <Bar
                dataKey="played"
                fill="var(--color-played)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="scheduled"
                fill="var(--color-scheduled)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </div>
    </div>
  );
};
