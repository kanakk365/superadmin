"use client";

import React, { useState, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Users,
  Activity,
  Trophy,
  DollarSign,
  TrendingUp,
  UserPlus,
  Video,
  Clock,
  Eye,
  Building2,
  Shield,
  Calendar,
  AlertCircle,
  CheckCircle,
  MoreHorizontal,
  Filter,
  Download,
} from "lucide-react";
import {
  getYSNAdminCount,
  YSNAdminCountStat,
  getYSNAdminRevenueSources,
  RevenueSource,
  getYSNAdminTotalRevenueTrends,
  RevenueTrendsData,
  getYSNAdminStreamingPerformance,
  StreamingPerfData,
  getYSNAdminRecentStreamedEvents,
  StreamedEvent,
  getYSNAdminNewUserAcquisition,
  NewUserAcquisitionData,
  getYSNAdminTopAdvertiserRevenue,
  AdvertiserRevenue,
} from "@/lib/api/ysn-admin";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

// --- Mock Data ---

const revenueData = {
  day: [
    { name: "00:00", value: 1200 },
    { name: "06:00", value: 3400 },
    { name: "12:00", value: 8200 },
    { name: "18:00", value: 12500 },
    { name: "23:59", value: 4100 },
  ],
  week: [
    { name: "Mon", value: 24000 },
    { name: "Tue", value: 28500 },
    { name: "Wed", value: 32000 },
    { name: "Thu", value: 45000 },
    { name: "Fri", value: 52000 },
    { name: "Sat", value: 68000 },
    { name: "Sun", value: 61000 },
  ],
  month: [
    { name: "Week 1", value: 120000 },
    { name: "Week 2", value: 156000 },
    { name: "Week 3", value: 189000 },
    { name: "Week 4", value: 210000 },
  ],
  year: [
    { name: "Jan", value: 450000 },
    { name: "Feb", value: 520000 },
    { name: "Mar", value: 480000 },
    { name: "Apr", value: 610000 },
    { name: "May", value: 580000 },
    { name: "Jun", value: 750000 },
  ],
};

const newUsersData = {
  day: [
    { name: "00:00", value: 12 },
    { name: "06:00", value: 45 },
    { name: "12:00", value: 120 },
    { name: "18:00", value: 89 },
    { name: "23:59", value: 34 },
  ],
  week: [
    { name: "Mon", value: 145 },
    { name: "Tue", value: 230 },
    { name: "Wed", value: 180 },
    { name: "Thu", value: 320 },
    { name: "Fri", value: 410 },
    { name: "Sat", value: 520 },
    { name: "Sun", value: 480 },
  ],
  month: [
    { name: "Week 1", value: 1200 },
    { name: "Week 2", value: 1560 },
    { name: "Week 3", value: 1890 },
    { name: "Week 4", value: 2100 },
  ],
  year: [
    { name: "Jan", value: 4500 },
    { name: "Feb", value: 5200 },
    { name: "Mar", value: 4800 },
    { name: "Apr", value: 6100 },
    { name: "May", value: 5800 },
    { name: "Jun", value: 7500 },
  ],
};

const streamingStats = {
  minutesStreamed: {
    day: [
      { name: "00:00", value: 120 },
      { name: "06:00", value: 340 },
      { name: "12:00", value: 560 },
      { name: "18:00", value: 420 },
      { name: "23:59", value: 150 },
    ],
    week: [
      { name: "Mon", value: 1200 },
      { name: "Tue", value: 1560 },
      { name: "Wed", value: 1420 },
      { name: "Thu", value: 1890 },
      { name: "Fri", value: 2450 },
      { name: "Sat", value: 3200 },
      { name: "Sun", value: 2800 },
    ],
    month: [
      { name: "Week 1", value: 5200 },
      { name: "Week 2", value: 6500 },
      { name: "Week 3", value: 7800 },
      { name: "Week 4", value: 8900 },
    ],
    year: [
      { name: "Jan", value: 24000 },
      { name: "Feb", value: 28000 },
      { name: "Mar", value: 32000 },
      { name: "Apr", value: 36000 },
      { name: "May", value: 42000 },
      { name: "Jun", value: 48000 },
    ],
  },
  minutesViewed: {
    day: [
      { name: "00:00", value: 4500 },
      { name: "06:00", value: 12000 },
      { name: "12:00", value: 28000 },
      { name: "18:00", value: 35000 },
      { name: "23:59", value: 8000 },
    ],
    week: [
      { name: "Mon", value: 45000 },
      { name: "Tue", value: 52000 },
      { name: "Wed", value: 48000 },
      { name: "Thu", value: 61000 },
      { name: "Fri", value: 85000 },
      { name: "Sat", value: 120000 },
      { name: "Sun", value: 98000 },
    ],
    month: [
      { name: "Week 1", value: 245000 },
      { name: "Week 2", value: 312000 },
      { name: "Week 3", value: 289000 },
      { name: "Week 4", value: 410000 },
    ],
    year: [
      { name: "Jan", value: 1200000 },
      { name: "Feb", value: 1450000 },
      { name: "Mar", value: 1320000 },
      { name: "Apr", value: 1680000 },
      { name: "May", value: 1950000 },
      { name: "Jun", value: 2400000 },
    ],
  },
};

