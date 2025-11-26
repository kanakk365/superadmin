"use client";

import { useEffect, useState } from "react";
import type { TooltipProps } from "recharts";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { totalSalesBreakdown } from "./constants";

export const TotalSalesDonut = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const total = totalSalesBreakdown.reduce((sum, item) => sum + item.value, 0);
  const highlightIndex = 0;

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const renderTooltipContent = ({ payload }: TooltipProps<number, string>) => {
    if (!payload || payload.length === 0) {
      return null;
    }

    const rawValue = payload[0]?.value;
    const value = typeof rawValue === "number" ? rawValue : Number(rawValue ?? 0);
    const percent = total > 0 ? (Number(value) / total) * 100 : 0;

    return (
      <div className="rounded-lg bg-foreground px-3 py-1 text-xs font-semibold text-background">
        {percent.toFixed(1)}%
      </div>
    );
  };

  return (
    <div className="rounded-3xl bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground">Total Sales</h3>

      <div className=" flex flex-col items-center w-64 mx-auto">
        <div className="relative h-52 w-52">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={totalSalesBreakdown}
                dataKey="value"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={4}
                cornerRadius={20}
                strokeWidth={0}
              >
                {totalSalesBreakdown.map((entry, index) => (
                  <Cell
                    key={entry.label}
                    fill={isDarkMode ? entry.darkColor : entry.color}
                    opacity={index === highlightIndex ? 1 : 0.85}
                  />
                ))}
              </Pie>
              <Tooltip
                content={renderTooltipContent}
                cursor={{ fill: "transparent" }}
                wrapperStyle={{ outline: "none" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="w-full space-y-3 text-sm">
          {totalSalesBreakdown.map((entry) => (
            <li key={entry.label} className="flex items-center justify-between text-foreground">
              <span className="flex items-center gap-4">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: isDarkMode ? entry.darkColor : entry.color }}
                />
                {entry.label}
              </span>
              <span className="font-semibold">${entry.value.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

