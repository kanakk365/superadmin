"use client";

import { TrendBadge } from "../dashboard/TrendBadge";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  Users,
  UserCheck,
  UserX,
  FileText,
  Heart,
  Star,
  MessageCircle,
  User,
  ArrowUpRight,
} from "lucide-react";

const engagementData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
  { name: "Aug", value: 5200 },
  { name: "Sep", value: 8500 },
  { name: "Oct", value: 10500 },
  { name: "Nov", value: 9500 },
  { name: "Dec", value: 12500 },
];

export const GameReelStats = () => {
  return (
    <div className="grid gap-5 lg:gap-7.5">
      {/* First Row - Bento Grid: 2x3 Stats + Large Total Posts Card */}
      <div className="grid lg:grid-cols-3 gap-y-5 lg:gap-7.5 items-stretch">
        {/* Small Stats Grid - 2x3 User Stats */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-2 gap-4 lg:gap-6 h-full items-stretch">
            <StatCard
              value="12.5K"
              label="Total Users"
              icon={<Users className="w-5 h-5" />}
              change="+15%"
              delay={0}
            />
            <StatCard
              value="8.2K"
              label="Active Users"
              icon={<UserCheck className="w-5 h-5" />}
              change="+8%"
              highlight
              delay={100}
            />
            <StatCard
              value="4.3K"
              label="Pending Users"
              icon={<UserX className="w-5 h-5" />}
              change="+12%"
              delay={200}
              highlight
            />
            <StatCard
              value="2.1K"
              label="Male Users"
              icon={<User className="w-5 h-5" />}
              change="+6%"
              delay={300}
            />
          </div>
        </div>

        {/* Total Posts Card - Large with Gradient */}
        <div className="lg:col-span-2">
          <div className="group h-full rounded-[32px] bg-gradient-to-br from-[#bd5bf1] via-[#9b46e3] to-[#7a33e1] text-white p-8 lg:p-10 flex flex-col justify-between shadow-xl shadow-purple-500/10 relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="flex flex-col gap-8 relative z-10 h-full">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/15 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/70 uppercase tracking-wider">
                      Total Posts
                    </p>
                    <h3 className="text-4xl lg:text-5xl font-bold tracking-tight mt-1 text-white">
                      45.1K
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <TrendBadge
                    change="+22%"
                    tone="positive"
                    className=" text-white border-white/10 backdrop-blur-md px-3 py-1"
                  />
                  <p className="text-xs">vs last month</p>
                </div>
              </div>

              {/* Engagement Chart */}
              <div className="flex-1 w-full min-h-[140px] -ml-2 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementData}>
                    <defs>
                      <linearGradient
                        id="colorEngagement"
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
                        color: "#7a33e1",
                        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
                      }}
                      itemStyle={{ color: "#7a33e1", fontWeight: 600 }}
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
                      fill="url(#colorEngagement)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                    All Likes
                  </span>
                  <span className="text-xl font-bold text-white">125K</span>
                </div>
                <div className="flex flex-col gap-1 border-l border-white/10 pl-6">
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                    Favourites
                  </span>
                  <span className="text-xl font-bold text-white">89K</span>
                </div>
                <div className="flex flex-col gap-1 border-l border-white/10 pl-6">
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                    Comments
                  </span>
                  <span className="text-xl font-bold text-white">34K</span>
                </div>
              </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[80px] pointer-events-none mix-blend-overlay"></div>
            <div className="absolute -left-20 bottom-0 w-60 h-60 bg-purple-900/20 rounded-full blur-[60px] pointer-events-none mix-blend-multiply"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export Gender Demographics Card as a separate component
export const GenderDemographicsCard = () => {
  return (
    <div className="group rounded-[32px] bg-card border border-border/40 p-4 lg:p-6 h-full shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            Gender Demographics
          </h3>
        </div>
        <button className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground">
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Total Users
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-foreground tracking-tight">
              12,500
            </span>
            <TrendBadge change="+15%" tone="positive" />
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-border via-border/50 to-transparent"></div>

        <div className="grid gap-5">
          <MetricRow
            icon={<User className="w-4 h-4" />}
            label="Male Users"
            value="6,200"
            change="+12%"
          />
          <MetricRow
            icon={<User className="w-4 h-4" />}
            label="Female Users"
            value="5,800"
            change="+18%"
          />
          <MetricRow
            icon={<User className="w-4 h-4" />}
            label="Other Users"
            value="500"
            change="+25%"
          />
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
        ? "bg-gradient-to-br from-primary to-primary/90 text-white border-transparent shadow-lg shadow-primary/25"
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

const MetricRow = ({
  icon,
  label,
  value,
  change,
  tone = "positive",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  change: string;
  tone?: "positive" | "negative";
}) => (
  <div className="flex items-center justify-between group/row p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-muted/30 group-hover/row:bg-background transition-colors">
        {icon}
      </div>
      <span className="text-sm font-medium text-muted-foreground group-hover/row:text-foreground transition-colors">
        {label}
      </span>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-sm font-bold text-foreground">{value}</span>
      <span
        className={cn(
          "text-xs font-bold px-1.5 py-0.5 rounded-md",
          tone === "positive"
            ? "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400"
            : "text-red-600 bg-red-500/10 dark:text-red-400"
        )}
      >
        {change}
      </span>
    </div>
  </div>
);
