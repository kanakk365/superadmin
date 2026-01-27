"use client";

import React, { useState, ReactNode } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Users,
  Activity,
  Trophy,
  Swords,
  Video,
  DollarSign,
  TrendingUp,
  UserPlus,
  Gamepad2,
  Calendar,
  AlertCircle,
  Eye,
  Radio,
  Building2,
  Twitch,
  Info,
  CheckCircle,
  PlayCircle,
  Ban,
  ArrowUpRight,
  UserCheck,
} from "lucide-react";
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// --- Mock Data ---

const userGrowthData = {
  day: [
    { name: "00:00", value: 12 },
    { name: "04:00", value: 8 },
    { name: "08:00", value: 24 },
    { name: "12:00", value: 45 },
    { name: "16:00", value: 38 },
    { name: "20:00", value: 52 },
  ],
  week: [
    { name: "Mon", value: 145 },
    { name: "Tue", value: 230 },
    { name: "Wed", value: 180 },
    { name: "Thu", value: 295 },
    { name: "Fri", value: 340 },
    { name: "Sat", value: 410 },
    { name: "Sun", value: 380 },
  ],
  month: [
    { name: "Week 1", value: 850 },
    { name: "Week 2", value: 940 },
    { name: "Week 3", value: 1120 },
    { name: "Week 4", value: 1250 },
  ],
  year: [
    { name: "Jan", value: 3200 },
    { name: "Feb", value: 3800 },
    { name: "Mar", value: 4100 },
    { name: "Apr", value: 4500 },
    { name: "May", value: 5200 },
    { name: "Jun", value: 5800 },
  ],
};

const tournamentStatsData = [
  { name: "Created", value: 156 },
  { name: "Played", value: 142 },
  { name: "Cancelled", value: 14 },
];

const COLORS = ["#d946ef", "#a855f7", "#ec4899"]; // Fuchsia, Purple, Pink

const tournamentList = [
  {
    id: 1,
    name: "Warzone Weekly",
    date: "Jan 15, 2026",
    prize: "$5,000",
    game: "Call of Duty",
    type: "Battle Royale",
    sponsors: ["Red Bull", "NVIDIA"],
    users: 1250,
    revenue: "$8,500",
    totalPlayers: 256,
    playerTypes: { new: 45, ranked: 156, unranked: 55 },
    disputes: 3,
    cancelled: false,
    noShow: 12,
    scoreSource: { app: 85, web: 15 }, // Percentage
    status: "Completed",
  },
  {
    id: 2,
    name: "Fortnite FNCS",
    date: "Jan 20, 2026",
    prize: "$100,000",
    game: "Fortnite",
    type: "Elimination",
    sponsors: ["Epic", "Samsung"],
    users: 8500,
    revenue: "$125,000",
    totalPlayers: 500,
    playerTypes: { new: 120, ranked: 280, unranked: 100 },
    disputes: 8,
    cancelled: false,
    noShow: 28,
    scoreSource: { app: 92, web: 8 },
    status: "Live",
  },
  {
    id: 3,
    name: "Apex Legends Global",
    date: "Jan 18, 2026",
    prize: "$50,000",
    game: "Apex Legends",
    type: "Squad",
    sponsors: ["EA", "Monster"],
    users: 4200,
    revenue: "$62,000",
    totalPlayers: 300,
    playerTypes: { new: 65, ranked: 180, unranked: 55 },
    disputes: 4,
    cancelled: true,
    noShow: 0,
    scoreSource: { app: 0, web: 0 },
    status: "Cancelled",
  },
];

const liveStreams = [
  {
    id: 1,
    title: "Grand Finals - WZ Weekly",
    viewerCount: 12500,
    streamer: "OfficialCoD",
  },
  {
    id: 2,
    title: "FNCS Qualifier Round 3",
    viewerCount: 8400,
    streamer: "FortniteOfficial",
  },
  { id: 3, title: "Apex Scrims", viewerCount: 3200, streamer: "NiceWigg" },
];

