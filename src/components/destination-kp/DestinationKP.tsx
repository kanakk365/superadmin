import { DestinationKPStats } from "./Stats";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UpcomingEvents } from "./UpcomingEvents";
import { GuestChannelsChart } from "./GuestChannelsChart";
import { JobsList } from "./JobsList";
import { EventsChart } from "./EventsChart";

export const DestinationKP = () => {
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col gap-8 px-3 sm:px-8 py-8">
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            Destination KP
          </h1>
        </div>

        <div className="grid gap-6">
          {/* Top Stats Row */}
          <DestinationKPStats />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Charts & Lists Row */}
          <GuestChannelsChart />
          <JobsList />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Bottom Row */}
          <UpcomingEvents />
          <EventsChart />
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};
