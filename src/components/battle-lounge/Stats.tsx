import { TrendBadge } from "../dashboard/TrendBadge";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Total Users",
    value: "5,400",
    change: "+8%",
    tone: "positive" as const,
    accentClass: "bg-gradient-to-br from-primary via-primary to-[#e2e2f5]",
    textClass: "text-white",
    badgeClass: "text-white",
  },
  {
    label: "Active Users",
    value: "2,100",
    change: "+12%",
    tone: "positive" as const,
    accentClass: "bg-card",
    textClass: "text-foreground",
    badgeClass: "text-[#1C1C1C] dark:text-white",
  },
  {
    label: "Total Tournaments",
    value: "45",
    change: "+3",
    tone: "positive" as const,
    accentClass: "bg-gradient-to-br from-primary via-primary to-[#e2e2f5]",
    textClass: "text-white",
    badgeClass: "text-white",
  },
  {
    label: "Total Revenue",
    value: "$12.5K",
    change: "+18%",
    tone: "positive" as const,
    accentClass: "bg-card",
    textClass: "text-foreground",
    badgeClass: "text-[#1C1C1C] dark:text-white",
  },
  {
    label: "Reach",
    value: "150K",
    change: "+25%",
    tone: "positive" as const,
    accentClass: "bg-gradient-to-br from-primary via-primary to-[#e2e2f5]",
    textClass: "text-white",
    badgeClass: "text-white",
  },
  {
    label: "Impressions",
    value: "450K",
    change: "+32%",
    tone: "positive" as const,
    accentClass: "bg-card",
    textClass: "text-foreground",
    badgeClass: "text-[#1C1C1C] dark:text-white",
  },
];

export const BattleLoungeStats = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`flex flex-col gap-5 rounded-[24px] px-6 py-6 ${stat.accentClass}`}
        >
          <p
            className={cn(
              "text-xl font-medium",
              stat.textClass || "text-foreground"
            )}
          >
            {stat.label}
          </p>
          <div
            className={cn(
              "flex items-baseline justify-between gap-2",
              stat.textClass || "text-foreground"
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
