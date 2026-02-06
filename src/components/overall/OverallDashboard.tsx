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
  ArrowRight,
  Target,
  Gamepad2,
  Building2,
  Trophy,
  Swords,
  Calendar,
  PlayCircle,
  CheckCircle,
  Briefcase,
  Star,
  Crown,
  UserCheck,
  Medal,
  Flame,
  MapPin,
  Sparkles,
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
import { useEffect, useState } from "react";
import {
  getYSNAdminCount,
  getYSNAdminTotalRevenueTrends,
  getYSNAdminNewUserAcquisition,
} from "@/lib/api/ysn-admin";
import {
  getYSNOrganizerCount,
  getYSNOrganizerTotalRevenue,
  getYSNOrganizerNewUserGrowth,
} from "@/lib/api/ysn-organizer";
import {
  getAdminCount,
  getUserGrowth,
  getTournamentOverview,
  getRecentTournaments,
  getLiveTwitchStreams,
} from "@/lib/api/battle-lounge/admin";
import {
  getOrganizerStats,
  getOrganizerUsers,
  getPopularGames,
  getStatusBasedTournaments,
  getTournamentStatistics,
} from "@/lib/api/battle-lounge/organizer";
import {
  getDKPCount,
  getDKPRevenue,
  getActiveJobs,
  getUpcomingEvents,
  getGuestChannel,
  getEventAttendanceTrends,
} from "@/lib/api/dkp";

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
    gradient: "from-[#bd5bf1] via-[#9b46e3] to-[#7a33e1]",
    shadowColor: "shadow-purple-500/10",
    hoverShadow: "hover:shadow-purple-500/20",
    href: "/battle-lounge",
    data: [40, 60, 45, 70, 85, 90, 75],
    // Extended project-specific stats
    stats: {
      primaryMetrics: [
        {
          label: "Live Tournaments",
          value: "8",
          icon: PlayCircle,
          highlight: true,
        },
        { label: "Completed", value: "32", icon: CheckCircle },
        { label: "Upcoming", value: "15", icon: Calendar },
        { label: "Total Prizes", value: "$45K", icon: Trophy },
      ],
      topGames: [
        { name: "Call of Duty", players: "1.5K", percentage: 35 },
        { name: "Fortnite", players: "1.2K", percentage: 28 },
        { name: "Apex Legends", players: "800", percentage: 18 },
      ],
      quickStats: [
        { label: "Active Players", value: "2.1K", change: "+12%" },
        { label: "Organizers", value: "600", change: "+15%" },
        { label: "Matches Today", value: "45", change: "+8%" },
      ],
    },
  },
  {
    title: "Destination KP",
    id: "destination-kp",
    description: "Tourism & Events Portal",
    icon: Building2,
    revenue: "$125K",
    revenueGrowth: "+8.2%",
    users: "15.4K",
    gradient: "from-indigo-400 via-purple-400 to-pink-400",
    shadowColor: "shadow-indigo-400/10",
    hoverShadow: "hover:shadow-indigo-400/20",
    href: "/destination-kp",
    data: [65, 50, 75, 85, 70, 95, 100],
    stats: {
      primaryMetrics: [
        { label: "Active Jobs", value: "12", icon: Briefcase, highlight: true },
        { label: "Upcoming Events", value: "8", icon: Calendar },
        { label: "Destinations", value: "24", icon: MapPin },
        { label: "Contact Requests", value: "45", icon: Users },
      ],
      topGames: [
        { name: "Tourism Packages", players: "45%", percentage: 45 },
        { name: "Event Bookings", players: "35%", percentage: 35 },
        { name: "Facility Rentals", players: "20%", percentage: 20 },
      ],
      quickStats: [
        { label: "Subscribers", value: "2.9K", change: "+24%" },
        { label: "Page Views", value: "48K", change: "+18%" },
        { label: "Bookings", value: "156", change: "+31%" },
      ],
    },
  },
  {
    title: "YSN",
    id: "ysn",
    description: "Youth Sports Network",
    icon: Target,
    revenue: "$45.2K",
    revenueGrowth: "+15.3%",
    users: "1.2K",
    gradient: "from-pink-400 via-fuchsia-400 to-purple-400",
    shadowColor: "shadow-pink-400/10",
    hoverShadow: "hover:shadow-pink-400/20",
    href: "/ysn",
    data: [30, 45, 40, 60, 55, 70, 80],
    topLabel: "Top Players",
    stats: {
      primaryMetrics: [
        {
          label: "Active Coaches",
          value: "156",
          icon: UserCheck,
          highlight: true,
        },
        { label: "Teams", value: "84", icon: Users },
        { label: "Matches Today", value: "12", icon: Trophy },
        { label: "Organizations", value: "38", icon: Building2 },
      ],
      topGames: [
        { name: "Marcus Chen", players: "MVP", percentage: 95 },
        { name: "Sarah Williams", players: "32 Goals", percentage: 85 },
        { name: "Jake Rodriguez", players: "28 Assists", percentage: 75 },
      ],
      quickStats: [
        { label: "Active Players", value: "1.8K", change: "+22%" },
        { label: "Upcoming Matches", value: "28", change: "+15%" },
        { label: "Avg. Age", value: "14.5", change: "0%" },
      ],
    },
  },
  {
    title: "Rivalis",
    id: "rivalis",
    description: "Competitor Monitoring & Analytics",
    icon: Swords,
    revenue: "$18.5K",
    revenueGrowth: "+28%",
    users: "8.2K",
    gradient: "from-[#bd5bf1] via-[#9b46e3] to-[#7a33e1]",
    shadowColor: "shadow-purple-500/10",
    hoverShadow: "hover:shadow-purple-500/20",
    href: "/connected-athlete",
    data: [50, 65, 55, 80, 90, 85, 95],
    topLabel: "Top Tracked",
    stats: {
      primaryMetrics: [
        {
          label: "Competitors",
          value: "24",
          icon: Users,
          highlight: true,
        },
        { label: "Social Alerts", value: "156", icon: Activity },
        { label: "Websites", value: "18", icon: Building2 },
        { label: "Ad Campaigns", value: "42", icon: Target },
      ],
      topGames: [
        { name: "Social Media", players: "2.4K alerts", percentage: 45 },
        { name: "Website Traffic", players: "1.8K views", percentage: 35 },
        { name: "Ad Performance", players: "1.2K imp", percentage: 20 },
      ],
      quickStats: [
        { label: "Insights", value: "320", change: "+45%" },
        { label: "Reports", value: "48", change: "+12%" },
        { label: "Benchmarks", value: "86", change: "+28%" },
      ],
    },
  },
];

