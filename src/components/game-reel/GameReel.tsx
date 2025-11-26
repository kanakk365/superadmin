import { GameReelStats } from "./Stats";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UserDemographicsPie } from "./UserDemographicsPie";
import { ImpressionsBarChart } from "./ImpressionsBarChart";
import { EngagementAreaChart } from "./EngagementAreaChart";

export const GameReel = () => {
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col gap-8 px-3 sm:px-8 py-8">
        <div>
          <h1 className="text-lg font-semibold text-foreground">GameReel</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
          <GameReelStats />
          <UserDemographicsPie />
        </div>

        <div className="grid gap-6 grid-cols-1">
          <ImpressionsBarChart />
        </div>

        <div className="grid gap-6 grid-cols-1">
          <EngagementAreaChart />
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};
