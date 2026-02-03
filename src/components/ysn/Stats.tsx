"use client";

import { TrendBadge } from "../dashboard/TrendBadge";
import { cn } from "@/lib/utils";
import { ReactNode, useState, useEffect } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  Users,
  Trophy,
  DollarSign,
  Activity,
  UserPlus,
  Shield,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getYSNOrganizerCount,
  getYSNOrganizerTotalRevenue,
  type YSNOrganizerCountStat,
  type TotalRevenueData,
} from "@/lib/api/ysn-organizer";

// Fallback mock data
const fallbackRevenueData = {
  day: [
    { name: "00:00", value: 120 },
    { name: "04:00", value: 150 },
    { name: "08:00", value: 450 },
    { name: "12:00", value: 890 },
    { name: "16:00", value: 720 },
    { name: "20:00", value: 950 },
    { name: "23:59", value: 400 },
  ],
  week: [
    { name: "Mon", value: 1200 },
    { name: "Tue", value: 3400 },
    { name: "Wed", value: 3800 },
    { name: "Thu", value: 8500 },
    { name: "Fri", value: 12500 },
    { name: "Sat", value: 4100 },
    { name: "Sun", value: 4100 },
  ],
  month: [
    { name: "Week 1", value: 120000 },
    { name: "Week 2", value: 160000 },
    { name: "Week 3", value: 180000 },
    { name: "Week 4", value: 220000 },
  ],
  year: [
    { name: "Jan", value: 1200 },
    { name: "Feb", value: 3400 },
    { name: "Mar", value: 0 },
    { name: "Apr", value: 8500 },
    { name: "May", value: 12500 },
    { name: "Jun", value: 0 },
    { name: "Jul", value: 4100 },
    { name: "Aug", value: 300 },
  ],
};

const timeLabels: Record<string, Record<number, string>> = {
  day: {
    0: "00:00",
    1: "04:00",
    2: "08:00",
    3: "12:00",
    4: "16:00",
    5: "20:00",
  },
  week: {
    0: "Mon",
    1: "Tue",
    2: "Wed",
    3: "Thu",
    4: "Fri",
    5: "Sat",
    6: "Sun",
  },
  month: {
    0: "Week 1",
    1: "Week 2",
    2: "Week 3",
    3: "Week 4",
  },
  year: {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  },
};