// ... inside component ...

const streamedEvents = [
  {
    id: 1,
    date: "Jan 22, 2026",
    org: "Elite Youth League",
    team: "Thunderbolts",
    sponsors: ["Nike", "Gatorade"],
    viewers: 12500,
    revenue: "$4,500",
    minutesViewed: "450K",
    minutesStreamed: "120",
  },
  {
    id: 2,
    date: "Jan 23, 2026",
    org: "NextGen Sports",
    team: "Raptors Academy",
    sponsors: ["Adidas", "Puma"],
    viewers: 8200,
    revenue: "$2,800",
    minutesViewed: "280K",
    minutesStreamed: "90",
  },
  {
    id: 3,
    date: "Jan 23, 2026",
    org: "Global Hoops",
    team: "Titans",
    sponsors: ["Under Armour"],
    viewers: 15600,
    revenue: "$6,200",
    minutesViewed: "620K",
    minutesStreamed: "145",
  },
];

const advertiserRevenue = [
  { name: "Nike", value: 45000, campaigns: 12 },
  { name: "Adidas", value: 32000, campaigns: 8 },
  { name: "Gatorade", value: 28000, campaigns: 15 },
  { name: "Puma", value: 18000, campaigns: 6 },
  { name: "Under Armour", value: 15000, campaigns: 4 },
];

const orgRevenue = [
  { name: "Elite Youth", value: 85000, teams: 12 },
  { name: "NextGen", value: 65000, teams: 8 },
  { name: "Global Hoops", value: 52000, teams: 15 },
  { name: "Future Stars", value: 34000, teams: 6 },
];

const teamRevenue = [
  { name: "Thunderbolts", value: 42000, org: "Elite Youth" },
  { name: "Raptors", value: 38000, org: "NextGen" },
  { name: "Titans", value: 31000, org: "Global Hoops" },
  { name: "Warriors", value: 28000, org: "Elite Youth" },
];

const COLORS = ["#ec4899", "#d946ef", "#a855f7", "#8b5cf6", "#6366f1"];

