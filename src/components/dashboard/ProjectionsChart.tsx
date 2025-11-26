"use client";

import { Bar, BarChart as ReBarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { projections } from "./constants";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useTheme } from "@/components/providers/theme-provider";

export const ProjectionsChart = () => {
  const { theme } = useTheme();

  const colors = {
    gridStroke: theme === "dark" ? "#2a2a2a" : "#E3E8EE",
    tickColor: theme === "dark" ? "#9ca3af" : "#CBD5E1",
    axisTickColor: theme === "dark" ? "#9ca3af" : "#94A3B8",
    tooltipCursor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(148, 163, 184, 0.15)",
    actual: theme === "dark" ? "#60a5fa" : "#9DB9D5",
    projected: theme === "dark" ? "#a8c5da" : "#CEDCEB",
  };

  return (
    <div className="rounded-[24px] bg-card px-5 py-5">
      <div className="mb-5">
        <p className="text-base font-semibold text-foreground">Projections vs Actuals</p>
      </div>
      <ChartContainer
        config={{
          actual: {
            label: "Actual",
            theme: {
              light: "#9DB9D5",
              dark: "#a8c5da",
            },
          },
          projectedDelta: {
            label: "Projected",
            theme: {
              light: "#CEDCEB",
              dark: "#687681",
            },
          },
        }}
        className="w-full h-60"
      >
        <ReBarChart
          data={projections.map((item) => ({
            month: item.month,
            actual: item.actual,
            projectedDelta: item.projectedDelta,
            projected: item.actual + item.projectedDelta,
          }))}
          stackOffset="none"
        >
          <CartesianGrid vertical={false} stroke={colors.gridStroke} />
          <YAxis
            domain={[0, 30]}
            ticks={[0, 10, 20, 30]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: colors.tickColor, fontSize: 12 }}
            width={32}
            tickFormatter={(value) => `${value}M`}
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
            tick={{ fill: colors.axisTickColor, fontSize: 12 }}
          />
          <ChartTooltip
            cursor={{ fill: colors.tooltipCursor }}
            content={<ChartTooltipContent hideLabel formatter={(value) => [`${value}M`]} />}
          />
          <Bar
            dataKey="actual"
            stackId="projection"
            fill="var(--color-actual)"
            radius={[0, 0, 0, 0]}
            barSize={32}
          />
          <Bar
            dataKey="projectedDelta"
            stackId="projection"
            fill="var(--color-projectedDelta)"
            radius={[6, 6, 0, 0]}
            barSize={32}
          />
        </ReBarChart>
      </ChartContainer>
    </div>
  );
};