const initialOverallStats = [
  {
    title: "Total Revenue",
    value: "$201.2K",
    change: "+14.8%",
    trend: "up",
    icon: DollarSign,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Total Users",
    value: "30,200",
    change: "+11.2%",
    trend: "up",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Active Projects",
    value: "4",
    change: "+0",
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

import { useAuthStore } from "@/store/auth-store";

// Helper to format numbers (e.g., 12500 -> 12.5K)
const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

const formatCurrency = (num: number) => {
  if (num >= 1000000) return "$" + (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return "$" + (num / 1000).toFixed(1) + "K";
  return "$" + num.toLocaleString();
};

const parseCurrency = (str: string) => {
  const multiplier = str.includes("M") ? 1000000 : str.includes("K") ? 1000 : 1;
  const num = parseFloat(str.replace(/[^0-9.]/g, ""));
  return num * multiplier;
};

const parseNumber = (str: string) => {
  const multiplier = str.includes("M") ? 1000000 : str.includes("K") ? 1000 : 1;
  const num = parseFloat(str.replace(/[^0-9.]/g, ""));
  return num * multiplier;
};

export const OverallDashboard = () => {
  const { user } = useAuthStore();
  const role = user?.role || "organizer";

  const [projectData, setProjectData] = useState(projects);
  const [statsData, setStatsData] = useState(initialOverallStats);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        let ysnData: any = {};
        let blData: any = {};
        let dkpData: any = {};

        // --- Fetch YSN Data ---
        if (role === "admin") {
          const [countRes, revenueTrendRes, usersAcqRes] = await Promise.all([
            getYSNAdminCount(),
            getYSNAdminTotalRevenueTrends(),
            getYSNAdminNewUserAcquisition(),
          ]);

          const count = countRes.data;
          const revenueTrend = revenueTrendRes.data;

          const totalUsers =
            count.find((c: any) => c.label.toLowerCase().includes("users"))
              ?.count || 0;
          const totalRevenue = revenueTrend.platform_total.year.reduce(
            (acc: number, curr: any) => acc + curr.value,
            0,
          ); // Approx sum

          ysnData = {
            users: formatNumber(Number(totalUsers)),
            revenue: formatCurrency(totalRevenue),
            // We can add more specific mappings here for stats.primaryMetrics
            primaryMetrics: [
              {
                label: "Total Users",
                value: formatNumber(Number(totalUsers)),
                icon: Users,
                highlight: true,
              },
            ],
          };
        } else {
          // Organizer
          const [countRes, revenueRes, usersRes] = await Promise.all([
            getYSNOrganizerCount(),
            getYSNOrganizerTotalRevenue(),
            getYSNOrganizerNewUserGrowth(),
          ]);

          const count = countRes.data;
          const revenue = revenueRes.data;

          const totalUsers =
            count.find(
              (c: any) =>
                c.label.toLowerCase().includes("users") ||
                c.label.toLowerCase().includes("players"),
            )?.count || 0;
          const totalRevenue = revenue.growth_count || 0;

          ysnData = {
            users: formatNumber(Number(totalUsers)),
            revenue: formatCurrency(totalRevenue),
          };
        }

        // --- Fetch Destination KP Data ---
        try {
          const [dkpCountRes, dkpRevenueRes, dkpJobsRes, dkpEventsRes] =
            await Promise.all([
              getDKPCount(),
              getDKPRevenue(),
              getActiveJobs(),
              getUpcomingEvents(),
            ]);

          const dkpRevenue = dkpRevenueRes.data;
          const dkpUsers = dkpCountRes.data.reduce(
            (acc: number, curr: any) => acc + curr.count,
            0,
          );

          const activeJobsCount = dkpJobsRes.data.length;
          const upcomingEventsCount = dkpEventsRes.data.length;

          const revenueChartData = dkpRevenue.data.map((d: any) => d.value);

          dkpData = {
            users: formatNumber(dkpUsers),
            revenue: formatCurrency(dkpRevenue.total_amt),
            revenueGrowth:
              dkpRevenue.growth_percentage > 0
                ? `+${dkpRevenue.growth_percentage}%`
                : `${dkpRevenue.growth_percentage}%`,
            data:
              revenueChartData.length > 0
                ? revenueChartData
                : [0, 0, 0, 0, 0, 0, 0],
            stats: {
              primaryMetrics: [
                {
                  label: "Active Jobs",
                  value: activeJobsCount.toString(),
                  icon: Briefcase,
                  highlight: true,
                },
                {
                  label: "Upcoming Events",
                  value: upcomingEventsCount.toString(),
                  icon: Calendar,
                },
                { label: "Destinations", value: "24", icon: MapPin },
                { label: "Contact Requests", value: "45", icon: Users },
              ],
              topGames: [
                {
                  name: "Tourism Packages",
                  players: `${dkpRevenue.tourism}%`,
                  percentage: dkpRevenue.tourism,
                },
                {
                  name: "Event Bookings",
                  players: `${dkpRevenue.events}%`,
                  percentage: dkpRevenue.events,
                },
                {
                  name: "Facility Rentals",
                  players: `${dkpRevenue.facilities}%`,
                  percentage: dkpRevenue.facilities,
                },
              ],
            },
          };
        } catch (dkpError) {
          console.error("Failed to fetch DKP data", dkpError);
        }

        if (role === "admin") {
          const [countRes, growthRes, overviewRes, recentTournamentsRes, twitchRes] =
            await Promise.all([
              getAdminCount(),
              getUserGrowth(),
              getTournamentOverview(),
              getRecentTournaments(),
              getLiveTwitchStreams(),
            ]);

          const count = countRes.data;
          const overview = overviewRes.data;
          const growth = growthRes.data;
          const recentTournaments = recentTournamentsRes.data;
          const streams = twitchRes.data;

          const totalUsers =
            count.find((c: any) => c.label.toLowerCase().includes("total users"))
              ?.count || 0;
          
          const activeUsers = 
            count.find((c: any) => c.label.toLowerCase().includes("active users"))
              ?.count || 0;

          // Use API provided Revenue (e.g. "201.2K")
          const revenueStr = count.find((c: any) => c.label.toLowerCase().includes("revenue"))?.count || "$0";
          const revenueGrowthVal = count.find((c: any) => c.label.toLowerCase().includes("revenue"))?.badge_count || 0;
          
          // Calculate Total Viewers from Twitch
          const totalViewers = streams.reduce((acc: number, curr: any) => acc + curr.count, 0);

          // New Users Today
          const newUsersToday = growth.day.reduce(
            (acc: number, curr: any) => acc + curr.total,
            0,
          );

          const chartData = growth.year.map((d: any) => d.total);
          
          // Map Streams for Top Section
          const topStreams = streams.slice(0, 3).map((s: any) => ({
              name: s.label,
              players: `${formatNumber(s.count)} Viewers`,
              percentage: Math.min(100, Math.round((s.count / (totalViewers || 1)) * 100))
          }));

          blData = {
            users: formatNumber(Number(totalUsers)),
            revenue: typeof revenueStr === 'number' ? formatCurrency(revenueStr) : (revenueStr.toString().startsWith('$') ? revenueStr : `$${revenueStr}`),
            revenueGrowth: `+${revenueGrowthVal}%`,
            data: chartData.length > 0 ? chartData : [0, 0, 0, 0, 0, 0, 0],
            topLabel: "Top Live Streams",
            stats: {
              primaryMetrics: [
                {
                  label: "Tournaments",
                  value: overview.total.toString(),
                  icon: Trophy,
                  highlight: true,
                },
                {
                  label: "Completed",
                  value: overview.played.toString(),
                  icon: CheckCircle,
                },
                {
                    label: "Live Viewers",
                    value: formatNumber(totalViewers),
                    icon: PlayCircle,
                },
                {
                  label: "Active Users", // Using Active Users from count API
                  value: formatNumber(Number(activeUsers)),
                  icon: Users,
                },
              ],
              topGames: topStreams.length > 0 ? topStreams : [
                   { name: "Live Events", players: "Scanning...", percentage: 0 }
              ],
              quickStats: [
                {
                  label: "Total Users",
                  value: formatNumber(Number(totalUsers)),
                  change: "Total",
                },
                {
                  label: "Tournaments",
                  value: overview.total.toString(),
                  change: "All Time",
                },
                {
                  label: "New Today",
                  value: formatNumber(newUsersToday),
                  change: "Today",
                },
              ],
            },
          };
        } else {
          // Organizer
          const [
            statsRes,
            usersRes,
            popularGamesRes,
            tournamentsRes,
            statisticsRes,
          ] = await Promise.all([
            getOrganizerStats(),
            getOrganizerUsers(),
            getPopularGames(),
            getStatusBasedTournaments(),
            getTournamentStatistics(),
          ]);

          const stats = statsRes.data;
          const users = usersRes.data;
          const popularGames = popularGamesRes.data;
          const tournaments = tournamentsRes.data;
          const statistics = statisticsRes.data; // for chart

          const totalUsers = users.totalActiveUsers.count || 0;
          const userGrowth = users.totalActiveUsers.growth;

          // Calculate Revenue from Completed & Live tournaments
          const allPaidTournaments = [
            ...tournaments.completed,
            ...tournaments.live,
          ];
          const totalRevenue = allPaidTournaments.reduce(
            (acc, curr) => acc + (curr.revenue || 0),
            0,
          );

          // Calculate Total Prizes
          // some prize_pool might be strings or numbers
          const totalPrizes = [
            ...tournaments.upcoming,
            ...tournaments.live,
            ...tournaments.completed,
          ].reduce((acc, curr) => {
            const prize =
              typeof curr.prize_pool === "string"
                ? parseFloat(curr.prize_pool.replace(/[^0-9.]/g, "") || "0")
                : curr.prize_pool || 0;
            return acc + prize;
          }, 0);

          // Map Chart Data (using monthly tournament totals as trend)
          const chartData = statistics.months.data.map((d) => d.total);

          // Map Top Games
          // popularGames.games includes { game_name, total_tournaments, percentage } - need to adapt to UI
          // UI expects: { name, players (string), percentage }
          const mappedTopGames = popularGames.games
            .slice(0, 3)
            .map((g: any) => ({
              name: g.game_name,
              players: `${g.total_tournaments} Tournaments`,
              percentage: parseFloat(g.percentage),
            }));

          blData = {
            users: formatNumber(totalUsers),
            revenue: formatCurrency(totalRevenue),
            revenueGrowth: `+${userGrowth}%`, // Using user growth as proxy or 0
            data: chartData.length > 0 ? chartData : [0, 0, 0, 0, 0, 0, 0],
            stats: {
              primaryMetrics: [
                {
                  label: "Live",
                  value: stats.live.toString(),
                  icon: PlayCircle,
                  highlight: true,
                },
                {
                  label: "Completed",
                  value: stats.completed.toString(),
                  icon: CheckCircle,
                },
                {
                  label: "Upcoming",
                  value: stats.upcomming.toString(),
                  icon: Calendar,
                },
                {
                  label: "Total Prizes",
                  value: formatCurrency(totalPrizes),
                  icon: Trophy,
                },
              ],
              topGames:
                mappedTopGames.length > 0
                  ? mappedTopGames
                  : [
                      {
                        name: "Call of Duty",
                        players: "Trending",
                        percentage: 45,
                      },
                    ],
              quickStats: [
                {
                  label: "Active Players",
                  value: formatNumber(totalUsers),
                  change: formatNumber(userGrowth) + "%",
                },
                {
                  label: "Live Events",
                  value: stats.live.toString(),
                  change: "Now",
                },
                {
                  label: "Total Created",
                  value: stats.total.toString(),
                  change: "",
                },
              ],
            },
          };
        }
        // --- Update Projects State ---
        const updatedProjects = projects.map((p) => {
          if (p.id === "ysn") {
            return {
              ...p,
              users: ysnData.users || p.users,
              revenue: ysnData.revenue || p.revenue,
              stats: {
                ...p.stats,
                primaryMetrics:
                  ysnData.primaryMetrics || p.stats.primaryMetrics,
              },
            };
          }
          if (p.id === "destination-kp") {
            return {
              ...p,
              users: dkpData.users || p.users,
              revenue: dkpData.revenue || p.revenue,
              revenueGrowth: dkpData.revenueGrowth || p.revenueGrowth,
              data: dkpData.data || p.data,
              stats: {
                ...p.stats,
                primaryMetrics:
                  dkpData.stats?.primaryMetrics || p.stats.primaryMetrics,
                topGames: dkpData.stats?.topGames || p.stats.topGames,
              },
            };
          }
          if (p.id === "battle-lounge") {
            return {
              ...p,
              users: blData.users || p.users,
              revenue: blData.revenue || p.revenue,
              revenueGrowth: blData.revenueGrowth || p.revenueGrowth,
              data: blData.data || p.data,
              topLabel: blData.topLabel || p.topLabel,
              stats: {
                ...p.stats,
                primaryMetrics:
                  blData.stats?.primaryMetrics || p.stats.primaryMetrics,
                topGames: blData.stats?.topGames || p.stats.topGames,
                quickStats: blData.stats?.quickStats || p.stats.quickStats,
              },
            };
          }
          return p;
        });

        setProjectData(updatedProjects);

        // --- Recalculate Overall Stats ---
        const totalRev = updatedProjects.reduce(
          (acc, curr) => acc + parseCurrency(curr.revenue),
          0,
        );
        const totalUsr = updatedProjects.reduce(
          (acc, curr) => acc + parseNumber(curr.users),
          0,
        );

        setStatsData((prev) =>
          prev.map((s) => {
            if (s.title === "Total Revenue")
              return { ...s, value: formatCurrency(totalRev) };
            if (s.title === "Total Users")
              return { ...s, value: formatNumber(totalUsr) };
            return s;
          }),
        );
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchDashboardData();
  }, [role]);

  // Helper to get dynamic href based on role
  const getProjectHref = (projectId: string, defaultHref: string) => {
    if (projectId === "battle-lounge" || projectId === "ysn") {
      return `${defaultHref}/${role}`;
    }
    return defaultHref;
  };

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

        {/* Top Aggregated Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-border/50 bg-background/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-border/80",
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

        {/* Projects Section - Enhanced Large Cards */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              Project Summary
            </h2>
            <p className="text-sm text-muted-foreground">
              Click on a project to view detailed analytics
            </p>
          </div>
          {/* Full-width cards for each project */}
          <div className="flex flex-col gap-6">
            {projectData.map((project, index) => (
              <EnhancedProjectCard
                key={index}
                project={{
                  ...project,
                  href: getProjectHref(project.id, project.href),
                }}
              />
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

// Enhanced Project Card Component with expanded data
const EnhancedProjectCard = ({ project }: { project: any }) => {
  const chartData = project.data.map((val: number, i: number) => ({
    name: i,
    value: val,
  }));

  return (
    <Link
      href={project.href}
      className={cn(
        "group relative rounded-[32px] text-white overflow-hidden transition-all duration-300 hover:-translate-y-1 block cursor-pointer",
        "bg-gradient-to-br shadow-xl hover:shadow-2xl",
        project.gradient,
        project.shadowColor,
        project.hoverShadow,
      )}
    >
      <div className="p-6 lg:p-8">
        {/* Top Header Row */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/15 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner">
              <project.icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/70 uppercase tracking-wider">
                {project.description}
              </p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl lg:text-3xl font-bold tracking-tight mt-1 text-white">
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

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Section - Primary Metrics */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-2 gap-3">
              {project.stats.primaryMetrics.map((metric: any, idx: number) => (
                <div
                  key={idx}
                  className={cn(
                    "rounded-2xl p-4 backdrop-blur-md border border-white/10 transition-all duration-200 hover:scale-[1.02]",
                    metric.highlight ? "bg-white/20" : "bg-white/10",
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <metric.icon className="w-4 h-4 text-white/70" />
                    <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
                      {metric.label}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-white">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Center Section - Top Games/Categories */}
          <div className="lg:col-span-4">
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/10 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-white/70" />
                <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                  {project.topLabel || "Top Categories"}
                </span>
              </div>
              <div className="space-y-3">
                {project.stats.topGames.map((game: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-sm font-medium text-white">
                        {game.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white/80 rounded-full transition-all duration-500"
                          style={{ width: `${game.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-white/90 min-w-[40px] text-right">
                        {game.players}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Chart & Quick Stats */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {/* Mini Chart */}
            <div className="flex-1 min-h-[80px] relative">
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
                    strokeWidth={2}
                    fillOpacity={1}
                    fill={`url(#gradient-${project.id})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 gap-2">
              {project.stats.quickStats.map((stat: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white/10 rounded-xl p-3 backdrop-blur-md border border-white/10"
                >
                  <span className="text-xs text-white/60 block mb-1 truncate">
                    {stat.label}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-white">
                      {stat.value}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-medium",
                        stat.change.startsWith("+")
                          ? "text-emerald-300"
                          : stat.change.startsWith("-")
                            ? "text-red-300"
                            : "text-white/60",
                      )}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6 border-t border-white/20">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Revenue
            </span>
            <span className="text-xl lg:text-2xl font-bold text-white">
              {project.revenue}
            </span>
          </div>
          <div className="flex flex-col gap-1 sm:border-l border-white/20 sm:pl-6">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Users
            </span>
            <span className="text-xl lg:text-2xl font-bold text-white">
              {project.users}
            </span>
          </div>
          <div className="flex flex-col gap-1 sm:border-l border-white/20 sm:pl-6">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Growth
            </span>
            <span className="text-xl lg:text-2xl font-bold text-white">
              {project.revenueGrowth}
            </span>
          </div>
          <div className="flex flex-col gap-1 sm:border-l border-white/20 sm:pl-6">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Status
            </span>
            <span className="text-sm font-bold text-emerald-300 flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Active
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
