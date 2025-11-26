import { YSNStats } from "./Stats";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { RevenueChart } from "../dashboard/RevenueChart";
import { RecentMatches } from "./RecentMatches";

export const YSN = () => {
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col gap-8 px-3 sm:px-8 py-8">
        <div>
          <h1 className="text-lg font-semibold text-foreground">YSN Sports</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <YSNStats />
          <RevenueChart />
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <RecentMatches />
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};

