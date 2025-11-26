import { TrendBadge } from "./TrendBadge";
import { stats } from "./constants";
import { cn } from "@/lib/utils";

export const DashboardStats = () => {
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
