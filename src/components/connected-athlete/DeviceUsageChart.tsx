"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

const chartData = [
    { device: "Fitbit", users: 5400 },
    { device: "Garmin", users: 4200 },
    { device: "Apple", users: 3800 },
    { device: "Polar", users: 2100 },
    { device: "Whoop", users: 1500 },
    { device: "Oura", users: 900 },
];

const chartConfig = {
    users: {
        label: "Users",
        theme: {
            light: "#9b46e3", // Purple
            dark: "#9b46e3",
        },
    },
} satisfies ChartConfig;

export function DeviceUsageChart() {
    return (
        <Card className="rounded-[32px] h-full border-border/40 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader>
                <CardTitle>Connected Devices</CardTitle>
                <CardDescription>Most popular wearables among athletes</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full h-[300px]">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis
                            dataKey="device"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="users" fill="var(--color-users)" radius={8} barSize={40} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
