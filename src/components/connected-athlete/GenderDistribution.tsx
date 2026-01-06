"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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

const chartData = [
    { gender: "male", count: 8500, fill: "var(--color-male)" },
    { gender: "female", count: 6200, fill: "var(--color-female)" },
    { gender: "other", count: 1100, fill: "var(--color-other)" },
];

const chartConfig = {
    count: {
        label: "Count",
    },
    male: {
        label: "Male",
        theme: {
            light: "oklch(0.546 0.245 291.338)", // Matches purple theme roughly or specifically set hex
            dark: "oklch(0.546 0.245 291.338)",
        },
    },
    female: {
        label: "Female",
        theme: {
            light: "oklch(0.627 0.265 303.9)", // Lighter purple/pink
            dark: "oklch(0.627 0.265 303.9)",
        },
    },
    other: {
        label: "Other",
        theme: {
            light: "oklch(0.70 0.10 290)", // Muted purple
            dark: "oklch(0.70 0.10 290)",
        },
    },
} satisfies ChartConfig;

export function GenderDistribution() {
    const totalUsers = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.count, 0);
    }, []);

    return (
        <Card className="flex flex-col rounded-[32px] h-full border-border/40 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="items-center pb-0">
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>Gender Distribution</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="gender"
                            innerRadius={70}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalUsers.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground text-xs"
                                                >
                                                    Athletes
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                        <ChartLegend
                            content={<ChartLegendContent />}
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
