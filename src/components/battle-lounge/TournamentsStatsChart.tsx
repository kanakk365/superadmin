"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Trophy, Plus, Play, XCircle } from "lucide-react";
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
import { TournamentStatistics } from "@/lib/api/battle-lounge/organizer";

interface TournamentsStatsChartProps {
    stats?: TournamentStatistics;
}

type TimeRange = "day" | "week" | "month" | "year";

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

export function TournamentsStatsChart({ stats }: TournamentsStatsChartProps) {
    const [timeRange, setTimeRange] = React.useState<TimeRange>("month");

    const getChartData = () => {
        if (!stats) return [];
        let data: any[] = [];
        switch (timeRange) {
            case "day":
                data = stats.days?.data || [];
                break;
            case "week":
                data = stats.weeks?.data || [];
                break;
            case "month":
                data = stats.months?.data || [];
                break;
            case "year":
                data = stats.yearTournaments?.data || [];
                break;
            default:
                data = stats.months?.data || [];
        }

        // Map API keys to Chart keys
        return data.map(item => ({
            label: item.label,
            created: item.total || 0,
            played: item.played || 0,
            cancelled: item.canceled || 0 // API has 'canceled' (1 'l')
        }));
    };

    const getTotals = () => {
        if (!stats) return { created: 0, played: 0, cancelled: 0 };
        let periodStats = stats.months;

        switch (timeRange) {
            case "day":
                periodStats = stats.days;
                break;
            case "week":
                periodStats = stats.weeks;
                break;
            case "month":
                periodStats = stats.months;
                break;
            case "year":
                periodStats = stats.yearTournaments;
                break;
        }
        
        return {
            created: periodStats?.total_created || 0,
            played: periodStats?.total_played || 0,
            cancelled: periodStats?.total_canceled || 0,
        };
    };

    const totals = getTotals();
    const chartData = getChartData();

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
                {chartData.length > 0 ? (
                    <ChartContainer config={chartConfig} className="h-[280px] w-full">
                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
                ) : (
                    <div className="h-[280px] w-full flex items-center justify-center">
                        <span className="text-muted-foreground">No data available for this period</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
