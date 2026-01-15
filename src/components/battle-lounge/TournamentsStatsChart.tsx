"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Trophy, Plus, Play, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const dailyData = [
    { label: "Mon", created: 3, played: 2, cancelled: 0 },
    { label: "Tue", created: 5, played: 4, cancelled: 1 },
    { label: "Wed", created: 2, played: 3, cancelled: 0 },
    { label: "Thu", created: 6, played: 5, cancelled: 0 },
    { label: "Fri", created: 8, played: 6, cancelled: 1 },
    { label: "Sat", created: 12, played: 10, cancelled: 2 },
    { label: "Sun", created: 9, played: 8, cancelled: 1 },
];

const weeklyData = [
    { label: "Week 1", created: 28, played: 24, cancelled: 3 },
    { label: "Week 2", created: 35, played: 31, cancelled: 2 },
    { label: "Week 3", created: 42, played: 38, cancelled: 4 },
    { label: "Week 4", created: 38, played: 35, cancelled: 2 },
];

const monthlyData = [
    { label: "Jan", created: 120, played: 105, cancelled: 8 },
    { label: "Feb", created: 98, played: 89, cancelled: 5 },
    { label: "Mar", created: 145, played: 132, cancelled: 10 },
    { label: "Apr", created: 168, played: 155, cancelled: 7 },
    { label: "May", created: 132, played: 120, cancelled: 9 },
    { label: "Jun", created: 189, played: 175, cancelled: 12 },
    { label: "Jul", created: 210, played: 195, cancelled: 8 },
    { label: "Aug", created: 195, played: 182, cancelled: 11 },
    { label: "Sep", created: 234, played: 218, cancelled: 14 },
    { label: "Oct", created: 218, played: 205, cancelled: 9 },
    { label: "Nov", created: 256, played: 240, cancelled: 13 },
    { label: "Dec", created: 289, played: 270, cancelled: 15 },
];

const yearlyData = [
    { label: "2021", created: 850, played: 780, cancelled: 52 },
    { label: "2022", created: 1240, played: 1150, cancelled: 68 },
    { label: "2023", created: 1890, played: 1750, cancelled: 95 },
    { label: "2024", created: 2450, played: 2280, cancelled: 120 },
    { label: "2025", created: 3120, played: 2900, cancelled: 145 },
];

const chartConfig = {
    created: {
        label: "Created",
        theme: {
            light: "#bd5bf1",
            dark: "#bd5bf1",
        },
    },
    played: {
        label: "Played",
        theme: {
            light: "#3b82f6",
            dark: "#3b82f6",
        },
    },
    cancelled: {
        label: "Cancelled",
        theme: {
            light: "#f59e0b",
            dark: "#f59e0b",
        },
    },
} satisfies ChartConfig;

type TimeRange = "day" | "week" | "month" | "year";

export function TournamentsStatsChart() {
    const [timeRange, setTimeRange] = React.useState<TimeRange>("month");

    const getChartData = () => {
        switch (timeRange) {
            case "day":
                return dailyData;
            case "week":
                return weeklyData;
            case "month":
                return monthlyData;
            case "year":
                return yearlyData;
            default:
                return monthlyData;
        }
    };

    const getTotals = () => {
        const data = getChartData();
        return {
            created: data.reduce((acc, curr) => acc + curr.created, 0),
            played: data.reduce((acc, curr) => acc + curr.played, 0),
            cancelled: data.reduce((acc, curr) => acc + curr.cancelled, 0),
        };
    };

    const totals = getTotals();

    const timeRangeOptions: { value: TimeRange; label: string }[] = [
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
        { value: "year", label: "Year" },
    ];

    return (
        <Card className="rounded-[32px] border-border/40 shadow-sm">
            <CardHeader className="flex flex-col gap-4 border-b py-6">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-2xl">
                            <Trophy className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Tournament Statistics</CardTitle>
                            <CardDescription>Created, Played & Cancelled tournaments</CardDescription>
                        </div>
                    </div>
                    <div className="ml-auto">
                        <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
                            <SelectTrigger className="w-[110px] h-8 bg-muted/50 border-0 focus:ring-0">
                                <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                                {timeRangeOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Summary Stats */}
                {/* Summary Stats */}
                <div className="flex gap-4">
                    <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-secondary/10 border border-border/20 min-w-[140px]">
                        <div className="p-2 rounded-xl bg-purple-500/20">
                            <Plus className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Created</p>
                            <p className="text-xl font-bold text-foreground tabular-nums">{totals.created.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-secondary/10 border border-border/20 min-w-[140px]">
                        <div className="p-2 rounded-xl bg-blue-500/20">
                            <Play className="w-5 h-5 text-blue-500 fill-blue-500/20" />
                        </div>
                        <div>
                            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Played</p>
                            <p className="text-xl font-bold text-foreground tabular-nums">{totals.played.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-secondary/10 border border-border/20 min-w-[140px]">
                        <div className="p-2 rounded-xl bg-amber-500/20">
                            <XCircle className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Cancelled</p>
                            <p className="text-xl font-bold text-foreground tabular-nums">{totals.cancelled.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-4 pt-6 pb-4">
                <ChartContainer config={chartConfig} className="h-[280px] w-full">
                    <BarChart data={getChartData()} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            fontSize={12}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            fontSize={12}
                        />
                        <ChartTooltip
                            cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                            content={<ChartTooltipContent />}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="created" fill="var(--color-created)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="played" fill="var(--color-played)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="cancelled" fill="var(--color-cancelled)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