const iconMap: Record<string, ReactNode> = {
  "Total Users": <Users className="w-5 h-5" />,
  "Active Users": <Activity className="w-5 h-5" />,
  "New Users": <UserPlus className="w-5 h-5" />,
  "Active Teams": <Shield className="w-5 h-5" />,
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const formatCurrency = (num: number): string => {
  if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
  return `$${num}`;
};

export const YSNStats = () => {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">(
    "month",
  );
  const [countStats, setCountStats] = useState<YSNOrganizerCountStat[] | null>(
    null,
  );
  const [revenueData, setRevenueData] = useState<TotalRevenueData | null>(null);
  const [loadingCount, setLoadingCount] = useState(true);
  const [loadingRevenue, setLoadingRevenue] = useState(true);

  useEffect(() => {
    const fetchCountStats = async () => {
      try {
        setLoadingCount(true);
        const response = await getYSNOrganizerCount();
        if (response.status && response.data) {
          setCountStats(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch count stats:", error);
      } finally {
        setLoadingCount(false);
      }
    };

    const fetchRevenueData = async () => {
      try {
        setLoadingRevenue(true);
        const response = await getYSNOrganizerTotalRevenue();
        if (response.status && response.data) {
          setRevenueData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch revenue data:", error);
      } finally {
        setLoadingRevenue(false);
      }
    };

    fetchCountStats();
    fetchRevenueData();
  }, []);

  // Transform API revenue data to chart format
  const getChartData = () => {
    if (!revenueData?.data?.[timeRange]) {
      return fallbackRevenueData[timeRange];
    }

    const apiData = revenueData.data[timeRange];
    if (apiData.length === 0) {
      return fallbackRevenueData[timeRange];
    }

    return apiData.map((item) => ({
      name: timeLabels[timeRange]?.[item.label] || String(item.label),
      value: item.value,
    }));
  };

  // Calculate total from chart data
  const getTotalRevenue = () => {
    const data = getChartData();
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return formatCurrency(total);
  };

  // Get stat values from API or fallback
  const getStatValue = (label: string): string => {
    if (!countStats) return "0";
    const stat = countStats.find((s) => s.label === label);
    return stat ? formatNumber(stat.count) : "0";
  };

  const getStatBadge = (label: string): string => {
    if (!countStats) return "+0";
    const stat = countStats.find((s) => s.label === label);
    const count = stat?.badge_count || 0;
    return count >= 0 ? `+${count}` : String(count);
  };

  return (
    <div className="grid gap-5 lg:gap-7.5">
      {/* First Row - Bento Grid: 2x2 Stats + Large Revenue Card */}
      <div className="grid lg:grid-cols-3 gap-y-5 lg:gap-7.5 items-stretch">
        {/* Small Stats Grid - 2x2 YSN Stats */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-2 gap-4 lg:gap-6 h-full items-stretch">
            {loadingCount ? (
              <>
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
              </>
            ) : (
              <>
                <StatCard
                  value={getStatValue("Total Users")}
                  label="Total Users"
                  icon={iconMap["Total Users"]}
                  change={getStatBadge("Total Users")}
                  delay={0}
                />
                <StatCard
                  value={getStatValue("Active Users")}
                  label="Active Users"
                  icon={iconMap["Active Users"]}
                  change={getStatBadge("Active Users")}
                  highlight
                  delay={100}
                />
                <StatCard
                  value={getStatValue("New Users")}
                  label="New Users"
                  icon={iconMap["New Users"]}
                  change={getStatBadge("New Users")}
                  delay={200}
                  highlight
                />
                <StatCard
                  value={getStatValue("Active Teams")}
                  label="Active Teams"
                  icon={iconMap["Active Teams"]}
                  change={getStatBadge("Active Teams")}
                  delay={300}
                />
              </>
            )}
          </div>
        </div>

        {/* Revenue Card - Large with Gradient */}
        <div className="lg:col-span-2">
          <div className="group h-full rounded-[32px] bg-gradient-to-br from-pink-400 via-fuchsia-400 to-purple-400 text-white p-8 lg:p-10 flex flex-col justify-between shadow-xl shadow-pink-400/10 relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-pink-400/20">
            <div className="flex flex-col gap-8 relative z-10 h-full">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/15 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner">
                    <DollarSign className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/70 uppercase tracking-wider">
                      Total Revenue
                    </p>
                    <h3 className="text-4xl lg:text-5xl font-bold tracking-tight mt-1 text-white">
                      {loadingRevenue ? (
                        <Loader2 className="w-8 h-8 animate-spin" />
                      ) : (
                        getTotalRevenue()
                      )}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    value={timeRange}
                    onValueChange={(val: "day" | "week" | "month" | "year") =>
                      setTimeRange(val)
                    }
                  >
                    <SelectTrigger className="w-[100px] h-8 bg-white/10 border-white/10 text-white rounded-lg backdrop-blur-md focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="year">Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex flex-col items-end gap-1">
                    <TrendBadge
                      change={`+${revenueData?.growth_count || 8}%`}
                      tone="positive"
                      className=" text-white border-white/10 backdrop-blur-md px-3 py-1"
                    />
                  </div>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="flex-1 w-full min-h-[140px] -ml-2 relative">
                {loadingRevenue ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-8 h-8 animate-spin text-white/70" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={getChartData()}>
                      <defs>
                        <linearGradient
                          id="colorRevenueYSN"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#fff"
                            stopOpacity={0.35}
                          />
                          <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          borderRadius: "16px",
                          border: "none",
                          color: "#f472b6",
                          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
                        }}
                        itemStyle={{ color: "#f472b6", fontWeight: 600 }}
                        formatter={(value: number) => [
                          `$${value.toLocaleString()}`,
                          "Revenue",
                        ]}
                        cursor={{
                          stroke: "rgba(255,255,255,0.3)",
                          strokeWidth: 1,
                          strokeDasharray: "5 5",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#fff"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorRevenueYSN)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Team Revenue Breakdown */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                {revenueData?.team_data && revenueData.team_data.length > 0 ? (
                  revenueData.team_data.slice(0, 3).map((team, index) => (
                    <div
                      key={team.team_name}
                      className={cn(
                        "flex flex-col gap-1",
                        index > 0 && "border-l border-white/10 pl-6",
                      )}
                    >
                      <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                        {team.team_name}
                      </span>
                      <span className="text-xl font-bold text-white">
                        {team.revenue_percentage}%
                      </span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                        Team Alpha
                      </span>
                      <span className="text-xl font-bold text-white">45%</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-white/10 pl-6">
                      <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                        Team Beta
                      </span>
                      <span className="text-xl font-bold text-white">32%</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-white/10 pl-6">
                      <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                        Team Gamma
                      </span>
                      <span className="text-xl font-bold text-white">23%</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[80px] pointer-events-none mix-blend-overlay"></div>
            <div className="absolute -left-20 bottom-0 w-60 h-60 bg-pink-300/30 rounded-full blur-[60px] pointer-events-none mix-blend-multiply"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  value,
  label,
  icon,
  change,
  tone = "positive",
  highlight = false,
  delay = 0,
}: {
  value: string;
  label: string;
  icon: ReactNode;
  change: string;
  tone?: "positive" | "negative";
  highlight?: boolean;
  delay?: number;
}) => (
  <div
    className={cn(
      "group flex flex-col justify-between gap-4 h-full rounded-[28px] p-5 lg:p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
      highlight
        ? "bg-gradient-to-br from-pink-400 to-purple-400 text-white border-transparent shadow-lg shadow-pink-400/25"
        : "bg-card border-border/40 hover:border-border/80",
    )}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex justify-between items-start">
      <div
        className={cn(
          "p-2.5 rounded-xl transition-transform group-hover:scale-110 duration-300",
          highlight ? "bg-white/20 backdrop-blur-sm" : "bg-muted/50",
        )}
      >
        {icon}
      </div>
      <span
        className={cn(
          "text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm",
          highlight
            ? "bg-white/20 text-white"
            : tone === "positive"
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-red-500/10 text-red-600 dark:text-red-400",
        )}
      >
        {change}
      </span>
    </div>
    <div className="flex flex-col gap-1">
      <span
        className={cn(
          "text-3xl font-bold tracking-tight",
          highlight ? "text-white" : "text-foreground",
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "text-sm font-medium",
          highlight ? "text-white/80" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </div>
  </div>
);

const StatCardSkeleton = () => (
  <div className="flex flex-col justify-between gap-4 h-full rounded-[28px] p-5 lg:p-6 border bg-card border-border/40 animate-pulse">
    <div className="flex justify-between items-start">
      <div className="p-2.5 rounded-xl bg-muted/50 w-10 h-10" />
      <div className="h-6 w-12 rounded-full bg-muted/50" />
    </div>
    <div className="flex flex-col gap-2">
      <div className="h-8 w-20 rounded bg-muted/50" />
      <div className="h-4 w-24 rounded bg-muted/50" />
    </div>
  </div>
);
