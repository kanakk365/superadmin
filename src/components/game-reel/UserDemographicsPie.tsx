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
  { visitor: "Male", visitors: 500, fill: "var(--color-male)" },
  { visitor: "Female", visitors: 300, fill: "var(--color-female)" },
  { visitor: "Others", visitors: 50, fill: "var(--color-others)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  male: {
    label: "Male",
    theme: {
      light: "oklch(0.546 0.245 291.338)", // purple-600
      dark: "oklch(0.546 0.245 291.338)",
    },
  },
  female: {
    label: "Female",
    theme: {
      light: "oklch(0.558 0.288 302.321)", // violet-500
      dark: "oklch(0.558 0.288 302.321)",
    },
  },
  others: {
    label: "Others",
    theme: {
      light: "oklch(0.714 0.203 292.243)", // purple-400
      dark: "oklch(0.714 0.203 292.243)",
    },
  },
} satisfies ChartConfig;

export function UserDemographicsPie() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>User Demographics</CardTitle>
        <CardDescription>Male vs Female vs Others</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="visitor"
              innerRadius={60}
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
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs"
                        >
                          Users
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
