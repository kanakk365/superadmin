import { TrendBadge } from "../dashboard/TrendBadge";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Revenue",
    value: "$125,000",
    change: "+12%",
    tone: "positive" as const,
    accentClass: "bg-gradient-to-br from-primary via-primary to-[#e2e2f5]",
    textClass: "text-white",
    badgeClass: "text-white",
  },
  {
    label: "Visitors",
    value: "15,420",
    change: "+8%",
    tone: "positive" as const,
    accentClass: "bg-card",
    textClass: "text-foreground",
    badgeClass: "text-[#1C1C1C] dark:text-white",
  },
  {
    label: "Newsletter Subscribers",
    value: "2,890",
    change: "+24%",
    tone: "positive" as const,
    accentClass: "bg-gradient-to-br from-primary via-primary to-[#e2e2f5]",
    textClass: "text-white",
    badgeClass: "text-white",
  },
  {
    label: "Contact Requests",
    value: "45",
    change: "+5%",
    tone: "positive" as const,
    accentClass: "bg-card",
    textClass: "text-foreground",
    badgeClass: "text-[#1C1C1C] dark:text-white",
  },
  {
    label: "Active Jobs",
    value: "12",
    change: "0%",
    tone: "positive" as const,
    accentClass: "bg-gradient-to-br from-primary via-primary to-[#e2e2f5]",
    textClass: "text-white",
    badgeClass: "text-white",
  },
  {
    label: "Facilities",
    value: "5",
    change: "75% Util",
    tone: "positive" as const,
    accentClass: "bg-card",
    textClass: "text-foreground",
    badgeClass: "text-[#1C1C1C] dark:text-white",
  },
];

export const DestinationKPStats = () => {
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
