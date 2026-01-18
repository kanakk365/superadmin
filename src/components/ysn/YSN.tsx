import { YSNStats } from "./Stats";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MatchesTable } from "./MatchesTable";
import { MatchesChart } from "./MatchesChart";
import { NewUsersChart } from "./NewUsersChart";

export const YSN = () => {
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col gap-8 px-4 sm:px-8 py-8 max-w-[1600px] mx-auto">
        <YSNStats />

        <div className="grid gap-6 lg:grid-cols-2">
          <NewUsersChart />
          <MatchesChart />
        </div>

        <div className="grid gap-6">
          <MatchesTable />
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};
