"use client";

import { TrendBadge } from "../dashboard/TrendBadge";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import {
    Users,
    Activity,
    Smartphone,
    Database,
    UploadCloud,
} from "lucide-react";

const userGrowthData = [
    { name: "Mon", value: 12500 },
    { name: "Tue", value: 12800 },
    { name: "Wed", value: 13200 },
    { name: "Thu", value: 13900 },
    { name: "Fri", value: 14500 },
    { name: "Sat", value: 15200 },
    { name: "Sun", value: 15800 },
];

export const ConnectedAthleteStats = () => {
    return (
        <div className="grid gap-5 lg:gap-7.5">
            {/* First Row - Bento Grid: 2x2 Stats + Large Chart Card */}
            <div className="grid lg:grid-cols-3 gap-y-5 lg:gap-7.5 items-stretch">
                {/* Small Stats Grid - 2x2 Aggregate Stats */}
                <div className="lg:col-span-1">
                    <div className="grid grid-cols-2 gap-4 lg:gap-6 h-full items-stretch">
                        <StatCard
                            value="15.8K"
                            label="Total Athletes"
                            icon={<Users className="w-5 h-5" />}
                            change="+12%"
                            delay={0}
                        />
                        <StatCard
                            value="8.2K"
                            label="Active Today"
                            icon={<Activity className="w-5 h-5" />}
                            change="+5%"
                            highlight
                            tone="positive"
                            delay={100}
                        />
                        <StatCard
                            value="45K"
                            label="Data Points"
                            icon={<Database className="w-5 h-5" />}
                            change="+28%"
                            delay={200}
                            highlight
                        />
                        <StatCard
                            value="1.2M"
                            label="Total Syncs"
                            icon={<UploadCloud className="w-5 h-5" />}
                            change="+15%"
                            tone="positive"
                            delay={300}
                        />
                    </div>
                </div>

                {/* Main Graph Card - Purple Theme from Game Reel */}
                <div className="lg:col-span-2">
                    <div className="group h-full rounded-[32px] bg-gradient-to-br from-[#bd5bf1] via-[#9b46e3] to-[#7a33e1] text-white p-8 lg:p-10 flex flex-col justify-between shadow-xl shadow-purple-500/10 relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-purple-500/20">
                        <div className="flex flex-col gap-8 relative z-10 h-full">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/15 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner">
                                        <Users className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white/70 uppercase tracking-wider">
                                            User Growth
                                        </p>
                                        <h3 className="text-4xl lg:text-5xl font-bold tracking-tight mt-1 text-white">
                                            15.8K
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <TrendBadge
                                        change="+12%"
                                        tone="positive"
                                        className=" text-white border-white/10 backdrop-blur-md px-3 py-1"
                                    />
                                    <p className="text-xs">vs last week</p>
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="flex-1 w-full min-h-[140px] -ml-2 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={userGrowthData}>
                                        <defs>
                                            <linearGradient
                                                id="colorUserGrowth"
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
                                                color: "#7a33e1", // Game Reel Purple
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
                                            fill="url(#colorUserGrowth)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                                        Retention
                                    </span>
                                    <span className="text-xl font-bold text-white">85%</span>
                                </div>
                                <div className="flex flex-col gap-1 border-l border-white/10 pl-6">
                                    <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                                        Avg Session
                                    </span>
                                    <span className="text-xl font-bold text-white">42m</span>
                                </div>
                                <div className="flex flex-col gap-1 border-l border-white/10 pl-6">
                                    <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                                        Engagement
                                    </span>
                                    <span className="text-xl font-bold text-white">High</span>
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
                ? "bg-gradient-to-br from-[#bd5bf1] to-[#7a33e1] text-white border-transparent shadow-lg shadow-purple-500/25"
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
