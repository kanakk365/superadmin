"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

const data = [
    { name: "18-24", users: 120, coaches: 45 },
    { name: "25-34", users: 180, coaches: 90 },
    { name: "35-44", users: 150, coaches: 120 },
    { name: "45-54", users: 80, coaches: 60 },
    { name: "55+", users: 40, coaches: 30 },
];

export const UserCoachAgeChart = () => {
    return (
        <div className="rounded-3xl bg-card p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">
                        User / Coach Ratio
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Distribution across age groups
                    </p>
                </div>
            </div>

            <div className="flex-1 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        barGap={8}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="var(--border)"
                            opacity={0.4}
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: "var(--muted)", opacity: 0.2 }}
                            contentStyle={{
                                backgroundColor: "var(--popover)",
                                borderColor: "var(--border)",
                                borderRadius: "12px",
                                color: "var(--popover-foreground)",
                            }}
                        />
                        <Legend
                            wrapperStyle={{ paddingTop: "20px" }}
                            iconType="circle"
                            formatter={(value) => (
                                <span className="text-sm font-medium text-foreground ml-1">
                                    {value.charAt(0).toUpperCase() + value.slice(1)}
                                </span>
                            )}
                        />
                        <Bar
                            dataKey="users"
                            name="Users"
                            fill="#a855f7"
                            radius={[4, 4, 4, 4]}
                            barSize={24}
                            animationDuration={1500}
                        />
                        <Bar
                            dataKey="coaches"
                            name="Coaches"
                            fill="#f472b6"
                            radius={[4, 4, 4, 4]}
                            barSize={24}
                            animationDuration={1500}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
