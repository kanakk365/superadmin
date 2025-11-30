import { BattleLoungeStats, UsersCard } from "./Stats";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TournamentList } from "./TournamentList";
import { BattleLoungeReachChart } from "./BattleLoungeReachChart";
import { PopularGamesPie } from "./PopularGamesPie";

export const BattleLounge = () => {
  return (
    <ScrollArea className="h-full w-full bg-gradient-to-b from-muted/20 to-background">
      <div className="flex flex-col gap-6 lg:gap-8 px-4 sm:px-8 py-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Battle Lounge
          </h1>
          <p className="text-muted-foreground">
            Manage tournaments, track revenue, and analyze user engagement.
          </p>
        </div>

        {/* Stats Section - Bento Grid Layout */}
        <BattleLoungeStats />

        {/* Second Row - Users Card and Chart */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-1">
            <UsersCard />
          </div>
          <div className="lg:col-span-2">
            <BattleLoungeReachChart />
          </div>
        </div>

        {/* Tournament List and Popular Games */}
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[2fr_1fr]">
          <TournamentList />
          <PopularGamesPie />
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};
