import { BattleLoungeStats } from "./Stats";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TournamentList } from "./TournamentList";
import { BattleLoungeReachChart } from "./BattleLoungeReachChart";
import { PopularGamesPie } from "./PopularGamesPie";

export const BattleLounge = () => {
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col gap-8 px-3 sm:px-8 py-8">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Battle Lounge</h1>
        </div>

        <div className="w-full">
          <BattleLoungeStats />
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <TournamentList />
          <PopularGamesPie />
        </div>

        <div className="grid gap-6 grid-cols-1">
          <BattleLoungeReachChart />
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};
