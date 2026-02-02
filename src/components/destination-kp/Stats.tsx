"use client";

import { TrendBadge } from "../dashboard/TrendBadge";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  Users,
  Briefcase,
  DollarSign,
  Mail,
  Building2,
  Calendar,
} from "lucide-react";
import { getDKPCount, DKPCountStat } from "@/lib/api/dkp";

const revenueData = [
  { name: "Jan", value: 8500 },
  { name: "Feb", value: 7200 },
  { name: "Mar", value: 9800 },
  { name: "Apr", value: 8900 },
  { name: "May", value: 7500 },
  { name: "Jun", value: 10200 },
  { name: "Jul", value: 11500 },
  { name: "Aug", value: 13200 },
  { name: "Sep", value: 14800 },
  { name: "Oct", value: 16500 },
  { name: "Nov", value: 18200 },
  { name: "Dec", value: 20500 },
];

// Icon mapping for different stat labels
const getIconForLabel = (label: string) => {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("visitor")) return <Users className="w-5 h-5" />;
  if (lowerLabel.includes("subscriber")) return <Mail className="w-5 h-5" />;
  if (lowerLabel.includes("contact")) return <Building2 className="w-5 h-5" />;
  if (lowerLabel.includes("job")) return <Briefcase className="w-5 h-5" />;
  return <Calendar className="w-5 h-5" />;
};

// Determine if a stat should be highlighted
const isHighlightedStat = (label: string) => {
  const lowerLabel = label.toLowerCase();
  return lowerLabel.includes("subscriber") || lowerLabel.includes("contact");
};

export const DestinationKPStats = () => {
  const [stats, setStats] = useState<DKPCountStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await getDKPCount();
        if (response.status && response.data) {
          setStats(response.data);
        }
      } catch (err) {
        setError("Failed to load stats");
        console.error("Error fetching DKP stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid gap-5 lg:gap-7.5">
      {/* First Row - Bento Grid: 2x2 Stats + Large Revenue Card */}
      <div className="grid lg:grid-cols-3 gap-y-5 lg:gap-7.5 items-stretch">
        {/* Small Stats Grid - 2x2 Destination KP Stats */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-2 gap-4 lg:gap-6 h-full items-stretch">
            {loading ? (
              // Loading skeleton
              <>
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-[28px] bg-card border border-border/40 p-5 lg:p-6 animate-pulse"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-muted/50 rounded-xl" />
                      <div className="w-12 h-5 bg-muted/50 rounded-full" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="w-16 h-8 bg-muted/50 rounded" />
                      <div className="w-20 h-4 bg-muted/50 rounded" />
                    </div>
                  </div>
                ))}
              </>
            ) : error ? (
              // Error state with default values
              <>
                <StatCard
                  value="--"
                  label="Visitors"
                  icon={<Users className="w-5 h-5" />}
                  change="0%"
                  delay={0}
                />
                <StatCard
                  value="--"
                  label="Subscribers"
                  icon={<Mail className="w-5 h-5" />}
                  change="0%"
                  highlight
                  delay={100}
                />
                <StatCard
                  value="--"
                  label="Contact Req"
                  icon={<Building2 className="w-5 h-5" />}
                  change="0%"
                  delay={200}
                  highlight
                />
                <StatCard
                  value="--"
                  label="Active Jobs"
                  icon={<Briefcase className="w-5 h-5" />}
                  change="0%"
                  delay={300}
                />
              </>
            ) : (
              // API data
              stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  value={stat.count.toLocaleString()}
                  label={stat.label}
                  icon={getIconForLabel(stat.label)}
                  change={stat.badge_count > 0 ? `+${stat.badge_count}` : "0"}
                  highlight={isHighlightedStat(stat.label)}
                  delay={index * 100}
                />
              ))
            )}
          </div>
        </div>

        {/* Revenue Card - Large with Gradient */}
        <div className="lg:col-span-2">
          <div className="group h-full rounded-[32px] bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 text-white p-8 lg:p-10 flex flex-col justify-between shadow-xl shadow-indigo-400/10 relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-indigo-400/20">
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
                      $125K
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <TrendBadge
                    change="+12%"
                    tone="positive"
                    className=" text-white border-white/10 backdrop-blur-md px-3 py-1"
                  />
                  <p className="text-xs">vs last month</p>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="flex-1 w-full min-h-[140px] -ml-2 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient
                        id="colorRevenueDKP"
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
                        color: "#818cf8",
                        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
                      }}
                      itemStyle={{ color: "#818cf8", fontWeight: 600 }}
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
                      fill="url(#colorRevenueDKP)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                    Tourism
                  </span>
                  <span className="text-xl font-bold text-white">$75K</span>
                </div>
                <div className="flex flex-col gap-1 border-l border-white/10 pl-6">
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                    Events
                  </span>
                  <span className="text-xl font-bold text-white">$35K</span>
                </div>
                <div className="flex flex-col gap-1 border-l border-white/10 pl-6">
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                    Facilities
                  </span>
                  <span className="text-xl font-bold text-white">$15K</span>
                </div>
              </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[80px] pointer-events-none mix-blend-overlay"></div>
            <div className="absolute -left-20 bottom-0 w-60 h-60 bg-indigo-300/30 rounded-full blur-[60px] pointer-events-none mix-blend-multiply"></div>
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
        ? "bg-gradient-to-br from-indigo-400 to-purple-400 text-white border-transparent shadow-lg shadow-indigo-400/25"
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
