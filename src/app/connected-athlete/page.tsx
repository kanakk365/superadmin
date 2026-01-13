"use client";

import DashboardLayout from "@/components/main/DashboardLayout";
import { TrendBadge } from "@/components/dashboard/TrendBadge";
import { cn } from "@/lib/utils";
import {
  Users,
  Watch,
  Activity,
  ArrowUpRight,
  Zap,
  BarChart3,
  MonitorSmartphone,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ReactNode } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// --- Mock Data ---

const activityData = [
  { name: "Mon", value: 4000 },
  { name: "Tue", value: 3000 },
  { name: "Wed", value: 5000 },
  { name: "Thu", value: 2780 },
  { name: "Fri", value: 6890 },
  { name: "Sat", value: 8390 },
  { name: "Sun", value: 7490 },
];

const ageData = [
  { range: "18-24", male: 1200, female: 900 },
  { range: "25-34", male: 2500, female: 2100 },
  { range: "35-44", male: 1800, female: 1600 },
  { range: "45-54", male: 800, female: 700 },
  { range: "55+", male: 400, female: 300 },
];

const deviceData = [
  { name: "Fitbit", value: 45, color: "#bd5bf1" },
  { name: "Garmin", value: 30, color: "#9b46e3" },
  { name: "Apple", value: 15, color: "#7a33e1" },
  { name: "Polar", value: 10, color: "#e30613" },
];

const demographicsConfig = {
  male: {
    label: "Male",
    color: "#7a33e1",
  },
  female: {
    label: "Female",
    color: "#bd5bf1",
  },
} satisfies ChartConfig;

export default function ConnectedAthletePage() {
  return (
    <DashboardLayout pageLabel="Rivalis">
      <ScrollArea className="h-full w-full">
        <div className="flex flex-col gap-5 lg:gap-7.5 p-4 md:p-6 lg:p-8 animate-in fade-in duration-500">
          {/* Row 1: Bento Grid */}
          <div className="grid lg:grid-cols-3 gap-y-5 lg:gap-7.5 items-stretch">
            {/* Col 1: Small Stats Grid */}
            <div className="lg:col-span-1">
              <div className="grid grid-cols-2 gap-4 lg:gap-6 h-full items-stretch">
                <StatCard
                  value="42.5K"
                  label="Total Athletes"
                  icon={<Users className="w-5 h-5" />}
                  change="+14%"
                  delay={0}
                />
                <StatCard
                  value="28.1K"
                  label="Active Devices"
                  icon={<Watch className="w-5 h-5" />}
                  change="+8%"
                  highlight
                  delay={100}
                />
                <StatCard
                  value="1.2M"
                  label="Data Points"
                  icon={<Activity className="w-5 h-5" />}
                  change="+24%"
                  highlight
                  delay={200}
                />
                <StatCard
                  value="45m"
                  label="Avg Session"
                  icon={<Zap className="w-5 h-5" />}
                  change="+2m"
                  delay={300}
                />
              </div>
            </div>

            {/* Col 2 & 3: Large Activity Card */}
            <div className="lg:col-span-2">
              <div className="group h-full rounded-[32px] bg-gradient-to-br from-[#bd5bf1] via-[#9b46e3] to-[#7a33e1] text-white p-8 lg:p-10 flex flex-col justify-between shadow-xl shadow-purple-500/10 relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="flex flex-col gap-8 relative z-10 h-full">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/15 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner">
                        <BarChart3 className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/70 uppercase tracking-wider">
                          Weekly Activity
                        </p>
                        <h3 className="text-4xl lg:text-5xl font-bold tracking-tight mt-1 text-white">
                          1,245,678
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <TrendBadge
                        change="+12%"
                        tone="positive"
                        className=" text-white border-white/10 backdrop-blur-md px-3 py-1"
                      />
                      <p className="text-xs text-purple-100">vs last week</p>
                    </div>
                  </div>

                  {/* Main Activity Chart */}
                  <div className="flex-1 w-full min-h-[140px] -ml-2 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={activityData}>
                        <defs>
                          <linearGradient
                            id="colorActivity"
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
                          fill="url(#colorActivity)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Footer Metrics */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                        Workouts
                      </span>
                      <span className="text-xl font-bold text-white">
                        24.5K
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-white/10 pl-6">
                      <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                        Calories Burned
                      </span>
                      <span className="text-xl font-bold text-white">45M</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-white/10 pl-6">
                      <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                        Distance
                      </span>
                      <span className="text-xl font-bold text-white">
                        120K km
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative background elements */}
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[80px] pointer-events-none mix-blend-overlay"></div>
                <div className="absolute -left-20 bottom-0 w-60 h-60 bg-purple-900/20 rounded-full blur-[60px] pointer-events-none mix-blend-multiply"></div>
              </div>
            </div>
          </div>

          {/* Row 2: Demographics & Devices */}
          <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
            {/* Col 1: Age & Gender Chart (Refactored) */}
            <div className="lg:col-span-2 group rounded-[32px] bg-card border border-border p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      User Demographics
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Distribution by Age and Gender
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-[300px] w-full">
                <ChartContainer
                  config={demographicsConfig}
                  className="h-full w-full"
                >
                  <BarChart
                    accessibilityLayer
                    data={ageData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="range"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                    />
                    <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                    <ChartTooltip
                      content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="male"
                      fill="var(--color-male)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="female"
                      fill="var(--color-female)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>

            {/* Col 2: Device Ecosystem */}
            <div className="lg:col-span-1 group rounded-[32px] bg-card border border-border p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-500">
                    <MonitorSmartphone className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Devices</h3>
                </div>
                <button className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground">
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <div className="h-[200px] w-full relative mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        cornerRadius={6}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            stroke="none"
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-foreground">
                        100%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Connected
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {deviceData.map((device) => (
                    <div
                      key={device.name}
                      className="flex items-center justify-between group/row"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: device.color }}
                        />
                        <span className="text-sm font-medium text-muted-foreground">
                          {device.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">
                          {device.value}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ScrollBar />
      </ScrollArea>
    </DashboardLayout>
  );
}

// --- Components (Copied from YSN/GameReel for exact style matching) ---

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
        ? "bg-gradient-to-br from-[#bd5bf1] via-[#9b46e3] to-[#7a33e1] text-white border-transparent shadow-lg shadow-purple-500/25"
        : "bg-card border-border/60 hover:border-border"
    )}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex justify-between items-start">
      <div
        className={cn(
          "p-2.5 rounded-xl transition-transform group-hover:scale-110 duration-300",
          highlight
            ? "bg-white/20 backdrop-blur-sm shadow-inner"
            : "bg-muted text-muted-foreground"
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
              : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
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
