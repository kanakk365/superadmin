"use client";

import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Users,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Activity,
  ArrowUpRight,
  Target,
  Gamepad2,
  Building2,
  Film,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TrendBadge } from "../dashboard/TrendBadge";
import Link from "next/link";

// --- Mock Data ---

const trafficData = [
  { name: "Mon", users: 12500 },
  { name: "Tue", users: 15400 },
  { name: "Wed", users: 11200 },
  { name: "Thu", users: 18900 },
  { name: "Fri", users: 24500 },
  { name: "Sat", users: 28900 },
  { name: "Sun", users: 22100 },
];

const revenueTrendData = [
  { name: "Jan", value: 125000 },
  { name: "Feb", value: 145000 },
  { name: "Mar", value: 138000 },
  { name: "Apr", value: 165000 },
  { name: "May", value: 182000 },
  { name: "Jun", value: 210000 },
];

const projects = [
  {
    title: "Battle Lounge",
    id: "battle-lounge",
    description: "Tournament Management & eSports",
    icon: Gamepad2,
    revenue: "$12.5K",
    revenueGrowth: "+12.5%",
    users: "5.4K",
    activeItem: "84 Live Tournaments",
    gradient: "from-[#bd5bf1] via-[#9b46e3] to-[#7a33e1]", // Purple gradient
    shadowColor: "shadow-purple-500/10",
    hoverShadow: "hover:shadow-purple-500/20",
    href: "/battle-lounge",
    data: [40, 60, 45, 70, 85, 90, 75],
  },
  {
    title: "Destination KP",
    id: "destination-kp",
    description: "Tourism & Events Portal",
    icon: Building2,
    revenue: "$125K",
    revenueGrowth: "+8.2%",
    users: "15.4K",
    activeItem: "12 Active Jobs",
    gradient: "from-indigo-400 via-purple-400 to-pink-400", // Indigo/Pink gradient
    shadowColor: "shadow-indigo-400/10",
    hoverShadow: "hover:shadow-indigo-400/20",
    href: "/destination-kp",
    data: [65, 50, 75, 85, 70, 95, 100],
  },
  {
    title: "YSN",
    id: "ysn",
    description: "Youth Sports Network",
    icon: Target,
    revenue: "$45.2K",
    revenueGrowth: "+15.3%",
    users: "1.2K",
    activeItem: "156 Coaches",
    gradient: "from-pink-400 via-fuchsia-400 to-purple-400", // Pink gradient
    shadowColor: "shadow-pink-400/10",
    hoverShadow: "hover:shadow-pink-400/20",
    href: "/ysn",
    data: [30, 45, 40, 60, 55, 70, 80],
  },
  {
    title: "Game Reel",
    id: "game-reel",
    description: "Social Gaming Highlights",
    icon: Film,
    revenue: "$8.5K",
    revenueGrowth: "+22%",
    users: "12.5K",
    activeItem: "45.1K Posts",
    gradient: "from-blue-400 via-cyan-400 to-teal-400", // Cyan/Teal gradient
    shadowColor: "shadow-cyan-400/10",
    hoverShadow: "hover:shadow-cyan-400/20",
    href: "/game-reel",
    data: [50, 65, 55, 80, 90, 85, 95],
  },
];

