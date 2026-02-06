"use client";

import { useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, UserPlus } from "lucide-react";
import {
  getYSNOrganizerNewUserGrowth,
  type NewUserGrowthData,
} from "@/lib/api/ysn-organizer";

// Fallback data removed

export const NewUsersChart = () => {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">(
    "month",
  );
  const [apiData, setApiData] = useState<NewUserGrowthData[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getYSNOrganizerNewUserGrowth();
        if (response.status && response.data && response.data.length > 0) {
          setApiData(response.data);
          setHasData(true);
        } else {
          setHasData(false);
        }
      } catch (error) {
        console.error("Failed to fetch new user growth data:", error);
        setHasData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Transform API data or use fallback
  const getChartData = () => {
    if (hasData && apiData.length > 0) {
      return apiData.map((item) => ({
        name: String(item.label),
        value: item.value,
      }));
    }
    return [];
  };

  const chartData = getChartData();
  const totalUsers = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-[32px] bg-card border border-border/40 p-6 lg:p-8 h-full flex flex-col shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-violet-500/10">
              <UserPlus className="w-5 h-5 text-violet-500" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              New Users Growth
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {hasData
              ? "Total new user registrations over time"
              : "No user growth data available"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">
              {totalUsers.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Total this period</p>
          </div>
          {!hasData && (
            <Select
              value={timeRange}
              onValueChange={(val: "day" | "week" | "month" | "year") =>
                setTimeRange(val)
              }
            >
              <SelectTrigger className="w-[120px] bg-background">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <UserPlus className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No data available</p>
            <p className="text-sm">New user growth data will appear here</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--custom-border))"
                opacity={0.4}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "12px",
                  color: "hsl(var(--popover-foreground))",
                }}
                formatter={(value: number) => [
                  `${value.toLocaleString()} users`,
                  "New Users",
                ]}
                cursor={{ stroke: "hsl(var(--muted))", opacity: 0.4 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorUsers)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
