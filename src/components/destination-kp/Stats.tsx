import { TrendBadge } from "../dashboard/TrendBadge";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Revenue",
    value: "$125,000",
    change: "+12%",
    tone: "positive" as const,
    accentClass: "bg-[#e3f5ff] dark:bg-[#d7ebff]",
    darkTextClass: "dark:text-[#1c1c1c]",
  },
  {
    label: "Visitors",
    value: "15,420",
    change: "+8%",
    tone: "positive" as const,
    accentClass: "bg-[#f7f9fb] dark:bg-[#282828]",
  },
  {
    label: "Newsletter Subscribers",
    value: "2,890",
    change: "+24%",
    tone: "positive" as const,
    accentClass: "bg-[#f7f9fb] dark:bg-[#282828]",
  },
  {
    label: "Contact Requests",
    value: "45",
    change: "+5%",
    tone: "positive" as const,
    accentClass: "bg-[#e5ecf6] dark:bg-[#dbe5ff]",
    darkTextClass: "dark:text-[#1c1c1c]",
  },
  {
    label: "Active Jobs",
    value: "12",
    change: "0%",
    tone: "positive" as const,
    accentClass: "bg-[#f7f9fb] dark:bg-[#282828]",
  },
  {
    label: "Facilities",
    value: "5",
    change: "75% Util",
    tone: "positive" as const,
    accentClass: "bg-[#e5ecf6] dark:bg-[#dbe5ff]",
    darkTextClass: "dark:text-[#1c1c1c]",
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
