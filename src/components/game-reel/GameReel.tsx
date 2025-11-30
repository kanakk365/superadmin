import { GameReelStats } from "./Stats";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UserDemographicsPie } from "./UserDemographicsPie";
import { PostEngagementChart } from "./PostEngagementChart";

export const GameReel = () => {
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col gap-8 px-3 sm:px-8 py-8">
        {/* Stats Grid with Total Posts Card */}
        <GameReelStats />

        {/* Second Row - User Demographics and Post Engagement */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)]">
          <UserDemographicsPie />
          <PostEngagementChart />
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};
