import { YSNStats } from "./Stats";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { YSNRevenueChart } from "./RevenueChart";
import { MatchesTable } from "./MatchesTable";
import { UserCoachAgeChart } from "./UserCoachAgeChart";
import { MatchesChart } from "./MatchesChart";

export const YSN = () => {
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col gap-8 px-3 sm:px-8 py-8">
        <YSNStats />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <YSNRevenueChart />
          <UserCoachAgeChart />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <MatchesTable />
          <MatchesChart />
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};
