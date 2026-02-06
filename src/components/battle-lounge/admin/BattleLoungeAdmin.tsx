"use client";

import React, { useState, useEffect, ReactNode } from "react";
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
  Loader2,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getAdminCount,
  getUserGrowth,
  getTournamentOverview,
  getRecentTournaments,
  getLiveTwitchStreams,
  AdminCountStat,
  UserGrowthData,
  TournamentOverview,
  RecentTournament,
  LiveTwitchStream,
} from "@/lib/api/battle-lounge/admin";

const COLORS = ["#d946ef", "#a855f7", "#ec4899"]; // Fuchsia, Purple, Pink

export const BattleLoungeAdmin = () => {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">(
    "week",
  );

  // API state
  const [isLoading, setIsLoading] = useState(true);
  const [adminStats, setAdminStats] = useState<AdminCountStat[]>([]);
  const [userGrowthData, setUserGrowthData] = useState<UserGrowthData | null>(
    null,
  );
  const [tournamentOverview, setTournamentOverview] =
    useState<TournamentOverview | null>(null);
  const [recentTournaments, setRecentTournaments] = useState<
    RecentTournament[]
  >([]);
  const [liveStreams, setLiveStreams] = useState<LiveTwitchStream[]>([]);
  const [isTournamentModalOpen, setIsTournamentModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [
          statsRes,
          userGrowthRes,
          tournamentOverviewRes,
          recentTournamentsRes,
          liveStreamsRes,
        ] = await Promise.allSettled([
          getAdminCount(),
          getUserGrowth(),
          getTournamentOverview(),
          getRecentTournaments(),
          getLiveTwitchStreams(),
        ]);

        if (statsRes.status === "fulfilled" && statsRes.value.status) {
          setAdminStats(statsRes.value.data);
        }

        if (
          userGrowthRes.status === "fulfilled" &&
          userGrowthRes.value.status
        ) {
          setUserGrowthData(userGrowthRes.value.data);
        }

        if (
          tournamentOverviewRes.status === "fulfilled" &&
          tournamentOverviewRes.value.status
        ) {
          setTournamentOverview(tournamentOverviewRes.value.data);
        }

        if (
          recentTournamentsRes.status === "fulfilled" &&
          recentTournamentsRes.value.status
        ) {
          setRecentTournaments(recentTournamentsRes.value.data);
        }

        if (
          liveStreamsRes.status === "fulfilled" &&
          liveStreamsRes.value.status
        ) {
          setLiveStreams(liveStreamsRes.value.data);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper to find stats by label
  const getStatByLabel = (label: string) => {
    return adminStats.find(
      (s) => s.label.toLowerCase() === label.toLowerCase(),
    );
  };

  // Prepare user growth chart data
  const getChartData = () => {
    if (!userGrowthData) return [];
    const data = userGrowthData[timeRange];
    if (!data || data.length === 0) return [];
    return data.map((item) => ({
      name: item.label,
      value: item.total,
    }));
  };

  // Prepare tournament overview pie chart data
  const getTournamentStatsData = () => {
    if (!tournamentOverview) return [];
    return [
      { name: "Created", value: tournamentOverview.created },
      { name: "Played", value: tournamentOverview.played },
      { name: "Cancelled", value: tournamentOverview.canceled },
    ];
  };

  // Check if chart data has any non-zero values
  const hasChartData = (data: { value: number }[]) => {
    return data.some((item) => item.value > 0);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const totalUsersStat = getStatByLabel("Total Users");
  const activeUsersStat = getStatByLabel("Active Users");
  const avgSessionStat = getStatByLabel("Avg Session");
  const totalRevenueStat = getStatByLabel("Total Revenue");

  const chartData = getChartData();
  const tournamentStatsData = getTournamentStatsData();

  const renderTournamentTable = (tournaments: RecentTournament[]) => (
    <div className="overflow-x-auto">
      {tournaments.length > 0 ? (
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/30 text-muted-foreground uppercase text-xs">
            <tr>
              <th className="px-6 py-4 font-semibold">Tournament</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Players</th>
              <th className="px-6 py-4 font-semibold">Prize</th>
              <th className="px-6 py-4 font-semibold">Issues</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {tournaments.map((t) => (
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
                      ID: {t.id}
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
                      {t.no_of_players} Players
                    </span>
                    <div className="flex gap-2 text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      <span
                        title="New"
                        className="text-purple-500 hover:bg-purple-500/10 px-1 rounded transition-colors"
                      >
                        N: {t.new}
                      </span>
                      <span
                        title="Ranked"
                        className="text-fuchsia-500 hover:bg-fuchsia-500/10 px-1 rounded transition-colors"
                      >
                        R: {t.ranked}
                      </span>
                      <span
                        title="Unranked"
                        className="text-pink-500/70 hover:bg-pink-500/10 px-1 rounded transition-colors"
                      >
                        U: {t.un_ranked}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-fuchsia-500">
                    {t.prize_amount || "N/A"}
                  </span>
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
                      <span>{t.no_showes}</span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <div className="text-center">
            <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No recent tournaments found</p>
          </div>
        </div>
      )}
    </div>
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
            value={totalUsersStat ? String(totalUsersStat.count) : "No data"}
            label="Total Users"
            change={totalUsersStat ? `+${totalUsersStat.badge_count}%` : "+0%"}
            icon={<Users className="w-6 h-6 text-purple-500" />}
            tone="neutral"
            bg="bg-purple-500/10"
          />
          <StatCard
            value={activeUsersStat ? String(activeUsersStat.count) : "No data"}
            label="Active Users"
            change={
              activeUsersStat ? `+${activeUsersStat.badge_count}%` : "+0%"
            }
            icon={<Activity className="w-6 h-6 text-fuchsia-500" />}
            tone="neutral"
            bg="bg-fuchsia-500/10"
          />
          <StatCard
            value={avgSessionStat ? String(avgSessionStat.count) : "No data"}
            label="Avg Session"
            change={avgSessionStat ? `+${avgSessionStat.badge_count}%` : "+0%"}
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
                {totalRevenueStat ? `+${totalRevenueStat.badge_count}%` : "+0%"}
              </span>
            </div>
            <div className="flex flex-col gap-1 z-10">
              <span className="text-3xl font-bold tracking-tight text-white">
                {totalRevenueStat ? String(totalRevenueStat.count) : "No data"}
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
                {hasChartData(chartData) ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
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
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No data available for this period</p>
                    </div>
                  </div>
                )}
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
                {hasChartData(tournamentStatsData) ? (
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
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No data available</p>
                    </div>
                  </div>
                )}
                {hasChartData(tournamentStatsData) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-bold">
                      {tournamentOverview?.total ?? 0}
                    </span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      Total
                    </span>
                  </div>
                )}
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
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => setIsTournamentModalOpen(true)}
            >
              View All
            </Button>
          </div>
          <Card className="rounded-[32px] border-border/40 shadow-sm overflow-hidden">
             {renderTournamentTable(recentTournaments.slice(0, 5))}
          </Card>
          
          <Dialog
             open={isTournamentModalOpen}
             onOpenChange={setIsTournamentModalOpen}
          >
             <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 overflow-hidden">
               <DialogHeader className="p-6 pb-4 border-b shrink-0">
                 <DialogTitle>All Tournaments</DialogTitle>
               </DialogHeader>
               <ScrollArea className="flex-1 h-full">
                  <div className="p-6">
                    {renderTournamentTable(recentTournaments)}
                  </div>
               </ScrollArea>
             </DialogContent>
          </Dialog>
        </div>

        {/* Bottom Section: Streams only now */}
        <div className="grid gap-6 lg:grid-cols-1">
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
                {liveStreams.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {liveStreams.map((stream, index) => (
                      <div
                        key={index}
                        className="group flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-transparent hover:border-border/50 hover:bg-muted/50 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                            <Twitch className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {stream.label}
                            </span>
                            <span className="text-xs font-medium text-muted-foreground">
                              {stream.user}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-fuchsia-500 text-sm font-bold bg-fuchsia-500/10 px-3 py-1 rounded-full">
                          <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
                          {stream.count.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8 text-muted-foreground">
                    <div className="text-center">
                      <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No live streams available</p>
                    </div>
                  </div>
                )}
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
