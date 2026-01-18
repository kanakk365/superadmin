"use client";

import { useState } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const dataMap = {
    day: [
        { name: "00:00", value: 12 },
        { name: "04:00", value: 18 },
        { name: "08:00", value: 45 },
        { name: "12:00", value: 89 },
        { name: "16:00", value: 72 },
        { name: "20:00", value: 95 },
        { name: "23:59", value: 40 },
    ],
    week: [
        { name: "Mon", value: 120 },
        { name: "Tue", value: 150 },
        { name: "Wed", value: 180 },
        { name: "Thu", value: 220 },
        { name: "Fri", value: 250 },
        { name: "Sat", value: 300 },
        { name: "Sun", value: 280 },
    ],
    month: [
        { name: "Week 1", value: 500 },
        { name: "Week 2", value: 650 },
        { name: "Week 3", value: 800 },
        { name: "Week 4", value: 950 },
    ],
    year: [
        { name: "Jan", value: 2000 },
        { name: "Feb", value: 2500 },
        { name: "Mar", value: 3000 },
        { name: "Apr", value: 2800 },
        { name: "May", value: 3200 },
        { name: "Jun", value: 4000 },
        { name: "Jul", value: 4500 },
        { name: "Aug", value: 5000 },
        { name: "Sep", value: 5500 },
        { name: "Oct", value: 6000 },
        { name: "Nov", value: 6500 },
        { name: "Dec", value: 7000 },
    ],
};

export const NewUsersChart = () => {
    const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">("month");

    return (
        <div className="rounded-[32px] bg-card border border-border/40 p-6 lg:p-8 h-full flex flex-col shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                        New Users Growth
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Total new user registrations over time
                    </p>
                </div>
                <Select
                    value={timeRange}
                    onValueChange={(val: any) => setTimeRange(val)}
                >
                    <SelectTrigger className="w-[120px] bg-background">
                        <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="week">Week</SelectItem>
                        <SelectItem value="month">Month</SelectItem>
                        <SelectItem value="year">Year</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex-1 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={dataMap[timeRange]}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="hsl(var(--custom-border))"
                            opacity={0.4}
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#9CA3AF", fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#9CA3AF", fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--popover))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: "12px",
                                color: "hsl(var(--popover-foreground))",
                            }}
                            cursor={{ stroke: "hsl(var(--muted))", opacity: 0.4 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorUsers)"
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
