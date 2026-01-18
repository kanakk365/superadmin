"use client";

import { TrendBadge } from "../dashboard/TrendBadge";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  Users,
  Trophy,
  DollarSign,
  Activity,
  UserPlus,
  Shield,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock Data for different time ranges
const revenueDataMap = {
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
    { name: "Mon", value: 3200 },
    { name: "Tue", value: 4500 },
    { name: "Wed", value: 3800 },
    { name: "Thu", value: 5200 },
    { name: "Fri", value: 6100 },
    { name: "Sat", value: 7500 },
    { name: "Sun", value: 6800 },
  ],
  month: [
    { name: "Week 1", value: 12500 },
    { name: "Week 2", value: 15800 },
    { name: "Week 3", value: 14200 },
    { name: "Week 4", value: 18500 },
  ],
  year: [
    { name: "Jan", value: 32000 },
    { name: "Feb", value: 28000 },
    { name: "Mar", value: 41000 },
    { name: "Apr", value: 35000 },
    { name: "May", value: 29000 },
    { name: "Jun", value: 38000 },
    { name: "Jul", value: 42000 },
    { name: "Aug", value: 51000 },
    { name: "Sep", value: 62000 },
    { name: "Oct", value: 75000 },
    { name: "Nov", value: 81000 },
    { name: "Dec", value: 92000 },
  ],
};

const totalsMap = {
  day: "$3,680",
  week: "$37.1K",
  month: "$45.2K",
  year: "$614K",
};

export const YSNStats = () => {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">("month");

  return (
    <div className="grid gap-5 lg:gap-7.5">
      {/* First Row - Bento Grid: 2x2 Stats + Large Revenue Card */}
      <div className="grid lg:grid-cols-3 gap-y-5 lg:gap-7.5 items-stretch">
        {/* Small Stats Grid - 2x2 YSN Stats */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-2 gap-4 lg:gap-6 h-full items-stretch">
            <StatCard
              value="34.5K"
              label="Total Users"
              icon={<Users className="w-5 h-5" />}
              change="+12%"
              delay={0}
            />
            <StatCard
              value="12.2K"
              label="Active Users"
              icon={<Activity className="w-5 h-5" />}
              change="+24%"
              highlight
              delay={100}
            />
            <StatCard
              value="1,450"
              label="New Users"
              icon={<UserPlus className="w-5 h-5" />}
              change="+15%"
              delay={200}
              highlight
            />
            <StatCard
              value="284"
              label="Active Teams"
              icon={<Shield className="w-5 h-5" />}
              change="+8"
              delay={300}
            />
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
                      {totalsMap[timeRange]}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    value={timeRange}
                    onValueChange={(val: any) => setTimeRange(val)}
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
                      change="+8%"
                      tone="positive"
                      className=" text-white border-white/10 backdrop-blur-md px-3 py-1"
                    />
                  </div>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="flex-1 w-full min-h-[140px] -ml-2 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueDataMap[timeRange]}>
                    <defs>
                      <linearGradient
                        id="colorRevenueYSN"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor="#fff" stopOpacity={0.35} />
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
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
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
        : "bg-card border-border/40 hover:border-border/80"
    )}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex justify-between items-start">
      <div
        className={cn(
          "p-2.5 rounded-xl transition-transform group-hover:scale-110 duration-300",
          highlight ? "bg-white/20 backdrop-blur-sm" : "bg-muted/50"
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
              : "bg-red-500/10 text-red-600 dark:text-red-400"
        )}
      >
        {change}
      </span>
    </div>
    <div className="flex flex-col gap-1">
      <span
        className={cn(
          "text-3xl font-bold tracking-tight",
          highlight ? "text-white" : "text-foreground"
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "text-sm font-medium",
          highlight ? "text-white/80" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </div>
  </div>
);
