import { TrendBadge } from "../dashboard/TrendBadge";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Total Users",
    value: "5,400",
    change: "+8%",
    tone: "positive" as const,
    accentClass: "bg-[#e3f5ff] dark:bg-[#d7ebff]",
    darkTextClass: "dark:text-[#1c1c1c]",
  },
  {
    label: "Active Users",
    value: "2,100",
    change: "+12%",
    tone: "positive" as const,
    accentClass: "bg-[#f7f9fb] dark:bg-[#282828]",
  },
  {
    label: "Tournaments",
    value: "45",
    change: "+3",
    tone: "positive" as const,
    accentClass: "bg-[#f7f9fb] dark:bg-[#282828]",
  },
  {
    label: "Revenue",
    value: "$12.5K",
    change: "+18%",
    tone: "positive" as const,
    accentClass: "bg-[#e5ecf6] dark:bg-[#dbe5ff]",
    darkTextClass: "dark:text-[#1c1c1c]",
  },
];

export const BattleLoungeStats = () => {
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