export const BattleLoungeAdmin = () => {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">(
    "week",
  );

  return (
    <ScrollArea className="h-full w-full bg-gradient-to-b from-muted/20 to-background">
      <div className="flex flex-col gap-6 lg:gap-8 px-4 sm:px-8 py-8 max-w-[1600px] mx-auto pb-20">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-primary" />
            Battle Lounge Admin
          </h1>
          <p className="text-muted-foreground">
            Comprehensive overview of tournaments, users, and platform
            performance.
          </p>
        </div>

        {/* Top Level Metrics - Neon / Cyber Theme */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            value="30,200"
            label="Total Users"
            change="+12%"
            icon={<Users className="w-6 h-6 text-purple-500" />}
            tone="neutral"
            bg="bg-purple-500/10"
          />
          <StatCard
            value="18,450"
            label="Active Users"
            change="+5.4%"
            icon={<Activity className="w-6 h-6 text-fuchsia-500" />}
            tone="neutral"
            bg="bg-fuchsia-500/10"
          />
          <StatCard
            value="45m"
            label="Avg Session"
            change="+2%"
            icon={<TrendingUp className="w-6 h-6 text-pink-500" />}
            tone="neutral"
            bg="bg-pink-500/10"
          />
          {/* Revenue Card - Special Gradient Style */}
          <div className="group flex flex-col justify-between gap-4 h-full rounded-[28px] p-6 bg-gradient-to-br from-[#bd5bf1] via-[#9b46e3] to-[#7a33e1] text-white shadow-xl shadow-purple-500/10 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="flex justify-between items-start z-10">
              <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm bg-white/20 text-white">
                +14.8%
              </span>
            </div>
            <div className="flex flex-col gap-1 z-10">
              <span className="text-3xl font-bold tracking-tight text-white">
                $201.2K
              </span>
              <span className="text-sm font-medium text-white/80">
                Total Revenue
              </span>
            </div>
            {/* Decorative background elements */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-[40px] pointer-events-none mix-blend-overlay"></div>
            <div className="absolute -left-10 bottom-0 w-32 h-32 bg-purple-900/20 rounded-full blur-[30px] pointer-events-none mix-blend-multiply"></div>
          </div>
        </div>

        {/* User Growth Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 rounded-[32px] border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold">
                  New User Growth
                </CardTitle>
                <CardDescription>
                  Track user acquisition over time
                </CardDescription>
              </div>
              <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
                {(["day", "week", "month", "year"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded-md transition-all",
                      timeRange === range
                        ? "bg-background shadow-sm text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userGrowthData[timeRange]}>
                    <defs>
                      <linearGradient
                        id="colorValue"
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
                        border: "1px solid hsl(var(--border))",
                        backgroundColor: "hsl(var(--popover))",
                        color: "hsl(var(--popover-foreground))",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#d946ef"
                      strokeWidth={3}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border-border/40 shadow-sm flex flex-col overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Tournaments Overview
              </CardTitle>
              <CardDescription>Status distribution</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center">
              <div className="h-[250px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tournamentStatsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {tournamentStatsData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-bold">312</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    Total
                  </span>
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                {tournamentStatsData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-xs font-medium text-muted-foreground">
                      {entry.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tournament List */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">
              Recent Tournaments
            </h2>
            <Button variant="outline" size="sm" className="rounded-full">
              View All
            </Button>
          </div>
          <Card className="rounded-[32px] border-border/40 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/30 text-muted-foreground uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Tournament</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Players</th>
                    <th className="px-6 py-4 font-semibold">Financials</th>
                    <th className="px-6 py-4 font-semibold">Issues</th>
                    <th className="px-6 py-4 font-semibold">
                      <div className="flex items-center gap-1">
                        App vs Web
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-popover text-popover-foreground rounded-xl border border-border shadow-lg">
                              <p>
                                Percentage of scores recorded via Mobile App vs
                                Web Dashboard
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {tournamentList.map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground text-base">
                            {t.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {t.game} • {t.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-sm",
                            t.status === "Live"
                              ? "bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20"
                              : t.status === "Completed"
                                ? "bg-muted text-muted-foreground border-border"
                                : "bg-purple-500/10 text-purple-500 border-purple-500/20",
                          )}
                        >
                          {t.status === "Live" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 mr-1.5 animate-pulse" />
                          )}
                          {t.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-foreground">
                            {t.totalPlayers} Players
                          </span>
                          <div className="flex gap-2 text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                            <span
                              title="New"
                              className="text-purple-500 hover:bg-purple-500/10 px-1 rounded transition-colors"
                            >
                              N: {t.playerTypes.new}
                            </span>
                            <span
                              title="Ranked"
                              className="text-fuchsia-500 hover:bg-fuchsia-500/10 px-1 rounded transition-colors"
                            >
                              R: {t.playerTypes.ranked}
                            </span>
                            <span
                              title="Unranked"
                              className="text-pink-500/70 hover:bg-pink-500/10 px-1 rounded transition-colors"
                            >
                              U: {t.playerTypes.unranked}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-fuchsia-500">
                            {t.revenue}
                          </span>
                          <span className="text-xs text-muted-foreground font-medium">
                            Prize: {t.prize}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div
                            title="Disputes"
                            className="flex items-center gap-1.5 text-purple-500 font-medium"
                          >
                            <AlertCircle className="w-4 h-4" />
                            <span>{t.disputes}</span>
                          </div>
                          <div
                            title="No Show"
                            className="flex items-center gap-1.5 text-muted-foreground font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            <span>{t.noShow}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-32 h-2.5 bg-muted rounded-full overflow-hidden flex shadow-inner">
                          <div
                            className="h-full bg-purple-500"
                            style={{ width: `${t.scoreSource.app}%` }}
                          />
                          <div
                            className="h-full bg-fuchsia-500"
                            style={{ width: `${t.scoreSource.web}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] font-semibold text-muted-foreground mt-1.5 px-0.5">
                          <span className="text-purple-600 dark:text-purple-400">
                            App {t.scoreSource.app}%
                          </span>
                          <span className="text-fuchsia-600 dark:text-fuchsia-400">
                            Web {t.scoreSource.web}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Bottom Section: Streams & Org Stats */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Live Streams */}
          <Card className="rounded-[32px] border-border/40 shadow-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5 text-fuchsia-500" />
                Live Twitch Streams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liveStreams.map((stream) => (
                  <div
                    key={stream.id}
                    className="group flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-transparent hover:border-border/50 hover:bg-muted/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                        <Twitch className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {stream.title}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">
                          {stream.streamer}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-fuchsia-500 text-sm font-bold bg-fuchsia-500/10 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
                      {stream.viewerCount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Organizer Stats */}
          <Card className="rounded-[32px] border-border/40 shadow-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-500" />
                Organizer Ecosystem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-[24px] bg-purple-500/10 border border-purple-500/20 flex flex-col gap-2 hover:bg-purple-500/15 transition-colors">
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                    Total Organizers
                  </span>
                  <span className="text-3xl font-bold text-foreground tracking-tight">
                    1,248
                  </span>
                  <span className="text-xs font-medium text-purple-600/70 dark:text-purple-400/70">
                    +56 this month
                  </span>
                </div>
                <div className="p-5 rounded-[24px] bg-pink-500/10 border border-pink-500/20 flex flex-col gap-2 hover:bg-pink-500/15 transition-colors">
                  <span className="text-sm font-semibold text-pink-600 dark:text-pink-400">
                    New Organizers
                  </span>
                  <span className="text-3xl font-bold text-foreground tracking-tight">
                    86
                  </span>
                  <span className="text-xs font-medium text-pink-600/70 dark:text-pink-400/70">
                    Last 30 days
                  </span>
                </div>
                <div className="p-5 rounded-[24px] bg-purple-500/10 border border-purple-500/20 flex flex-col gap-2 hover:bg-purple-500/15 transition-colors">
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                    Advertisers
                  </span>
                  <span className="text-3xl font-bold text-foreground tracking-tight">
                    156
                  </span>
                  <span className="text-xs font-medium text-purple-600/70 dark:text-purple-400/70">
                    Active Campaigns
                  </span>
                </div>
                <div className="p-5 rounded-[24px] bg-fuchsia-500/10 border border-fuchsia-500/20 flex flex-col gap-2 hover:bg-fuchsia-500/15 transition-colors">
                  <span className="text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400">
                    Ad Revenue
                  </span>
                  <span className="text-3xl font-bold text-foreground tracking-tight">
                    $45.2K
                  </span>
                  <span className="text-xs font-medium text-fuchsia-600/70 dark:text-fuchsia-400/70">
                    +12% vs last month
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};

// Reused StatCard from Organizer Panel for consistency
const StatCard = ({
  value,
  label,
  icon,
  change,
  tone = "positive",
  highlight = false,
  delay = 0,
  bg,
}: {
  value: string;
  label: string;
  icon: ReactNode;
  change: string;
  tone?: "positive" | "negative" | "neutral";
  highlight?: boolean;
  delay?: number;
  bg?: string;
}) => (
  <div
    className={cn(
      "group flex flex-col justify-between gap-4 h-full rounded-[28px] p-5 lg:p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
      highlight
        ? "bg-gradient-to-br from-primary to-primary/90 text-white border-transparent shadow-lg shadow-primary/25"
        : "bg-card border-border/40 hover:border-border/80",
    )}
    style={{ animationDelay: `${delay}ms` }}
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
              : tone === "negative"
                ? "bg-pink-500/10 text-pink-600 dark:text-pink-400"
                : "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400",
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
