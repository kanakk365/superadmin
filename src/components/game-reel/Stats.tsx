import { TrendBadge } from "../dashboard/TrendBadge";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Total Users",
    value: "12.5K",
    change: "+15%",
    tone: "positive" as const,
    accentClass: "bg-[#e3f5ff] dark:bg-[#d7ebff]",
    darkTextClass: "dark:text-[#1c1c1c]",
  },
  {
    label: "Active Users",
    value: "8,240",
    change: "+8%",
    tone: "positive" as const,
    accentClass: "bg-[#f7f9fb] dark:bg-[#282828]",
  },
  {
    label: "Total Posts",
    value: "45.1K",
    change: "+22%",
    tone: "positive" as const,
    accentClass: "bg-[#f7f9fb] dark:bg-[#282828]",
  },
  {
    label: "Total Reach",
    value: "1.2M",
    change: "+45%",
    tone: "positive" as const,
    accentClass: "bg-[#e5ecf6] dark:bg-[#dbe5ff]",
    darkTextClass: "dark:text-[#1c1c1c]",
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
          <p
            className={cn("text-xl font-medium text-foreground", stat.darkTextClass)}
          >
            {stat.label}
          </p>
          <div
            className={cn(
              "flex items-baseline justify-between gap-2 text-foreground",
              stat.darkTextClass
            )}
          >
            <span className="text-4xl font-semibold tracking-tight">{stat.value}</span>
            <TrendBadge
              change={stat.change}
              tone={stat.tone}
              className={stat.darkTextClass ? "dark:text-[#1c1c1c] trend" : "dark:text-white trend"}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

