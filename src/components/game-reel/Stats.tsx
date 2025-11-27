import { TrendBadge } from "../dashboard/TrendBadge";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Total Users",
    value: "12.5K",
    change: "+15%",
    tone: "positive" as const,
    accentClass: "bg-gradient-to-br from-primary via-primary to-[#e2e2f5]",
    textClass: "text-white",
    badgeClass: "text-white",
  },
  {
    label: "Active Users",
    value: "8,240",
    change: "+8%",
    tone: "positive" as const,
    accentClass: "bg-card",
    textClass: "text-foreground",
    badgeClass: "text-[#1C1C1C] dark:text-white",
  },
  {
    label: "Total Posts",
    value: "45.1K",
    change: "+22%",
    tone: "positive" as const,
    accentClass: "bg-card",
    textClass: "text-foreground",
    badgeClass: "text-[#1C1C1C] dark:text-white",
  },
  {
    label: "Total Reach",
    value: "1.2M",
    change: "+45%",
    tone: "positive" as const,
    accentClass: "bg-gradient-to-br from-primary via-primary to-[#e2e2f5]",
    textClass: "text-white",
    badgeClass: "text-white",
  },
];

export const GameReelStats = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`flex flex-col gap-5 rounded-[24px] px-6 py-6 ${stat.accentClass}`}
        >
          <p className={cn("text-xl font-medium", stat.textClass)}>
            {stat.label}
          </p>
          <div
            className={cn(
              "flex items-baseline justify-between gap-2",
              stat.textClass
            )}
          >
            <span className="text-4xl font-semibold tracking-tight">
              {stat.value}
            </span>
            <TrendBadge
              change={stat.change}
              tone={stat.tone}
              className={stat.badgeClass}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
