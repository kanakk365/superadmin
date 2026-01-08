"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/main/DashboardLayout";
import { GoogleConnectButton } from "@/components/dashboard/GoogleConnectButton";
import { SocialConnectCTA } from "@/components/dashboard/SocialConnectCTA";
import { cn } from "@/lib/utils";
import {
    Users,
    Eye,
    Clock,
    PlayCircle,
    TrendingUp,
    Video,
    Loader2,
    AlertCircle,
    ThumbsUp,
    MessageCircle,
} from "lucide-react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";

interface YouTubeData {
    connected: boolean;
    data?: {
        channel: {
            id: string;
            title: string;
            description: string;
            thumbnail: string;
            subscriberCount: number;
            videoCount: number;
            viewCount: number;
        };
        analytics: {
            views: number;
            watchTimeMinutes: number;
            subscribersGained: number;
            subscribersLost: number;
            averageViewDuration: number;
        };
        dailyData: Array<{
            date: string;
            views: number;
            watchTimeMinutes: number;
        }>;
        recentVideos: Array<{
            id: string;
            title: string;
            thumbnail: string;
            views: number;
            likes: number;
            comments: number;
            publishedAt: string;
        }>;
    };
    error?: string;
}

export default function YouTubeDataPage() {
    const searchParams = useSearchParams();
    const [youtubeData, setYoutubeData] = useState<YouTubeData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [connectionMessage, setConnectionMessage] = useState<string | null>(null);

    useEffect(() => {
        // Check for connection status from URL params
        if (searchParams.get("connected") === "true") {
            setConnectionMessage("Successfully connected to Google!");
            window.history.replaceState({}, "", "/youtube-data");
        } else if (searchParams.get("error")) {
            setConnectionMessage(`Connection failed: ${searchParams.get("error")}`);
        }

        fetchYouTubeData();
    }, [searchParams]);

    const fetchYouTubeData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/youtube");
            const data = await response.json();
            setYoutubeData(data);
        } catch (error) {
            console.error("Failed to fetch YouTube data:", error);
            setYoutubeData({ connected: false, error: "Failed to fetch data" });
        } finally {
            setIsLoading(false);
        }
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    const formatWatchTime = (minutes: number) => {
        if (minutes >= 60) {
            const hours = Math.floor(minutes / 60);
            return `${hours}h`;
        }
        return `${minutes}m`;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    return (
        <DashboardLayout pageLabel="YouTube Data">
            <ScrollArea className="h-full w-full">
                <div className="flex flex-col gap-5 lg:gap-7.5 p-4 md:p-6 lg:p-8 animate-in fade-in duration-500">
                    {/* Connection Status Message */}
                    {connectionMessage && (
                        <div
                            className={cn(
                                "p-4 rounded-2xl flex items-center gap-3",
                                connectionMessage.includes("Success")
                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
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
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">
                                YouTube Analytics
                            </h1>
                            <p className="text-muted-foreground">
                                View your channel performance and video analytics
                            </p>
                        </div>
                        <GoogleConnectButton />
                    </div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-red-500" />
                        </div>
                    )}

                    {/* Not Connected State */}
                    {!isLoading && !youtubeData?.connected && (
                        <SocialConnectCTA
                            platform="youtube"
                            onConnect={() => {
                                window.location.href = "/api/auth/google";
                            }}
                        />
                    )}

                    {/* Error State */}
                    {!isLoading && youtubeData?.connected && youtubeData?.error && (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <AlertCircle className="w-12 h-12 text-amber-500" />
                            <p className="text-center text-muted-foreground max-w-md">
                                {youtubeData.error}
                            </p>
                            <button
                                onClick={fetchYouTubeData}
                                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {/* Connected with Data */}
                    {!isLoading && youtubeData?.connected && youtubeData?.data && (
                        <>
                            {/* Channel Info Card */}
                            <div className="rounded-[32px] bg-gradient-to-br from-red-500 via-red-600 to-rose-600 text-white p-6 lg:p-8 shadow-xl shadow-red-500/10 relative overflow-hidden">
                                <div className="flex items-center gap-6 relative z-10">
                                    {youtubeData.data.channel.thumbnail && (
                                        <img
                                            src={youtubeData.data.channel.thumbnail}
                                            alt={youtubeData.data.channel.title}
                                            className="w-20 h-20 rounded-full border-4 border-white/20"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <h2 className="text-2xl lg:text-3xl font-bold">
                                            {youtubeData.data.channel.title}
                                        </h2>
                                        <p className="text-white/70 text-sm mt-1 line-clamp-2">
                                            {youtubeData.data.channel.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
                            </div>

                            {/* Overview Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                                <StatCard
                                    value={formatNumber(youtubeData.data.channel.subscriberCount)}
                                    label="Subscribers"
                                    icon={<Users className="w-5 h-5" />}
                                    color="red"
                                    change={`+${youtubeData.data.analytics.subscribersGained - youtubeData.data.analytics.subscribersLost}`}
                                />
                                <StatCard
                                    value={formatNumber(youtubeData.data.channel.viewCount)}
                                    label="Total Views"
                                    icon={<Eye className="w-5 h-5" />}
                                    color="purple"
                                />
                                <StatCard
                                    value={youtubeData.data.channel.videoCount.toString()}
                                    label="Videos"
                                    icon={<Video className="w-5 h-5" />}
                                    color="blue"
                                />
                                <StatCard
                                    value={formatWatchTime(youtubeData.data.analytics.watchTimeMinutes)}
                                    label="Watch Time (30d)"
                                    icon={<Clock className="w-5 h-5" />}
                                    color="emerald"
                                />
                            </div>

                            {/* Charts Row */}
                            <div className="grid lg:grid-cols-2 gap-5 lg:gap-7.5">
                                {/* Views Over Time */}
                                <div className="rounded-[32px] bg-card border border-border p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2.5 bg-red-500/10 rounded-xl text-red-500">
                                            <TrendingUp className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground">
                                            Views (Last 30 Days)
                                        </h3>
                                    </div>

                                    <div className="h-[250px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={youtubeData.data.dailyData}>
                                                <defs>
                                                    <linearGradient
                                                        id="colorViews"
                                                        x1="0"
                                                        y1="0"
                                                        x2="0"
                                                        y2="1"
                                                    >
                                                        <stop
                                                            offset="5%"
                                                            stopColor="#ef4444"
                                                            stopOpacity={0.3}
                                                        />
                                                        <stop
                                                            offset="95%"
                                                            stopColor="#ef4444"
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
                                                    dataKey="views"
                                                    stroke="#ef4444"
                                                    strokeWidth={2}
                                                    fillOpacity={1}
                                                    fill="url(#colorViews)"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Watch Time Chart */}
                                <div className="rounded-[32px] bg-card border border-border p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-500">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground">
                                            Watch Time (Minutes)
                                        </h3>
                                    </div>

                                    <div className="h-[250px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={youtubeData.data.dailyData}>
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
                                                <Bar
                                                    dataKey="watchTimeMinutes"
                                                    fill="#8b5cf6"
                                                    radius={[4, 4, 0, 0]}
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Videos */}
                            <div className="rounded-[32px] bg-card border border-border p-6 lg:p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 bg-red-500/10 rounded-xl text-red-500">
                                        <PlayCircle className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground">
                                        Recent Videos
                                    </h3>
                                </div>

                                <div className="grid gap-4">
                                    {youtubeData.data.recentVideos.map((video) => (
                                        <a
                                            key={video.id}
                                            href={`https://youtube.com/watch?v=${video.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex gap-4 p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors group"
                                        >
                                            <div className="relative w-40 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                                {video.thumbnail ? (
                                                    <img
                                                        src={video.thumbnail}
                                                        alt={video.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-muted flex items-center justify-center">
                                                        <Video className="w-8 h-8 text-muted-foreground" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-foreground line-clamp-2 group-hover:text-red-500 transition-colors">
                                                    {video.title}
                                                </h4>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {formatDate(video.publishedAt)}
                                                </p>
                                                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="w-4 h-4" />
                                                        {formatNumber(video.views)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <ThumbsUp className="w-4 h-4" />
                                                        {formatNumber(video.likes)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MessageCircle className="w-4 h-4" />
                                                        {formatNumber(video.comments)}
                                                    </span>
                                                </div>
                                            </div>
                                        </a>
                                    ))}

                                    {youtubeData.data.recentVideos.length === 0 && (
                                        <div className="text-center py-8 text-muted-foreground">
                                            No videos found
                                        </div>
                                    )}
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
    color = "red",
    change,
}: {
    value: string;
    label: string;
    icon: React.ReactNode;
    color?: "red" | "purple" | "blue" | "emerald";
    change?: string;
}) => {
    const colorClasses = {
        red: "bg-red-500/10 text-red-500",
        purple: "bg-purple-500/10 text-purple-500",
        blue: "bg-blue-500/10 text-blue-500",
        emerald: "bg-emerald-500/10 text-emerald-500",
    };

    return (
        <div className="group flex flex-col justify-between gap-4 h-full rounded-[28px] p-5 lg:p-6 bg-card border border-border/60 hover:border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex justify-between items-start">
                <div className={cn("p-2.5 rounded-xl", colorClasses[color])}>{icon}</div>
                {change && (
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {change}
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                    {value}
                </span>
                <span className="text-sm font-medium text-muted-foreground">{label}</span>
            </div>
        </div>
    );
};
