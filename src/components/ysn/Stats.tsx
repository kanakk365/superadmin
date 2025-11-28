import { TrendBadge } from "../dashboard/TrendBadge";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Total Coaches",
    value: "156",
    change: "+12%",
    tone: "positive" as const,
    accentClass: "bg-gradient-to-br from-teal-700 via-teal-500 to-[#e2e2f5]",
    textClass: "text-white",
    badgeClass: "text-white",
  },
  {
    label: "Total Players",
    value: "890",
    change: "+24%",
    tone: "positive" as const,
    accentClass: "bg-card",
    textClass: "text-foreground",
    badgeClass: "text-[#1C1C1C] dark:text-white",
  },
  {
    label: "Total Orgs",
    value: "24",
    change: "+2",
    tone: "positive" as const,
    accentClass: "bg-gradient-to-br from-teal-700 via-teal-500 to-[#e2e2f5]",
    textClass: "text-foreground",
    badgeClass: "text-[#1C1C1C] dark:text-white",
  },
  {
    label: "Total Matches",
    value: "1,240",
    change: "+18%",
    tone: "positive" as const,
    accentClass: "bg-card",
    textClass: "text-foreground",
    badgeClass: "text-[#1C1C1C] dark:text-white",
  },
  {
    label: "Revenue",
    value: "$45.2K",
    change: "+8%",
    tone: "positive" as const,
    accentClass: "bg-gradient-to-br from-teal-700 via-teal-500 to-[#e2e2f5]",
    textClass: "text-foreground",
    badgeClass: "text-[#1C1C1C] dark:text-white",
  },
  {
    label: "Upcoming Matches",
    value: "12",
    change: "Next 7 Days",
    tone: "positive" as const,
    accentClass: "bg-card",
    textClass: "text-foreground",
    badgeClass: "text-[#1C1C1C] dark:text-white",
  },
];

export const YSNStats = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
