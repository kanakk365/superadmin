"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { UserPlus } from "lucide-react";
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
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const dailyData = [
    { label: "Mon", newUsers: 45 },
    { label: "Tue", newUsers: 62 },
    { label: "Wed", newUsers: 38 },
    { label: "Thu", newUsers: 71 },
    { label: "Fri", newUsers: 89 },
    { label: "Sat", newUsers: 124 },
    { label: "Sun", newUsers: 98 },
];

const weeklyData = [
    { label: "Week 1", newUsers: 320 },
    { label: "Week 2", newUsers: 485 },
    { label: "Week 3", newUsers: 412 },
    { label: "Week 4", newUsers: 567 },
];

const monthlyData = [
    { label: "Jan", newUsers: 1200 },
    { label: "Feb", newUsers: 980 },
    { label: "Mar", newUsers: 1450 },
    { label: "Apr", newUsers: 1680 },
    { label: "May", newUsers: 1320 },
    { label: "Jun", newUsers: 1890 },
    { label: "Jul", newUsers: 2100 },
    { label: "Aug", newUsers: 1950 },
    { label: "Sep", newUsers: 2340 },
    { label: "Oct", newUsers: 2180 },
    { label: "Nov", newUsers: 2560 },
    { label: "Dec", newUsers: 2890 },
];

const yearlyData = [
    { label: "2021", newUsers: 8500 },
    { label: "2022", newUsers: 12400 },
    { label: "2023", newUsers: 18900 },
    { label: "2024", newUsers: 24500 },
    { label: "2025", newUsers: 31200 },
];

const chartConfig = {
    newUsers: {
        label: "New Users",
        theme: {
            light: "#bd5bf1",
            dark: "#bd5bf1",
        },
    },
} satisfies ChartConfig;

type TimeRange = "day" | "week" | "month" | "year";

export function NewUsersChart() {
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

    const getTotalNewUsers = () => {
        const data = getChartData();
        return data.reduce((acc, curr) => acc + curr.newUsers, 0);
    };

    const timeRangeOptions: { value: TimeRange; label: string }[] = [
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
        { value: "year", label: "Year" },
    ];

    return (
        <Card className="rounded-[32px] border-border/40 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b py-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-2xl">
                        <UserPlus className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">New Users</CardTitle>
                        <CardDescription>
                            Total: <span className="font-bold text-foreground">{getTotalNewUsers().toLocaleString()}</span>
                        </CardDescription>
                    </div>
                </div>
                <div className="flex gap-1 bg-muted/50 p-1 rounded-xl">
                    {timeRangeOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setTimeRange(option.value)}
                            className={cn(
                                "px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
                                timeRange === option.value
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                            )}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="px-4 pt-6 pb-0">
                <ChartContainer config={chartConfig} className="h-[370px] w-full">
                    <BarChart data={getChartData()} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="fillNewUsers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#bd5bf1" stopOpacity={0.9} />
                                <stop offset="95%" stopColor="#7a33e1" stopOpacity={0.9} />
                            </linearGradient>
                        </defs>
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
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar
                            dataKey="newUsers"
                            fill="url(#fillNewUsers)"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
