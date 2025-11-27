import { YSNStats } from "./Stats";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { YSNRevenueChart } from "./RevenueChart";
import { MatchesTable } from "./MatchesTable";
import { TopPlayers } from "./TopPlayers";
import { MatchesChart } from "./MatchesChart";

export const YSN = () => {
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col gap-8 px-3 sm:px-8 py-8">
        <div>
          <h1 className="text-lg font-semibold text-foreground">YSN Sports</h1>
        </div>

        <div className="grid gap-6">
          <YSNStats />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <YSNRevenueChart />
          <TopPlayers />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <MatchesTable />
          <MatchesChart />
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};