export const YSNAdmin = () => {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">(
    "week",
  );
  const [revenueFilter, setRevenueFilter] = useState("all");

  const [stats, setStats] = useState<YSNAdminCountStat[]>([]);
  const [revenueSources, setRevenueSources] = useState<RevenueSource[]>([]);
  const [revenueTrends, setRevenueTrends] = useState<RevenueTrendsData | null>(
    null,
  );
  const [streamingPerf, setStreamingPerf] = useState<StreamingPerfData | null>(
    null,
  );
  const [recentEvents, setRecentEvents] = useState<StreamedEvent[]>([]);
  const [newUserMsg, setNewUserMsg] = useState<NewUserAcquisitionData | null>(
    null,
  );
  const [topAdvertisers, setTopAdvertisers] = useState<AdvertiserRevenue[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          statsRes,
          sourcesRes,
          trendsRes,
          streamingRes,
          eventsRes,
          usersRes,
          adsRes,
        ] = await Promise.all([
          getYSNAdminCount(),
          getYSNAdminRevenueSources(),
          getYSNAdminTotalRevenueTrends(),
          getYSNAdminStreamingPerformance(),
          getYSNAdminRecentStreamedEvents(),
          getYSNAdminNewUserAcquisition(),
          getYSNAdminTopAdvertiserRevenue(),
        ]);

        if (statsRes.status && statsRes.data) setStats(statsRes.data);
        if (sourcesRes.status && sourcesRes.data)
          setRevenueSources(sourcesRes.data);
        if (trendsRes.status && trendsRes.data)
          setRevenueTrends(trendsRes.data);
        if (streamingRes.status && streamingRes.data)
          setStreamingPerf(streamingRes.data);
        if (eventsRes.status && eventsRes.data) setRecentEvents(eventsRes.data);
        if (usersRes.status && usersRes.data) setNewUserMsg(usersRes.data);
        if (adsRes.status && adsRes.data) setTopAdvertisers(adsRes.data);
      } catch (e) {
        console.error("Failed to fetch YSN admin data", e);
      } finally {
        setLoading(false);
      }
      return;
    };
    fetchData();
  }, []);

  const formatCount = (num: number, isCurrency: boolean = false) => {
    if (num >= 1000000)
      return (isCurrency ? "$" : "") + (num / 1000000).toFixed(1) + "M";
    if (num >= 1000)
      return (isCurrency ? "$" : "") + (num / 1000).toFixed(1) + "K";
    return (isCurrency ? "$" : "") + num.toLocaleString();
  };

  const getStatConfig = (label: string) => {
    if (label.includes("Revenue"))
      return {
        icon: <DollarSign className="w-6 h-6 text-white" />,
        bg: "bg-gradient-to-br from-pink-500 to-purple-600",
        tone: "positive",
        highlight: true,
      };
    if (label.includes("Organizations"))
      return {
        icon: <Building2 className="w-6 h-6 text-purple-500" />,
        bg: "bg-purple-500/10",
        tone: "positive",
      };
    if (label.includes("Teams"))
      return {
        icon: <Shield className="w-6 h-6 text-indigo-500" />,
        bg: "bg-indigo-500/10",
        tone: "positive",
      };
    if (label.includes("Users"))
      return {
        icon: <Users className="w-6 h-6 text-fuchsia-500" />,
        bg: "bg-fuchsia-500/10",
        tone: "positive",
      };
    if (label.includes("Streamed"))
      return {
        icon: <Video className="w-6 h-6 text-pink-500" />,
        bg: "bg-pink-500/10",
        tone: "positive",
      };
    return {
      icon: <Activity className="w-6 h-6 text-gray-500" />,
      bg: "bg-gray-100",
      tone: "positive",
    };
  };

  const getChartDataRaw = (data: any[], valueKey: string = "value") => {
    return data.map((item) => {
      // Handle the "Sun": "Fri" case from prompt by checking keys strictly
      let label = item.label;
      if (!label && typeof item === "object") {
        // Find a specific day key if label is missing
        const dayKeys = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const foundKey = Object.keys(item).find(
          (k) => dayKeys.includes(k) && typeof item[k] === "string",
        );
        if (foundKey) label = item[foundKey] as string;
      }

      return {
        name: label || "",
        value: item[valueKey],
      };
    });
  };

  const getRevenueChartData = () => {
    if (!revenueTrends) return [];
    const keyMap: Record<string, keyof RevenueTrendsData> = {
      all: "platform_total",
      org: "by_organization",
      team: "by_team",
    };
    const dataKey = keyMap[revenueFilter] || "platform_total";
    const timeData = revenueTrends[dataKey]?.[timeRange] || [];
    return getChartDataRaw(timeData, "value");
  };

  const revenueChartData = getRevenueChartData();

  const getStreamingChartData = () => {
    if (!streamingPerf) return [];
    return getChartDataRaw(streamingPerf[timeRange] || [], "value");
  };
  const streamingChartData = getStreamingChartData();

  const getNewUserChartData = () => {
    if (!newUserMsg) return [];
    return getChartDataRaw(newUserMsg[timeRange] || [], "total");
  };
  const newUserChartData = getNewUserChartData();

  return (
    <ScrollArea className="h-full w-full bg-gradient-to-b from-muted/20 to-background">
      <div className="flex flex-col gap-8 px-4 sm:px-8 py-8 max-w-[1600px] mx-auto pb-20">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Trophy className="w-8 h-8 text-pink-500" />
            YSN Admin Portal
          </h1>
          <p className="text-muted-foreground">
            Complete ecosystem overview: Users, Revenue, Streams, and
            Organizations.
          </p>
        </div>

        {/* Top Level Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {loading
            ? // Simple Skeleton
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-32 rounded-[28px] bg-muted/20 animate-pulse"
                  />
                ))
            : stats.map((stat, i) => {
                const config = getStatConfig(stat.label);
                return (
                  <StatCard
                    key={i}
                    value={formatCount(
                      stat.count,
                      stat.label.includes("Revenue"),
                    )}
                    label={stat.label}
                    change={
                      stat.badge_count > 0 ? `+${stat.badge_count}%` : "0%"
                    }
                    icon={config.icon}
                    highlight={config.highlight}
                    tone={config.tone as "positive" | "negative"}
                    bg={config.bg}
                  />
                );
              })}
        </div>

        {/* Revenue Breakdown Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 rounded-[32px] border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold">
                  Total Revenue Trends
                </CardTitle>
                <CardDescription>
                  Financial performance over time
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={revenueFilter} onValueChange={setRevenueFilter}>
                  <SelectTrigger className="w-[140px] rounded-full h-8 bg-muted/50 border-transparent">
                    <SelectValue placeholder="View By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Platform Total</SelectItem>
                    <SelectItem value="org">By Organization</SelectItem>
                    <SelectItem value="team">By Team</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-full">
                  {(["day", "week", "month", "year"] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={cn(
                        "px-3 py-1 text-xs font-medium rounded-full transition-all",
                        timeRange === range
                          ? "bg-white dark:bg-zinc-800 shadow-sm text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueChartData}>
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#ec4899"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ec4899"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="hsl(var(--border))"
                      opacity={0.4}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                      formatter={(value: number) => [
                        `$${value.toLocaleString()}`,
                        "Revenue",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#ec4899"
                      strokeWidth={3}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border-border/40 shadow-sm flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Revenue Sources
              </CardTitle>
              <CardDescription>Distribution by category</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <div className="h-[250px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueSources.map((s) => ({
                        name: s.label,
                        value: s.value,
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-bold text-foreground">
                    100%
                  </span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    Breakdown
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {revenueSources.map((item, index) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.label} ({item.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Streaming & Content Stats */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-[32px] border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5 text-purple-500" />
                Streaming Performance
              </CardTitle>
              <CardDescription>
                Minutes Streamed vsViewed Minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={streamingChartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="hsl(var(--border))"
                      opacity={0.4}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <RechartsTooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Bar
                      dataKey="value"
                      name="Streaming Performance"
                      fill="#8b5cf6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-fuchsia-500" />
                New User Acquisition
              </CardTitle>
              <CardDescription>Growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={newUserChartData}>
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
                          stopColor="#d946ef"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#d946ef"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="hsl(var(--border))"
                      opacity={0.4}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#d946ef"
                      strokeWidth={3}
                      fill="url(#colorUsers)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stream Events Table */}
        <Card className="rounded-[32px] border-border/40 shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">
                Recent Streamed Events
              </CardTitle>
              <CardDescription>
                Detailed report of recent broadcasts
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="rounded-full gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/30 text-muted-foreground uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">
                    Organization / Team
                  </th>
                  <th className="px-6 py-4 font-semibold">Sponsors</th>
                  <th className="px-6 py-4 font-semibold text-right">
                    Viewers
                  </th>
                  <th className="px-6 py-4 font-semibold text-right">
                    Minutes
                  </th>
                  <th className="px-6 py-4 font-semibold text-right">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {recentEvents.map((event, i) => (
                  <tr key={i} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">
                      {event.date}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">
                          {event.organization}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {event.team}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {event.sponsors.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 text-[10px] font-medium border border-purple-500/20"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      <div className="flex items-center justify-end gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                        {event.viewers.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="font-medium text-foreground">
                          {(event.minutes.viewed / 1000).toFixed(1)}K viewed
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {event.minutes.streamed} streamed
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-fuchsia-500">
                      ${event.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Advertiser Stats & Top Orgs */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="rounded-[32px] border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-pink-500" />
                Top Advertiser Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topAdvertisers.map((ad, i) => (
                  <div
                    key={ad.advertiser}
                    className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-transparent hover:border-border/50 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                        {i + 1}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">
                          {ad.advertiser}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {ad.active_campaigns} Active Campaigns
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-pink-500">
                      ${ad.revenue.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-500" />
                Top Organizations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orgRevenue.map((org, i) => (
                  <div
                    key={org.name}
                    className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-transparent hover:border-border/50 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                        {i + 1}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">
                          {org.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {org.teams} Teams
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-purple-500">
                      ${org.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-2xl bg-fuchsia-500/5 border border-fuchsia-500/10 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-fuchsia-600">
                    New Organizers
                  </span>
                  <span className="text-2xl font-bold text-foreground">12</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-fuchsia-600 hover:text-fuchsia-700 hover:bg-fuchsia-500/10"
                >
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-500" />
                Top Teams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamRevenue.map((team, i) => (
                  <div
                    key={team.name}
                    className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-transparent hover:border-border/50 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                        {i + 1}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">
                          {team.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {team.org}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-indigo-500">
                      ${team.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};

const StatCard = ({
  value,
  label,
  icon,
  change,
  tone = "positive",
  highlight = false,
  bg,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
  change: string;
  tone?: "positive" | "negative";
  highlight?: boolean;
  bg?: string;
}) => (
  <div
    className={cn(
      "group flex flex-col justify-between gap-4 h-full rounded-[28px] p-5 lg:p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
      highlight
        ? cn("text-white border-transparent shadow-lg", bg)
        : "bg-card border-border/40 hover:border-border/80",
    )}
  >
    <div className="flex justify-between items-start">
      <div
        className={cn(
          "p-2.5 rounded-xl transition-transform group-hover:scale-110 duration-300",
          highlight ? "bg-white/20 backdrop-blur-sm" : bg || "bg-muted/50",
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
              ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
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
