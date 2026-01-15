"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { TrendBadge } from "../dashboard/TrendBadge";
import {
    Megaphone,
    Building2,
    DollarSign,
    TrendingUp,
    Eye,
    MousePointer,
    ArrowUpRight,
} from "lucide-react";

const revenueData = [
    { month: "Jan", revenue: 2400 },
    { month: "Feb", revenue: 1398 },
    { month: "Mar", revenue: 3800 },
    { month: "Apr", revenue: 3908 },
    { month: "May", revenue: 4800 },
    { month: "Jun", revenue: 3800 },
    { month: "Jul", revenue: 4300 },
    { month: "Aug", revenue: 5100 },
    { month: "Sep", revenue: 4900 },
    { month: "Oct", revenue: 6200 },
    { month: "Nov", revenue: 5800 },
    { month: "Dec", revenue: 7200 },
];

const topAdvertisers = [
    { name: "Red Bull Gaming", spend: "$45,000", impressions: "2.3M", ctr: "3.2%" },
    { name: "NVIDIA", spend: "$38,500", impressions: "1.9M", ctr: "2.8%" },
    { name: "Logitech", spend: "$32,000", impressions: "1.6M", ctr: "3.5%" },
    { name: "Razer", spend: "$28,500", impressions: "1.4M", ctr: "2.9%" },
    { name: "SteelSeries", spend: "$22,000", impressions: "1.1M", ctr: "3.1%" },
];

export function AdvertiserStats() {
    const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.revenue, 0);

    return (
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Revenue Card */}
            <div className="lg:col-span-2">
                <div className="group h-full rounded-[32px] bg-gradient-to-br from-indigo-500 via-purple-600 to-fuchsia-600 text-white p-8 lg:p-10 flex flex-col justify-between shadow-xl shadow-purple-500/10 relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-purple-500/20">
                    <div className="flex flex-col gap-6 relative z-10">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/15 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner">
                                    <Megaphone className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white/70 uppercase tracking-wider">
                                        Advertiser Revenue
                                    </p>
                                    <h3 className="text-4xl lg:text-5xl font-bold tracking-tight mt-1 text-white">
                                        ${(totalRevenue / 1000).toFixed(1)}K
                                    </h3>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <TrendBadge
                                    change="+24%"
                                    tone="positive"
                                    className="text-white border-white/10 backdrop-blur-md px-3 py-1"
                                />
                                <p className="text-xs text-white/60">vs last month</p>
                            </div>
                        </div>

                        {/* Revenue Chart */}
                        <div className="w-full h-[180px] -ml-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="colorAdRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#fff" stopOpacity={0.35} />
                                            <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                                            borderRadius: "16px",
                                            border: "none",
                                            color: "#7c3aed",
                                            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
                                        }}
                                        itemStyle={{ color: "#7c3aed", fontWeight: 600 }}
                                        formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#fff"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorAdRevenue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Bottom Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                                    Display Ads
                                </span>
                                <span className="text-xl font-bold text-white">$42.5K</span>
                            </div>
                            <div className="flex flex-col gap-1 border-l border-white/10 pl-6">
                                <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                                    Sponsorships
                                </span>
                                <span className="text-xl font-bold text-white">$18.2K</span>
                            </div>
                            <div className="flex flex-col gap-1 border-l border-white/10 pl-6">
                                <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                                    Partnerships
                                </span>
                                <span className="text-xl font-bold text-white">$11.5K</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[80px] pointer-events-none mix-blend-overlay"></div>
                    <div className="absolute -left-20 bottom-0 w-60 h-60 bg-indigo-900/20 rounded-full blur-[60px] pointer-events-none mix-blend-multiply"></div>
                </div>
            </div>

            {/* Advertisers Summary Card */}
            <div className="lg:col-span-1">
                <div className="group rounded-[32px] bg-card border border-border/40 p-6 h-full shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-500/10 rounded-2xl group-hover:bg-purple-500/20 transition-colors">
                                <Building2 className="w-6 h-6 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">Advertisers</h3>
                        </div>
                        <button className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground">
                            <ArrowUpRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-6">
                        {/* Total Advertisers */}
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                Total Advertisers
                            </span>
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-bold text-foreground tracking-tight">
                                    48
                                </span>
                                <TrendBadge change="+12%" tone="positive" />
                            </div>
                        </div>

                        <div className="h-px w-full bg-gradient-to-r from-border via-border/50 to-transparent"></div>

                        {/* Quick Stats */}
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-purple-500/10">
                                        <TrendingUp className="w-4 h-4 text-purple-500" />
                                    </div>
                                    <span className="text-sm font-medium text-muted-foreground">Active Campaigns</span>
                                </div>
                                <span className="text-sm font-bold text-foreground">127</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-500/10">
                                        <Eye className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <span className="text-sm font-medium text-muted-foreground">Total Impressions</span>
                                </div>
                                <span className="text-sm font-bold text-foreground">8.3M</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-fuchsia-500/10">
                                        <MousePointer className="w-4 h-4 text-fuchsia-500" />
                                    </div>
                                    <span className="text-sm font-medium text-muted-foreground">Avg CTR</span>
                                </div>
                                <span className="text-sm font-bold text-foreground">3.1%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
