"use client";

import { Suspense, useEffect, useState } from "react";
import DashboardLayout from "@/components/main/DashboardLayout";
import { GoogleConnectButton } from "@/components/dashboard/GoogleConnectButton";
import { SocialConnectCTA } from "@/components/dashboard/SocialConnectCTA";
import { TrendBadge } from "@/components/dashboard/TrendBadge";
import { cn } from "@/lib/utils";
import {
  Users,
  MousePointerClick,
  Clock,
  TrendingDown,
  BarChart3,
  Globe,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AnalyticsData {
  connected: boolean;
  accounts?: Array<{
    id: string;
    name: string;
    properties: Array<{ id: string; name: string }>;
  }>;
  data?: {
    // ... existing data structure ...
    overview: {
      totalUsers: number;
      activeUsers: number;
      sessions: number;
      bounceRate: number;
      avgSessionDuration: number;
    };
    dailyData: Array<{
      date: string;
      users: number;
      sessions: number;
      pageViews: number;
    }>;
    trafficSources: Array<{
      source: string;
      users: number;
      percentage: number;
    }>;
    topPages: Array<{
      page: string;
      views: number;
      avgTime: number;
    }>;
  };
  error?: string;
}

const TRAFFIC_COLORS = ["#a855f7", "#6366f1", "#d946ef", "#8b5cf6", "#c084fc"];

export default function GoogleAnalyticsPage() {
  return (
    <Suspense
      fallback={
        <DashboardLayout pageLabel="Google Analytics">
          <div className="flex items-center justify-center py-20 h-full">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        </DashboardLayout>
      }
    >
      <GoogleAnalyticsContent />
    </Suspense>
  );
}

function GoogleAnalyticsContent() {
  const searchParams = useSearchParams();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [connectionMessage, setConnectionMessage] = useState<string | null>(
    null,
  );
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("");

  useEffect(() => {
    // Check for connection status from URL params
    if (searchParams.get("connected") === "true") {
      setConnectionMessage("Successfully connected to Google!");
      // Clear the URL params
      window.history.replaceState({}, "", "/google-analytics");
    } else if (searchParams.get("error")) {
      setConnectionMessage(`Connection failed: ${searchParams.get("error")}`);
    }

    fetchAnalyticsData();
  }, [searchParams]);

  const fetchAnalyticsData = async (propertyId?: string) => {
    setIsLoading(true);
    try {
      const url = propertyId
        ? `/api/analytics?propertyId=${propertyId}`
        : "/api/analytics";

      const response = await fetch(url);
      const data = await response.json();
      setAnalyticsData(data);

      if (propertyId) {
        setSelectedPropertyId(propertyId);
      } else if (data.accounts?.length > 0 && !selectedPropertyId) {
        // Set initial property ID if not set
        const firstAccount = data.accounts.find(
          (acc: any) => acc.properties.length > 0,
        );
        if (firstAccount && firstAccount.properties.length > 0) {
          setSelectedPropertyId(firstAccount.properties[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
      setAnalyticsData({ connected: false, error: "Failed to fetch data" });
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  return (
    <DashboardLayout pageLabel="Google Analytics">
      <ScrollArea className="h-full w-full">
        <div className="flex flex-col gap-5 lg:gap-7.5 p-4 md:p-6 lg:p-8 animate-in fade-in duration-500">
          {/* Connection Status Message */}
          {connectionMessage && (
            <div
              className={cn(
                "p-4 rounded-2xl flex items-center gap-3",
                connectionMessage.includes("Success")
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400",
              )}
            >
              <AlertCircle className="w-5 h-5" />
              <span>{connectionMessage}</span>
              <button
                onClick={() => setConnectionMessage(null)}
                className="ml-auto text-sm underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Header with Connect Button */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Google Analytics
                </h1>
                <p className="text-muted-foreground">
                  View your website traffic and user analytics
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              {!isLoading &&
                analyticsData?.accounts &&
                analyticsData.accounts.length > 0 && (
                  <div className="relative w-full md:w-[250px]">
                    <Select
                      value={selectedPropertyId}
                      onValueChange={(value) => {
                        setSelectedPropertyId(value);
                        fetchAnalyticsData(value);
                      }}
                    >
                      <SelectTrigger className="w-full bg-card border-border">
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                      <SelectContent>
                        {analyticsData.accounts.map((account) => (
                          <SelectGroup key={account.id}>
                            <SelectLabel>{account.name}</SelectLabel>
                            {account.properties.map((prop) => (
                              <SelectItem key={prop.id} value={prop.id}>
                                {prop.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              <GoogleConnectButton />
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
          )}

          {/* Not Connected State */}
          {!isLoading && !analyticsData?.connected && (
            <SocialConnectCTA
              platform="analytics"
              onConnect={() => {
                window.location.href = "/api/auth/google";
              }}
            />
          )}

          {/* Error State */}
          {!isLoading && analyticsData?.connected && analyticsData?.error && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <AlertCircle className="w-12 h-12 text-amber-500" />
              <p className="text-center text-muted-foreground max-w-md">
                {analyticsData.error}
              </p>
              <button
                onClick={() => fetchAnalyticsData()}
                className="px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Connected with Data */}
          {!isLoading && analyticsData?.connected && analyticsData?.data && (
            <>
              {/* Overview Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <StatCard
                  value={formatNumber(analyticsData.data.overview.totalUsers)}
                  label="Total Users"
                  icon={<Users className="w-5 h-5" />}
                  color="purple"
                />
                <StatCard
                  value={formatNumber(analyticsData.data.overview.activeUsers)}
                  label="Active Users"
                  icon={<MousePointerClick className="w-5 h-5" />}
                  color="indigo"
                />
                <StatCard
                  value={formatDuration(
                    analyticsData.data.overview.avgSessionDuration,
                  )}
                  label="Avg. Session"
                  icon={<Clock className="w-5 h-5" />}
                  color="rose"
                />
                <StatCard
                  value={`${analyticsData.data.overview.bounceRate.toFixed(1)}%`}
                  label="Bounce Rate"
                  icon={<TrendingDown className="w-5 h-5" />}
                  color="amber"
                />
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5">
                {/* Traffic Over Time */}
                <div className="lg:col-span-2 group rounded-[32px] bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 text-white p-8 lg:p-10 shadow-xl shadow-purple-500/10 relative overflow-hidden flex flex-col">
                  <div className="flex flex-col gap-6 relative z-10 h-full">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/15 rounded-2xl backdrop-blur-md">
                          <BarChart3 className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white/70 uppercase tracking-wider">
                            Traffic Overview
                          </p>
                          <h3 className="text-3xl lg:text-4xl font-bold tracking-tight mt-1">
                            {formatNumber(analyticsData.data.overview.sessions)}{" "}
                            Sessions
                          </h3>
                        </div>
                      </div>
                      <TrendBadge
                        change="+12%"
                        tone="positive"
                        className="text-white border-white/10 backdrop-blur-md px-3 py-1"
                      />
                    </div>

                    <div className="flex-1 w-full -ml-2 min-h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analyticsData.data.dailyData}>
                          <defs>
                            <linearGradient
                              id="colorUsers"
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
                              <stop
                                offset="95%"
                                stopColor="#fff"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="date"
                            stroke="rgba(255,255,255,0.5)"
                            tickFormatter={(val) => val.slice(-2)}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis
                            stroke="rgba(255,255,255,0.5)"
                            axisLine={false}
                            tickLine={false}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.95)",
                              borderRadius: "16px",
                              border: "none",
                              color: "#8b5cf6",
                              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="users"
                            stroke="#fff"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorUsers)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
                </div>

                {/* Traffic Sources Pie Chart */}
                <div className="lg:col-span-1 group rounded-[32px] bg-card border border-border p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-500">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      Traffic Sources
                    </h3>
                  </div>

                  <div className="h-[180px] w-full relative mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analyticsData.data.trafficSources}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={5}
                          dataKey="users"
                          nameKey="source"
                          cornerRadius={6}
                        >
                          {analyticsData.data.trafficSources.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                TRAFFIC_COLORS[index % TRAFFIC_COLORS.length]
                              }
                              stroke="none"
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-3">
                    {analyticsData.data.trafficSources.map((source, index) => (
                      <div
                        key={source.source}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                              backgroundColor:
                                TRAFFIC_COLORS[index % TRAFFIC_COLORS.length],
                            }}
                          />
                          <span className="text-sm font-medium text-muted-foreground">
                            {source.source}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-foreground">
                          {source.percentage.toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Page Views Chart */}
              <div className="rounded-[32px] bg-card border border-border p-6 lg:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-500">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    Daily Page Views
                  </h3>
                </div>

                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData.data.dailyData}>
                      <defs>
                        <linearGradient
                          id="colorPageViews"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#6366f1"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#6366f1"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                      />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(val) => val.slice(-2)}
                        stroke="var(--muted-foreground)"
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        stroke="var(--muted-foreground)"
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          borderRadius: "12px",
                          border: "1px solid var(--border)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="pageViews"
                        stroke="#6366f1"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPageViews)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>
        <ScrollBar />
      </ScrollArea>
    </DashboardLayout>
  );
}

// Stat Card Component
const StatCard = ({
  value,
  label,
  icon,
  color = "purple",
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
  color?: "purple" | "indigo" | "rose" | "amber";
}) => {
  const colorClasses = {
    purple: "bg-purple-500/10 text-purple-500",
    indigo: "bg-indigo-500/10 text-indigo-500",
    rose: "bg-rose-500/10 text-rose-500",
    amber: "bg-amber-500/10 text-amber-500",
  };

  return (
    <div className="group flex flex-col justify-between gap-4 h-full rounded-[28px] p-5 lg:p-6 bg-card border border-border/60 hover:border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className={cn("p-2.5 rounded-xl w-fit", colorClasses[color])}>
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
          {value}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
      </div>
    </div>
  );
};