const overallStats = [
  {
    title: "Total Revenue",
    value: "$191.2K",
    change: "+13.1%",
    trend: "up",
    icon: DollarSign,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Total Users",
    value: "34,554",
    change: "+9.5%",
    trend: "up",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Active Projects",
    value: "4",
    change: "+1",
    trend: "up",
    icon: Activity,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "System Alerts",
    value: "2",
    change: "-1",
    trend: "down",
    icon: AlertCircle,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

export const OverallDashboard = () => {
  return (
    <ScrollArea className="h-full w-full bg-gradient-to-b from-muted/20 to-background">
      <div className="flex flex-col gap-6 lg:gap-8 px-4 sm:px-8 py-8 max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Overview
          </h1>
          <p className="text-muted-foreground">
            Global insights and performance metrics across all connected
            platforms.
          </p>
        </div>

        {/* Top Aggregated Stats - Redesigned */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {overallStats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-border/50 bg-background/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-border/80",
                // Subtle colored glow on hover based on the stat color
                stat.color === "text-emerald-500" &&
                  "hover:shadow-emerald-500/10",
                stat.color === "text-blue-500" && "hover:shadow-blue-500/10",
                stat.color === "text-purple-500" &&
                  "hover:shadow-purple-500/10",
                stat.color === "text-amber-500" && "hover:shadow-amber-500/10",
              )}
            >
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    "rounded-2xl p-3 transition-colors duration-300 group-hover:scale-110",
                    stat.bg,
                  )}
                >
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
                {stat.trend !== "neutral" && (
                  <div
                    className={cn(
                      "flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-md",
                      stat.trend === "up" ||
                        (stat.title.includes("Alerts") && stat.trend === "down")
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
                    )}
                  >
                    <span>{stat.change}</span>
                    <TrendingUp
                      className={cn(
                        "h-3 w-3",
                        stat.trend === "down" && "rotate-180",
                      )}
                    />
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-1">
                <h3 className="text-3xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </h3>
                <p className="text-sm font-medium text-muted-foreground/80 group-hover:text-foreground transition-colors">
                  {stat.title}
                </p>
              </div>

              {/* Decorative gradient blob */}
              <div
                className={cn(
                  "absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-all duration-500 group-hover:opacity-40 opacity-0",
                  stat.color === "text-emerald-500" && "bg-emerald-500",
                  stat.color === "text-blue-500" && "bg-blue-500",
                  stat.color === "text-purple-500" && "bg-purple-500",
                  stat.color === "text-amber-500" && "bg-amber-500",
                )}
              />
            </div>
          ))}
        </div>

        {/* Projects Section - TRANSFORMED into Large Cards */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              Project Summary
            </h2>
          </div>
          {/* Using a responsive grid: 1 col mobile, 2 cols lg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <LargeProjectCard key={index} project={project} />
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Traffic Chart */}
          <Card className="lg:col-span-2 rounded-[32px] border-border/40 shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                Global Traffic & User Activity
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Daily unique visitors across all platforms for the last week.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trafficData} barSize={40}>
                    <defs>
                      <linearGradient
                        id="barGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.3}
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
                      tickFormatter={(value) => `${value / 1000}k`}
                    />
                    <Tooltip
                      cursor={{ fill: "hsl(var(--muted))", opacity: 0.2 }}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        backgroundColor: "hsl(var(--popover))",
                        color: "hsl(var(--popover-foreground))",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Bar
                      dataKey="users"
                      fill="url(#barGradient)"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Trend Mini-Chart */}
          <Card className="rounded-[32px] border-border/40 shadow-sm flex flex-col bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                Revenue Growth
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                6-Month financial performance.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-[200px] flex flex-col justify-end">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueTrendData}>
                    <defs>
                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8b5cf6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Tooltip
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
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};

const LargeProjectCard = ({ project }: { project: any }) => {
  // Generate simple chart data based on the project data
  const chartData = project.data.map((val: number, i: number) => ({
    name: i,
    value: val,
  }));

  return (
    <Link
      href={project.href}
      className={cn(
        "group relative h-[320px] rounded-[32px] text-white p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 block cursor-pointer",
        "bg-gradient-to-br shadow-xl hover:shadow-2xl",
        project.gradient,
        project.shadowColor,
        project.hoverShadow,
      )}
    >
      {/* Content Container */}
      <div className="flex flex-col h-full justify-between relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/15 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner">
              <project.icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/70 uppercase tracking-wider">
                {project.description}
              </p>
              <div className="flex items-center gap-2">
                <h3 className="text-3xl font-bold tracking-tight mt-1 text-white">
                  {project.title}
                </h3>
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <TrendBadge
              change={project.revenueGrowth}
              tone="positive"
              className="text-white border-white/10 backdrop-blur-md px-3 py-1 bg-white/10"
            />
            <p className="text-xs text-white/60">Growth</p>
          </div>
        </div>

        {/* Mini Chart Area */}
        <div className="flex-1 w-full min-h-[100px] -ml-2 relative opacity-80 group-hover:opacity-100 transition-opacity">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id={`gradient-${project.id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#fff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#fff"
                strokeWidth={3}
                fillOpacity={1}
                fill={`url(#gradient-${project.id})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Revenue
            </span>
            <span className="text-xl font-bold text-white">
              {project.revenue}
            </span>
          </div>
          <div className="flex flex-col gap-1 border-l border-white/20 pl-6">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Users
            </span>
            <span className="text-xl font-bold text-white">
              {project.users}
            </span>
          </div>
          <div className="flex flex-col gap-1 border-l border-white/20 pl-6">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Active
            </span>
            <span className="text-sm font-bold text-white mt-1 line-clamp-1">
              {project.activeItem}
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[80px] pointer-events-none mix-blend-overlay" />
      <div className="absolute -left-20 bottom-0 w-60 h-60 bg-black/10 rounded-full blur-[60px] pointer-events-none mix-blend-multiply" />
    </Link>
  );
};
